<template>
  <div class="bl-login-container bl-flex">
    <div class="bl-left-section"></div>
    <div class="bl-right-section bl-flex bl-center">
      <div class="bl-login-form">
        <div class="bl-form-title bl-f-24 bl-fw-600">Register in BeyondTheByline</div>
        <div class="bl-input-wrap">
          <div class="bl-f-12 bl-fw-400 bl-err-msg-color">{{ errText }}</div>
          <div class="bl-f-12 bl-fw-400 bl-success-msg-color">{{ successText }}</div>
          <div class="bl-label bl-f-16 bl-fw-400">Name:</div>
          <input type="text" class="bl-input" v-model="signUpInfo.name.value" />
          <div class="bl-f-12-i bl-fw-300 bl-err-msg-color">
            {{ signUpInfo.name.errMsg }}
          </div>
        </div>
        <div class="bl-input-wrap">
          <div class="bl-label bl-f-16 bl-fw-400">Mobile:</div>
          <input type="text" class="bl-input" v-model="signUpInfo.mobile.value" />
          <div class="bl-f-12-i bl-fw-300 bl-err-msg-color">
            {{ signUpInfo.mobile.errMsg }}
          </div>
        </div>
        <div class="bl-input-wrap">
          <div class="bl-label bl-f-16 bl-fw-400">Email:</div>
          <input type="text" class="bl-input" v-model="signUpInfo.email.value" />
          <div class="bl-f-12-i bl-fw-300 bl-err-msg-color">
            {{ signUpInfo.email.errMsg }}
          </div>
        </div>
        <div class="bl-input-wrap">
          <div class="bl-label bl-f-16 bl-fw-400">Password:</div>
          <input type="password" class="bl-input" v-model="signUpInfo.password.value" />
          <div class="bl-f-12-i bl-fw-300 bl-err-msg-color">
            {{ signUpInfo.password.errMsg }}
          </div>
        </div>
        <div class="bl-btn-wrap bl-flex">
          <button class="bl-primary-btn bl-login-btn" @click="signupRequest">Signup</button>
        </div>
        <div class="bl-f-14 bl-fw-400 bl-sign-block">
          I already register to
          <NuxtLink to="/" class="bl-link">
            <span class="bl-fw-600">BeyondTheByline</span>
          </NuxtLink>
          <NuxtLink to="/login" class="bl-f-20 bl-fw-600 bl-sign-text bl-link">Login</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/authStore";
import { useCommonStates } from "~/store/commonStates";

const commonstates = useCommonStates();
const authStore = useAuthStore();

const { validateFields } = commonstates;
const { register } = authStore;
const errText = ref("");
const successText = ref("");
const btnDisable = ref(false);
definePageMeta({
  layout: false,
});

const signUpInfo = ref({
  name: {
    value: "",
    type: "",
    errMsg: "",
  },
  mobile: {
    value: "",
    type: "",
    errMsg: "",
  },
  email: {
    value: "",
    type: "",
    errMsg: "",
  },
  password: {
    value: "",
    type: "password",
    errMsg: "",
  },
});

async function signupRequest() {
  const isValid = validateFields(signUpInfo.value, {
    name: {
      required: true,
      type: "name",
    },
    email: {
      required: true,
      type: "email",
    },
    mobile: {
      required: true,
      type: "mobile",
    },
    password: {
      required: true,
      type: "password",
    },
  });
  if (isValid) {
    btnDisable.value = true;
    const formData = {};
    formData.name = signUpInfo.value.name.value;
    formData.email = signUpInfo.value.email.value;
    formData.mobile = signUpInfo.value.mobile.value;
    formData.password = signUpInfo.value.password.value;
    await register(formData).then((res) => {
      if (res.status) {
        successText.value = "Account created successfully! and now to login";
      } else {
        console.log(res, "first");
        if (res.data.status === "validation-error") {
          errText.value = res.data?.errors?.email[0];
        } else {
          errText.value = "Something Went Wrong!";
        }
      }
      setTimeout(() => {
        successText.value = "";
        errText.value = "";
      }, 2000);
    });
    btnDisable.value = false;
  }
}
</script>

<style lang="scss" scoped>
.bl-login-container {
  background-image: url("/images/login.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100%;
  position: relative;
  .bl-left-section {
    flex: 1;
  }
  .bl-right-section {
    flex: 1;
  }
  .bl-login-form {
    width: 70%;
    border-radius: 1rem;
    background-color: #fff;
    padding: 1.5rem;
    .bl-form-title {
      margin-bottom: 1.5rem;
    }
    .bl-input-wrap {
      margin-bottom: 1rem;
      .bl-label {
        margin-bottom: 0.25rem;
      }
    }
    .bl-btn-wrap {
      justify-content: flex-end;
      margin-bottom: 1rem;
      .bl-login-btn {
        width: 120px;
      }
    }
    .bl-sign-block {
      display: inline-flex;
      gap: 0.25rem;
      align-items: baseline;
      .bl-sign-text {
        color: #008080;
      }
    }
  }
}
</style>
