import { defineStore } from "pinia";

export const useBlogStore = defineStore("blogStore", {
  state: () => ({
    blogList: [],
    currBlog: [],
    currBlogDetail: [],
    tagList: [],
    categoryList: [],
  }),
  getters: {
  },
  actions: {
    async fetchBlogs(formData) {
      const { $ofetch } = useNuxtApp();
      try {
        let respData = {}
        let status = false;
        await $ofetch("/blogs/?id=hello", {  
          method: "GET",
        })
          .then((res) => {
            if (res && res.data && res.data.data) {
              this.blogList= res.data.data;
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
    async fetchCurrBlog(formData) {
      const { $ofetch } = useNuxtApp();
      try {
        let respData = {}
        let status = false;
        await $ofetch(`/blog/${formData.id}/`, {  
          method: "GET",
        })
          .then((res) => {
            if (res && res.data && res.data.data) {
              this.currBlog= res.data.data;
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
    async createBlog(formData) {
      const { $ofetch } = useNuxtApp();
      try {
        let respData = {}
        let status = false;
        await $ofetch("/blog/", {  
          method: "POST",
          body:formData,
        })
          .then((res) => {
            if (res && res.data && res.data.data) {
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
    async fetchBlogDetail(formData) {
      const { $ofetch } = useNuxtApp();
      try {
        let respData = {}
        let status = false;
        await $ofetch(`/blog-details/${formData.id}/`, {  
          method: "GET",
        })
          .then((res) => {
            if (res && res.data && res.data.data) {
              this.currBlogDetail = res.data.data;
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
    async createBlogDetail(formData) {
      const { $ofetch } = useNuxtApp();
      try {
        let respData = {}
        let status = false;
        await $ofetch(`/blog-detail/${formData.id}/`, {  
          method: "POST",
          body:formData,
        })
          .then((res) => {
            console.log(res.data.data)
            if (res && res.data && res.data.data) {
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
    async fetchTagByBlog(formData) {
      const { $ofetch } = useNuxtApp();
      try {
        let respData = {}
        let status = false;
        await $ofetch(`/blog-tag-by-blog/${formData.id}/`, {  
          method: "GET",
        })
          .then((res) => {
            console.log(res.data.data)
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
    async fetchTagBytag(formData) {
      const { $ofetch } = useNuxtApp();
      try {
        let respData = {}
        let status = false;
        await $ofetch(`/blog-tag-by-tag/${formData.id}/`, {  
          method: "GET",
        })
          .then((res) => {
            console.log(res.data.data)
            if (res && res.data && res.data.data) {
              this.blogList = res.data.data;
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
    async addTagToBlog(formData) {
      const { $ofetch } = useNuxtApp();
      try {
        let respData = {}
        let status = false;
        await $ofetch(`/blog-tag/`, {  
          method: "POST",
          body:formData,
        })
          .then((res) => {
            console.log(res.data.data)
            if (res && res.data && res.data.data) {
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
    async fetchCategories(formData) {
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
  },
});
