<template>
  <div class="bl-blog-write-container bl-flex bl-center">
    <div class="bl-blog-form-container">
      <div class="bl-f-12 bl-fw-300 bl-success-msg-color">{{ successMsg }}</div>
      <div class="bl-f-12 bl-fw-300 bl-err-msg-color">{{ errMsg }}</div>
      <template v-if="isBlog">
        <div class="bl-input-wrap">
          <div class="bl-label bl-f-16 bl-fw-400">Title:</div>
          <input type="text" class="bl-input" v-model="blogInfo.title.value" />
          <div class="bl-f-12 bl-fw-300 bl-err-msg-color">{{ blogInfo.title.errMsg }}</div>
        </div>
        <div class="bl-input-wrap">
          <div class="bl-label bl-f-16 bl-fw-400">Summary (this show in card with title):</div>
          <textarea class="bl-input" cols="30" rows="5" v-model="blogInfo.subDesc.value"></textarea>
          <div class="bl-f-12 bl-fw-300 bl-err-msg-color">{{ blogInfo.subDesc.errMsg }}</div>
        </div>
        <div class="bl-input-wrap">
          <div class="bl-label bl-f-16 bl-fw-400">Image:</div>
          <input type="file" ref="imgInput" @change="getImg" class="bl-input" />
        </div>
        <div class="bl-flex bl-input-flex">
          <div class="bl-input-wrap">
            <div class="bl-label bl-f-16 bl-fw-400">Category:</div>
            <select class="bl-input" v-model="blogInfo.category.value">
              <option value="">-- Select Category--</option>
              <option v-for="(i, index) in categoryList" :key="index" :value="i.id">
                {{ i.name }}
              </option>
            </select>
            <div class="bl-f-12 bl-fw-300 bl-err-msg-color">{{ blogInfo.category.errMsg }}</div>
          </div>
          <div class="bl-add-btn-wrap">
            <button class="bl-secondary-btn bl-add-btn" @click="setPopup('category')">Add category</button>
          </div>
        </div>
      </template>
      <template v-if="!isBlog && isBlogDetail">
        <div class="bl-f-20 bl-fw-500 bl-input-wrap">Blog details</div>
        <div class="bl-input-wrap">
          <div class="bl-label bl-f-16 bl-fw-400">Text Type:</div>
          <select class="bl-input" v-model="blogDetailInfo.textType.value">
            <option value="">-- Select text type--</option>
            <option v-for="(i, index) in typeList" :key="index" :value="i.id">
              {{ i.name }}
            </option>
          </select>
          <div class="bl-f-12 bl-fw-300 bl-err-msg-color">{{ blogDetailInfo.textType.errMsg }}</div>
          <div class="bl-f-12 bl-fw-300 bl-err-msg-color">{{ blogInfo.category.errMsg }}</div>
        </div>
        <div class="bl-input-wrap">
          <div
            class="bl-label bl-f-16 bl-fw-400"
            :class="blogDetailInfo.textType.value !== 'heading' ? 'bl-disable-btn' : ''"
          >
            Heading:
          </div>
          <input
            type="text"
            class="bl-input"
            :class="blogDetailInfo.textType.value !== 'heading' ? 'bl-disable-btn' : ''"
            :disabled="blogDetailInfo.textType.value !== 'heading'"
            v-model="blogDetailInfo.heading.value"
          />
          <div class="bl-f-12 bl-fw-300 bl-err-msg-color">{{ blogDetailInfo.heading.errMsg }}</div>
        </div>
        <div class="bl-input-wrap">
          <div class="bl-label bl-f-16 bl-fw-400">Text:</div>
          <textarea class="bl-input" cols="30" rows="5" v-model="blogDetailInfo.text.value"></textarea>
          <div class="bl-f-12 bl-fw-300 bl-err-msg-color">{{ blogDetailInfo.text.errMsg }}</div>
        </div>
      </template>
      <template v-if="!isBlog && !isBlogDetail">
        <div class="bl-f-20 bl-fw-500 bl-input-wrap">Are you want to add more column click on add column</div>
        <div class="bl-add-tag-text bl-f-14 bl-fw-500" v-if="isTag">Add Tag</div>
        <div class="bl-flex bl-input-flex" v-if="isTag">
          <details class="bl-details">
            <summary class="bl-summary">-- Select Tag--</summary>
            <ul class="bl-ul">
              <li class="bl-li" v-for="(i, index) in tagList" :key="index">
                <label class="bl-label"
                  ><input type="checkbox" :value="i.id" @change="hello" v-model="tabSelect" />{{ i.name }}</label
                >
              </li>
            </ul>
          </details>
          <div class="bl-add-btn-wrap">
            <button class="bl-secondary-btn bl-add-btn" @click="setPopup('tag')">Add tag in list</button>
          </div>
        </div>
        <div class="bl-tag-btn-wrap bl-flex">
          <button class="bl-secondary-btn bl-submit-btn" v-if="isTag" @click="saveTag">Add tag to blog</button>
        </div>
        <div class="bl-btn-wrap bl-flex">
          <button class="bl-secondary-btn bl-submit-btn" v-if="!isTag" @click="isTag = true">Add tags</button>
          <button class="bl-secondary-btn bl-submit-btn" @click="addColumn">Add column</button>
          <button class="bl-primary-btn bl-submit-btn" @click="submitBlog">Submit</button>
        </div>
      </template>
      <div class="bl-btn-wrap bl-flex" v-if="isBlog || isBlogDetail">
        <button class="bl-primary-btn bl-submit-btn" @click="submitBlog">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/authStore";
import { useBlogStore } from "~/store/blogStore";
import { useCategoryStore } from "~/store/categoryStore";
import { useCommonStates } from "~/store/commonStates";
import { useTagStore } from "~/store/tagStore";

const commonStates = useCommonStates();
const tagStore = useTagStore();
const categoryStore = useCategoryStore();
const authStore = useAuthStore();
const blogStore = useBlogStore();
const { setNavActive, setPopup, validateFields } = commonStates;
const { fetchCategory } = categoryStore;
const { fetchTag } = tagStore;
const { createBlog, createBlogDetail, addTagToBlog } = blogStore;
const authUser = computed(() => authStore.authUser);
const popup = computed(() => commonStates.popup);
const tagList = computed(() => tagStore.tagList);
const categoryList = computed(() => categoryStore.categoryList);
const imgInput = ref("");
const errMsg = ref("");
const successMsg = ref("");
const isBlog = ref(true);
const isBlogDetail = ref(false);
const isTag = ref(false);
const typeList = [
  { name: "With heading", id: "heading" },
  { name: "Without heading", id: "Paragraph" },
];

const tabSelect = ref([]);
const currBlogId = ref("");

const blogInfo = ref({
  title: {
    value: "",
    type: "",
    errMsg: "",
  },
  subDesc: {
    value: "",
    type: "",
    errMsg: "",
  },
  category: {
    value: "",
    type: "",
    errMsg: "",
  },
  tag: {
    value: "",
    type: "",
    errMsg: "",
  },
});
const blogDetailInfo = ref({
  textType: {
    value: "",
    type: "",
    errMsg: "",
  },
  heading: {
    value: "",
    type: "",
    errMsg: "",
  },
  text: {
    value: "",
    type: "",
    errMsg: "",
  },
});
const imgUrl = ref("");

function addColumn() {
  isBlogDetail.value = true;
}

async function saveTag() {
  console.log(tabSelect.value);
  if (tabSelect.value) {
    let formData = {};
    formData.blog_id = currBlogId.value;
    formData.tag_id = tabSelect.value;
    formData.modified_by_id = authUser.value.id;
    formData.created_by_id = authUser.value.id;
    console.log(formData);
    await addTagToBlog(formData);
  }
}

async function submitBlog() {
  if (isBlog.value && !isBlogDetail.value) {
    const isValid = validateFields(blogInfo.value, {
      title: {
        required: true,
        type: "name",
      },
      subDesc: {
        required: true,
        type: "name",
      },
      category: {
        required: true,
        type: "name",
      },
    });
    if (isValid) {
      let formData = new FormData();
      formData.append("title", blogInfo.value.title.value);
      formData.append("sub_desc", blogInfo.value.subDesc.value);
      if (imgInput.value.files[0]) {
        formData.append("image", imgInput.value.files[0]);
      }
      formData.append("category_id", blogInfo.value.category.value);
      formData.append("created_by_id", authUser.value.id);
      formData.append("modified_by_id", authUser.value.id);
      formData.append("user_id", authUser.value.id);
      await createBlog(formData).then((res) => {
        if (res.status) {
          successMsg.value = res.data.message;
          currBlogId.value = res.data.id;
          blogInfo.value.title.value = "";
          blogInfo.value.subDesc.value = "";
          blogInfo.value.category.value = "";
          imgUrl.value = "";
        } else {
          errMsg.value = res.data;
        }
        setTimeout(() => {
          errMsg.value = "";
          successMsg.value = "";
          if (res.status) {
            isBlog.value = false;
            isBlogDetail.value = true;
          }
        }, 2000);
      });
    }
  } else if (isBlogDetail.value) {
    const isValid = validateFields(blogDetailInfo.value, {
      textType: {
        required: true,
        type: "name",
      },
      text: {
        required: true,
        type: "name",
      },
      heading: {
        required: blogDetailInfo.value.textType.value === "heading" ? true : false,
        type: "name",
      },
    });
    if (isValid) {
      let formData = {};
      formData.id = currBlogId.value;
      formData.text_type = blogDetailInfo.value.textType.value;
      formData.heading = blogDetailInfo.value.heading.value;
      formData.text = blogDetailInfo.value.text.value;
      formData.created_by = authUser.value.id;
      formData.modified_by = authUser.value.id;
      await createBlogDetail(formData).then((res) => {
        if (res.status) {
          successMsg.value = res.data.message;
          blogDetailInfo.value.textType.value = "";
          blogDetailInfo.value.text.value = "";
          blogDetailInfo.value.heading.value = "";
        } else {
          console.log(res.data);
          errMsg.value = "Something went wrong!";
          console.log(errMsg.value);
        }
        setTimeout(() => {
          errMsg.value = "";
          successMsg.value = "";
          if (res.status) {
            isBlog.value = false;
            isBlogDetail.value = false;
          }
        }, 1000);
      });
    }
  } else {
    navigateTo("/");
  }
}

onMounted(async () => {
  setNavActive("blog-write");
  await fetchCategory();
  await fetchTag();
});
</script>

<style lang="scss" scoped>
.bl-blog-write-container {
  padding: 2.5rem;
  // background-color: #f8f8f8;
  background-color: #008080;
  gap: 1.5rem;
  .bl-blog-form-container {
    max-width: 40rem;
    flex: 1;
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
    .bl-input-wrap {
      margin-bottom: 1rem;
      width: 100%;
      .bl-label {
        margin-bottom: 0.25rem;
      }
    }
    .bl-input-flex {
      gap: 1rem;
      align-items: flex-end;
    }
    .bl-add-tag-text {
      margin-bottom: 0.5rem;
    }
    .bl-add-btn-wrap {
      .bl-add-btn {
        margin-bottom: 1rem;
        min-width: 140px;
        background-color: #fff;
        color: #000;
        border: 1px solid #7a6e6e;
      }
    }
    .bl-tag-btn-wrap {
      margin-bottom: 1rem;
      justify-content: flex-end;
    }
    .bl-column-input-wrap {
      margin-bottom: 1rem;
      gap: 1rem;
      align-items: flex-end;
      .bl-input-wrap {
        width: 100%;
        margin-bottom: 0;
      }
      .bl-add-btn {
        min-width: max-content;
        background-color: #fff;
        color: #000;
        border: 1px solid #7a6e6e;
      }
    }
    .bl-disable-btn {
      opacity: 0.3;
      :hover {
        box-shadow: none;
      }
    }
    .bl-btn-wrap {
      gap: 1rem;
      justify-content: flex-end;
      // .bl-submit-btn {
      //   width: 120px;
      // }
    }
  }
}

.bl-details {
  background-color: white;
  cursor: pointer;
  position: relative;
  margin-bottom: 1rem;
  flex: 1;
  .bl-summary {
    min-height: 2.5rem;
    border: 1px solid;
    border-collapse: collapse;
    border-radius: 4px;
    padding: 8px;
    background-color: white;
    cursor: pointer;
  }
  .bl-ul {
    position: absolute;
    list-style: none;
    top: 36px;
    left: 0;
    right: 0;
    background-color: #fff;
    margin: 0px;
    padding: 4px;
    margin-top: 2px;
    border: 1px solid #767676;
    border-radius: 4px;
    z-index: 1;
    .bl-li {
      margin: 0px;
      padding: 0px;
      .bl-label {
        cursor: pointer;
        display: inline-block;
        width: 100%;
        margin-bottom: 4px;
        padding: 4px 0;
        &.bl-label:hover,
        &.bl-label:has(input:checked) {
          background-color: #0255f0;
          color: white;
        }
      }
    }
  }
}
</style>
