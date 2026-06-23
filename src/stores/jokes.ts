// stores/jokes.js
import { defineStore } from "pinia";
import axios from "axios";

const API_BASE = "https://official-joke-api.appspot.com";

export const useJokesStore = defineStore("jokes", {
  state: () => ({
    types: [],
    randomJoke: null,
    jokesList: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchTypes() {
      try {
        const response = await axios.get(`https://official-joke-api.appspot.com/types`);
        this.types = response.data;        
        return this.types;
      } catch (error) {
        this.error = "Не удалось загрузить типы шуток";
        console.error("Ошибка загрузки типов:", error);
        throw error;
      }
    },

    async fetchRandomJokeByType(type) {
      this.loading = true;
      this.error = null;
      try {
        if (type == "random") {
          const response = await axios.get(`https://official-joke-api.appspot.com/jokes/random`);
          this.randomJoke = response.data;          
          console.log([response.data]);
          return this.randomJoke;
        }
        const response = await axios.get(`https://official-joke-api.appspot.com/jokes/${type}/random`);
        this.randomJoke = response.data[0] || null;
        
        console.log(response.data[0]);
        return this.randomJoke;
      } catch (error) {
        this.error = `Не удалось загрузить случайную шутку типа "${type}"`;
        console.error("Ошибка загрузки случайной шутки:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchTenJokesByType(type) {
      this.loading = true;
      this.error = null;      
      try {
        const response = await axios.get(`https://official-joke-api.appspot.com/jokes/${type}/ten`);
        this.jokesList = response.data;
        return this.jokesList;
      } catch (error) {
        this.error = `Не удалось загрузить 10 шуток типа "${type}"`;
        console.error("Ошибка загрузки 10 шуток:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchTenRandomJokes() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`https://official-joke-api.appspot.com/random_ten`);
        this.jokesList = response.data;
        return this.jokesList;
      } catch (error) {
        this.error = "Не удалось загрузить 10 случайных шуток";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    clearRandomJoke() {
      this.randomJoke = null;
    },
    clearJokesList() {
      this.jokesList = [];
    },

    clearAll() {
      this.randomJoke = null;
      this.jokesList = [];
      this.error = null;
    },
  },

  getters: {
    hasRandomJokes: (state) => state.randomJokes.length > 0,
    hasJokesList: (state) => state.jokesList.length > 0,
    jokesCount: (state) => state.jokesList.length,
    firstRandomJoke: (state) => state.randomJokes[0] || null,
  },
});