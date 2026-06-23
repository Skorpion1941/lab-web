<template>
  <div class="max-w-4xl mx-auto p-5 font-sans">
    <h1 class="text-center text-4xl text-gray-800 mb-8">
      10 случайных шуток
    </h1>

    <!-- Кнопка загрузки -->
    <div class="text-center mb-8">
      <button 
        @click="loadRandomJokes" 
        class="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all hover:-translate-y-0.5 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
        :disabled="loading"
      >
        {{ loading ? 'Загрузка...' : 'Загрузить 10 шуток' }}
      </button>     
      
    </div>

    <div v-if="error" class="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-5 border-l-4 border-red-700">
      {{ error }}
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="inline-block">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p class="mt-4 text-gray-500">Загрузка шуток...</p>
      </div>
    </div>

    <div v-if="jokesList.length > 0 && !loading" class="mt-5">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl text-gray-800">
          Всего шуток: {{ jokesList.length }}
        </h2>
      </div>

      <div 
        v-for="(joke, index) in jokesList" 
        :key="joke.id" 
        class="flex gap-4 bg-white p-4 rounded-lg mb-3 shadow-md transition-all hover:translate-x-1 hover:shadow-lg"
      >
        <div class="flex-shrink-0">
          <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
            {{ index + 1 }}
          </div>
        </div>
        <div class="flex-1">
          <div class="flex flex-wrap gap-2 mb-2">
            <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
              #{{ joke.type }}
            </span>
            <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              ID: {{ joke.id }}
            </span>
          </div>
          <p class="text-lg font-medium text-gray-800 mb-1">{{ joke.setup }}</p>
          <p class="text-xl text-gray-700">{{ joke.punchline }}</p>
        </div>
      </div>
    </div>
    <div 
      v-if="!loading && jokesList.length === 0 && !error" 
      class="text-center py-16 bg-white rounded-xl shadow-md"
    >
      <p class="text-xl text-gray-400">Пока нет шуток</p>
      <p class="text-gray-400 mt-2">Нажмите кнопку "Загрузить 10 шуток"</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useJokesStore } from "../stores/jokes";

const jokesStore = useJokesStore();

const { jokesList } = storeToRefs(jokesStore);

// Локальные состояния
const loading = ref(false);
const error = ref(null);

const loadRandomJokes = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    await jokesStore.fetchTenRandomJokes();
  } catch (err) {
    error.value = jokesStore.error || "Ошибка при загрузке шуток";
  } finally {
    loading.value = false;
  }
};

const clearAll = () => {
  jokesStore.clearJokesList();
  error.value = null;
};

onMounted(() => {
  loadRandomJokes();
});
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>