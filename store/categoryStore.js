import { defineStore } from "pinia";

export const useCategoryStore = defineStore("categoryStore", {
  state: () => ({
    categoryList: [],
  }),
  getters: {
  },
  actions: {
    async fetchCategory(formData) {
      const { $ofetch } = useNuxtApp();
      try {
        let respData = {}
        let status = false;
        await $ofetch("/categories/", {  
          method: "GET",
        })
          .then((res) => {
            if (res && res.data && res.data.data) {
              this.categoryList= res.data.data;
              respData = res.data.data;
              status = true;
            }
          })
          .catch((err) => {
            if (err && err.data && err.data.data &&  err.data.data.message) {
              respData = err.data.data.message;
            }
          });
        return { status: status, data: respData };
      } catch (err) {
        return { status: false, data: {message : "Something went wrong!"} };
      }
    },
    async createCategory(formData) {
      const { $ofetch } = useNuxtApp();
      try {
        let respData = {}
        let status = false;
        await $ofetch("/category/", {  
          method: "POST",
          body:formData,
        })
          .then((res) => {
            if (res && res.data) {
              respData = res.data;
              status = true;
              this.fetchCategory()
            }
          })
          .catch((err) => {
            if (err && err.data  &&  err.data.data) {
              respData = err.data.data;
            }
          });
        return { status: status, data: respData };
      } catch (err) {
        return { status: false, data: {message : "Something went wrong!"} };
      }
    },
  },
});
