import { defineStore } from "pinia";
import axios from "axios";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [],
    loading: false,
  }),

  actions: {
    async fetchPosts() {
      this.loading = true;
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
      );
      this.posts = response.data;
      this.loading = false;
    },

    async createPost(postData) {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        postData,
      );
      this.posts.unshift(response.data);
      return response.data;
    },
  },
});
