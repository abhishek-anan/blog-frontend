import { ofetch } from "ofetch";
import { useAuthStore } from "~/store/authStore";

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();
  const token = computed(()=>authStore.token)
  const { checkToken,logout } = authStore;
  if( !token.value ) {
    await checkToken();
  }
  const reqHeaders = {
    Accept: "application/json",
    Authorization:
      "Bearer " + (token.value.length ? token.value : ""),
  };
  const instance = ofetch.create({
    baseURL: config.public.apiBase,
    headers: reqHeaders,
    async onResponseError({ request, response, options }) {
      if(response.status === 401){
        logout()
      }
    },
  });
  return {
    provide: {
      ofetch: instance,
    },
  };
});