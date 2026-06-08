<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8">Посты с API</h1>

      <div v-if="postsStore.loading" class="text-center py-12">
        <div class="text-gray-500">Загрузка...</div>
      </div>

      <div v-else class="grid md:grid-cols-2 gap-6">
        <div
          v-for="post in postsStore.posts.slice(0, 10)"
          :key="post.id"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
        >
          <div class="flex justify-between items-start mb-3">
            <span class="text-sm text-blue-600 font-semibold"
              >Пост #{{ post.id }}</span
            >
            <span class="text-sm text-gray-500"
              >User ID: {{ post.userId }}</span
            >
          </div>
          <h2 class="text-xl font-semibold mb-2">{{ post.title }}</h2>
          <p class="text-gray-600">{{ post.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { usePostsStore } from "../stores/posts";

const postsStore = usePostsStore();

onMounted(() => {
  if (postsStore.posts.length === 0) {
    postsStore.fetchPosts();
  }
});
</script>
