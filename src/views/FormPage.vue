<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8">Создать пост</h1>

      <div class="bg-white rounded-lg shadow-md p-6">
        <!-- Сообщение об успехе -->
        <div
          v-if="success"
          class="mb-4 p-4 bg-green-100 text-green-700 rounded"
        >
          ✅ Пост успешно создан! ID: {{ createdPost?.id }}
        </div>

        <!-- Сообщение об ошибке -->
        <div v-if="error" class="mb-4 p-4 bg-red-100 text-red-700 rounded">
          ❌ {{ error }}
        </div>

        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2"
              >User ID</label
            >
            <input
              v-model="form.userId"
              type="number"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Введите ID пользователя"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2"
              >Заголовок</label
            >
            <input
              v-model="form.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Введите заголовок"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2"
              >Текст поста</label
            >
            <textarea
              v-model="form.body"
              rows="5"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Введите текст поста"
            ></textarea>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {{ loading ? "Отправка..." : "Отправить" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { usePostsStore } from "../stores/posts";

const postsStore = usePostsStore();
const form = ref({
  userId: "",
  title: "",
  body: "",
});
const loading = ref(false);
const success = ref(false);
const error = ref(null);
const createdPost = ref(null);

const submitForm = async () => {
  loading.value = true;
  error.value = null;
  success.value = false;

  const postData = {
    userId: parseInt(form.value.userId),
    title: form.value.title,
    body: form.value.body,
  };

  try {
    const result = await postsStore.createPost(postData);
    createdPost.value = result;
    success.value = true;

    form.value = {
      userId: "",
      title: "",
      body: "",
    };

    setTimeout(() => {
      success.value = false;
    }, 3000);
  } catch (err) {
    error.value = "Ошибка при отправке данных";
  } finally {
    loading.value = false;
  }
};
</script>
