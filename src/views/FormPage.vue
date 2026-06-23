<template>
  <div class="max-w-2xl mx-auto p-5 font-sans">
    <h1 class="text-center text-4xl text-gray-800 mb-8">
      Генератор шуток
    </h1>
    
    <div v-if="error" class="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-5 border-l-4 border-red-700">
      {{ error }}
    </div>

    <div class="bg-white p-6 rounded-xl shadow-md mb-8">
      <div class="mb-5">
        <label class="block font-semibold text-gray-800 mb-2">Выберите тип шутки</label>
        <select 
          v-model="selectedType" 
          class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-blue-500 bg-white"
        >
          <option value="">Все типы (случайная)</option>
          <option v-for="type in types" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <button 
          @click="getRandomJoke" 
          class="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg text-base font-semibold transition-all hover:bg-blue-600 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          :disabled="loading"
        >
          Случайная шутка
        </button>

        <button         
          v-if="selectedType != ''"
          @click="getTenJokes" 
          class="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg text-base font-semibold transition-all hover:bg-green-600 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          :disabled="loading"          
        >
          10 шуток
        </button>

        <button 
          @click="clearAll" 
          class="bg-red-500 text-white px-5 py-3 rounded-lg text-base font-semibold transition-all hover:bg-red-600 hover:-translate-y-0.5"
        >
          Очистить
        </button>
      </div>
    </div>

    <div v-if="loading" class="text-center py-8 text-xl text-gray-500">
      Загрузка...
    </div>

    <div v-if="randomJoke && !loading" class="mb-8">
      <div class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
        <div class="flex justify-between items-start mb-3">
          <span class="bg-white/20 px-3 py-1 rounded-full text-sm">
            #{{ randomJoke.type }}
          </span>
          <span class="bg-white/20 px-3 py-1 rounded-full text-sm">
            ID: {{ randomJoke.id }}
          </span>
        </div>
        <p class="text-xl font-medium mb-2.5">{{ randomJoke.setup }}</p>
        <p class="text-2xl">{{ randomJoke.punchline }}</p>
      </div>
    </div>

    <div v-if="jokesList.length > 0 && !loading" class="mt-5">
      <h2 class="text-2xl text-gray-800 mb-4">
        Шутки типа "{{ selectedType }}" ({{ jokesList.length }})
      </h2>
      <div 
        v-for="(joke, index) in jokesList" 
        :key="joke.id" 
        class="flex gap-4 bg-white p-4 rounded-lg mb-2.5 shadow-sm transition-all hover:translate-x-1"
      >
        <div class="font-bold text-blue-500 text-xl min-w-[30px]">{{ index + 1 }}.</div>
        <div class="flex-1">
          <p class="text-base mb-1.5">{{ joke.setup }}</p>
          <p class="text-lg mb-2">{{ joke.punchline }}</p>
          <div class="flex gap-4 text-sm">
            <span class="bg-gray-100 px-3 py-1 rounded-full text-gray-700">#{{ joke.type }}</span>
            <span class="bg-gray-100 px-3 py-1 rounded-full text-gray-700">ID: {{ joke.id }}</span>
          </div>
        </div>
      </div>
    </div>

    <div 
      v-if="!loading && !randomJoke && jokesList.length === 0 && !error" 
      class="text-center py-12 text-xl text-gray-300"
    >
      <p>Выберите тип и нажмите кнопку, чтобы получить шутку!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useJokesStore } from "../stores/jokes";
import { storeToRefs } from "pinia";

const jokesStore = useJokesStore();

const selectedType = ref("");
const loading = ref(false);
const error = ref(null);

const { types, randomJoke, jokesList } = storeToRefs(jokesStore);


onMounted(async () => {
  try {
    await jokesStore.fetchTypes();
  } catch (err) {
    error.value = "Не удалось загрузить типы шуток";
  }
});

const getRandomJoke = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    jokesStore.clearJokesList();    
    if (selectedType.value) {
      await jokesStore.fetchRandomJokeByType(selectedType.value);
    } else {
      await jokesStore.fetchRandomJokeByType('random');
    }
  } catch (err) {
    error.value = jokesStore.error || "Ошибка при получении случайной шутки";
  } finally {
    loading.value = false;
  }
};

const getTenJokes = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    jokesStore.clearRandomJoke();
    
    if (selectedType.value) {
      await jokesStore.fetchTenJokesByType(selectedType.value);
    } else {
      await jokesStore.fetchTenJokesByType('random');
    }
  } catch (err) {
    error.value = jokesStore.error || "Ошибка при получении списка шуток";
  } finally {
    loading.value = false;
  }
};

const clearAll = () => {
  jokesStore.clearAll();
  error.value = null;
};
</script>