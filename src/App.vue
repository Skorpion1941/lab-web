<template>
  <div>
    <nav class="bg-blue-600 text-white shadow-lg">
      <div class="container mx-auto px-4">
        <div class="flex space-x-8 py-4">
          <router-link to="/" class="hover:text-blue-200 transition"
            >Главная</router-link
          >
          <router-link to="/posts" class="hover:text-blue-200 transition"
            >Посты с API</router-link
          >
          <router-link to="/form" class="hover:text-blue-200 transition"
            >Форма отправки</router-link
          >
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<style>
@import "./assets/main.css";
</style>
