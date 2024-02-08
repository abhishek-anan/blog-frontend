<template>
  <div class="bl-login-container bl-flex">
    <div class="bl-left-section"></div>
    <div class="bl-right-section bl-flex bl-center">
      <div class="bl-login-form">
        <div class="bl-form-title bl-f-24 bl-fw-600">Login in BeyondTheByline</div>
        <div class="bl-input-wrap">
          <div class="bl-f-12 bl-fw-400 bl-err-msg-color">{{ loginErrorMsg }}</div>
          <div class="bl-label bl-f-16 bl-fw-400">Email:</div>
          <input type="text" class="bl-input" v-model="loginInfo.email.value" />
          <div class="bl-f-12-i bl-fw-300 bl-err-msg-color">
            {{ loginInfo.email.errMsg }}
          </div>
        </div>
        <div class="bl-input-wrap bl-passfeild">
          <div class="bl-label bl-f-16 bl-fw-400">Password:</div>
          <input :type="loginInfo.password.type" class="bl-input" v-model="loginInfo.password.value" />
          <div class="bl-f-12-i bl-fw-300 bl-err-msg-color">
            {{ loginInfo.password.errMsg }}
          </div>
          <div class="bl-eye-icon" v-if="loginPassHide" @click="loginPassSee">
            <SvgEyeOffIcon class="bl-icon bl-icon-on" />
          </div>
          <div class="bl-eye-icon" v-else @click="loginPassSee">
            <SvgEyeOnIcon class="bl-icon bl-icon-off" />
          </div>
        </div>
        <div class="bl-btn-wrap bl-flex">
          <button class="bl-primary-btn bl-login-btn" @click="validatePass">Login</button>
        </div>
        <div class="bl-f-14 bl-fw-400 bl-sign-block">
          new to
          <NuxtLink to="/" class="bl-link">
            <span class="bl-fw-600">BeyondTheByline</span>
          </NuxtLink>
          <NuxtLink to="/signup" class="bl-f-20 bl-fw-600 bl-sign-text bl-link">Register here</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/authStore";
import { useCommonStates } from "~/store/commonStates";

const authStore = useAuthStore();
const commonStates = useCommonStates();
const { login } = authStore;
const { validateFields } = commonStates;

const btnDisable = ref(false);
const loginErrorMsg = ref("");
const loginPassHide = ref(false);
const loginInfo = ref({
  password: {
    value: "",
    type: "password",
    errMsg: "",
  },
  email: {
    value: "",
    type: "",
    errMsg: "",
  },
});

function loginPassSee() {
  loginPassHide.value = !loginPassHide.value;
  if (loginInfo.value.password.type === "password") {
    loginInfo.value.password.type = "text";
  } else {
    loginInfo.value.password.type = "password";
  }
}

async function validatePass() {
  const isValid = validateFields(loginInfo.value, {
    email: {
      required: true,
      type: "email",
    },
    password: {
      required: true,
      type: "text",
    },
  });
  if (isValid) {
    btnDisable.value = true;
    const formData = {};
    formData.email = loginInfo.value.email.value;
    formData.password = loginInfo.value.password.value;
    await login(formData).then((res) => {
      if (res.status) {
        console.log(res.data);
        if (res && res.data) {
        }
      } else {
        if (res && res.data) {
          console.log(res.data, res);
          loginErrorMsg.value = res.data;
        }
      }
    });
    btnDisable.value = false;
  }
}

definePageMeta({
  layout: false,
});
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
  .bl-passfeild {
    position: relative;
    .bl-eye-icon {
      cursor: pointer;
      width: 1.5rem;
      height: 1.5rem;
      position: absolute;
      top: 2rem;
      right: 0.5rem;
      .bl-icon-on {
        fill: #000;
      }
      .bl-icon-off {
        stroke: #000;
      }
    }
  }
}
</style>
