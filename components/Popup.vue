<template>
  <div class="bl-popup-conatiner bl-flex bl-center">
    <div class="bl-popup-card">
      <div class="bl-popup-header">
        <div class="bl-f-24 bl-f-500" v-if="popupType === 'category'">Create Category</div>
        <div class="bl-f-24 bl-f-500" v-if="popupType === 'tag'">Create Tsg</div>
      </div>
      <div class="bl-popup-form">
        <div class="bl-f-12 bl-fw-300 bl-success-msg-color">{{ successMsg }}</div>
        <div class="bl-f-12 bl-fw-300 bl-err-msg-color">{{ errMsg }}</div>
        <div class="bl-input-wrap">
          <div class="bl-label bl-f-16 bl-fw-400" v-if="popupType === 'category'">Category name:</div>
          <div class="bl-label bl-f-16 bl-fw-400" v-if="popupType === 'tag'">Tag name:</div>
          <input type="text" class="bl-input" placeholder="Enter name" v-model="popupInfo.name.value" />
          <div class="bl-f-12 bl-fw-300 bl-err-msg-color">{{ popupInfo.name.errMsg }}</div>
        </div>
        <div class="bl-btn-wrap bl-flex">
          <button class="bl-secondary-btn bl-submit-btn" @click="setPopup">Cancel</button>
          <button class="bl-primary-btn bl-submit-btn" @click="saveField">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/authStore";
import { useCommonStates } from "~/store/commonStates";
import { useCategoryStore } from "~/store/categoryStore";
import { useTagStore } from "~/store/tagStore";

const commonStates = useCommonStates();
const authStore = useAuthStore();
const categoryStore = useCategoryStore();
const tagStore = useTagStore();
const { createTag } = tagStore;
const { setPopup, validateFields } = commonStates;
const { createCategory } = categoryStore;
const popupType = computed(() => commonStates.popupType);
const authUser = computed(() => authStore.authUser);
const errMsg = ref("");
const successMsg = ref("");
const popupInfo = ref({
  name: {
    value: "",
    type: "",
    errMsg: "",
  },
});

async function saveField() {
  const isValid = validateFields(popupInfo.value, {
    name: {
      required: true,
      type: "name",
    },
  });
  if (isValid) {
    let formData = {};
    formData.name = popupInfo.value.name.value;
    formData.created_by = authUser.value.id;
    formData.modified_by = authUser.value.id;
    if (popupType.value === "category") {
      console.log(formData);
      await createCategory(formData).then((res) => {
        if (res.status) {
          successMsg.value = res.data.message;
          setTimeout(() => {
            setPopup();
          }, 1000);
        } else {
          errMsg.value = "Something went wrong!";
          if (res.data && res.data && res.data.errors && res.data.errors.name[0]) {
            errMsg.value = res.data.errors.name[0];
          }
        }
      });
    } else if (popupType.value === "tag") {
      await createTag(formData).then((res) => {
        if (res.status) {
          successMsg.value = res.data.message;
          setTimeout(() => {
            setPopup();
          }, 1000);
        } else {
          errMsg.value = "Something went wrong!";
          if (res.data && res.data && res.data.errors && res.data.errors.name[0]) {
            errMsg.value = res.data.errors.name[0];
          }
        }
      });
    }
    setTimeout(() => {
      errMsg.value = "";
      successMsg.value = "";
    });
  }
}
</script>

<style lang="scss" scoped>
.bl-popup-conatiner {
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.5);
  z-index: 12;
  .bl-popup-card {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    border-radius: 0.5rem;
    padding: 1.5rem;
    background-color: #fff;
    min-width: 25rem;
    .bl-popup-header {
      margin-bottom: 1rem;
    }
    .bl-popup-form {
      .bl-input-wrap {
        margin-bottom: 1rem;
        .bl-label {
          margin-bottom: 0.25rem;
        }
      }
      .bl-btn-wrap {
        gap: 1rem;
        justify-content: flex-end;
      }
    }
  }
}
</style>
