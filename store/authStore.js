import { defineStore } from "pinia";
import decode from "jwt-decode";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    token: "",
    authUser: null,
  }),
  actions: {
    async login(formData) {
      const { $ofetch } = useNuxtApp();
      try {
        let respData = {}
        let status = false;
        await $ofetch("/login/", {  
          method: "POST",
          body: formData,
        })
          .then((res) => {
            if (res && res.data && res.data.token) {
              this.token = res.data.token;
              this.authUser = decode(this.token);
              const userToken = useCookie("userToken");
              userToken.value = res.data.token;
              respData = res.message;
              status = true;
              location.replace("/");
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
    async register(formData) {
      const { $ofetch } = useNuxtApp();
      try {
        let respData = {}
        let status = false;
        await $ofetch("/user/", {  
          method: "POST",
          body: formData,
        })
          .then((res) => {
            if (res && res.data && res.data.data) {
              respData = res.data;
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
    async checkToken() {
      let userToken = useCookie("userToken");
      if (userToken.value) {
        this.token = userToken.value;
        this.authUser = decode(userToken.value);
      }
    },
    logout() {
      this.token = "";
      this.authUser = null;
      const userToken = useCookie("userToken");
      userToken.value = null;
      navigateTo("/login")
    }
  },
});