import { defineStore } from "pinia";

export const useTagStore = defineStore("tagStore", {
  state: () => ({
    tagList: [],
  }),
  getters: {
  },
  actions: {
    async fetchTag(formData) {
      const { $ofetch } = useNuxtApp();
      try {
        let respData = {}
        let status = false;
        await $ofetch("/tags/", {  
          method: "GET",
        })
          .then((res) => {
            if (res && res.data && res.data.data) {
              this.tagList = res.data.data;
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
    async createTag(formData) {
      const { $ofetch } = useNuxtApp();
      try {
        let respData = {}
        let status = false;
        await $ofetch("/tag/", {  
          method: "POST",
          body:formData,
        })
          .then((res) => {
            if (res && res.data) {
              this.fetchTag();
              respData = res.data;
              status = true;
            }
          })
          .catch((err) => {
            if (err && err.data && err.data.data) {
              console.log(err.data.data)
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
