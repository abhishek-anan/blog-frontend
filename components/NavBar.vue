<template>
  <div class="bl-nav-container bl-flex bl-space-btw bl-v-center">
    <NuxtLink to="/" class="bl-link">
      <div class="bl-nav-logo bl-f-28 bl-fw-600">BeyondTheByline</div>
    </NuxtLink>
    <div class="bl-nav-links bl-flex">
      <NuxtLink to="/" class="bl-link">
        <div class="bl-nav-link bl-f-16 bl-fw-400" :class="`${navActive === 'home' ? 'bl-nav-link-active' : ''}`">
          Home
        </div>
      </NuxtLink>
      <NuxtLink to="/about" class="bl-link">
        <div class="bl-nav-link bl-f-16 bl-fw-400" :class="`${navActive === 'about' ? 'bl-nav-link-active' : ''}`">
          About
        </div>
      </NuxtLink>
      <NuxtLink to="/blog" class="bl-link">
        <div class="bl-nav-link bl-f-16 bl-fw-400" :class="`${navActive === 'blog' ? 'bl-nav-link-active' : ''}`">
          Blog
        </div>
      </NuxtLink>
      <NuxtLink to="/blog-write" class="bl-link" v-if="authUser">
        <div class="bl-nav-link bl-f-16 bl-fw-400" :class="`${navActive === 'blog-write' ? 'bl-nav-link-active' : ''}`">
          Write a Blog
        </div>
      </NuxtLink>
      <NuxtLink to="/contact" class="bl-link">
        <div class="bl-nav-link bl-f-16 bl-fw-400" :class="`${navActive === 'contact' ? 'bl-nav-link-active' : ''}`">
          Contact
        </div>
      </NuxtLink>
      <NuxtLink to="/contact" class="bl-link" v-if="authUser">
        <div class="bl-nav-link bl-f-16 bl-fw-400" :class="`${navActive === '' ? 'bl-nav-link-active' : ''}`">
          Profile
        </div>
      </NuxtLink>
      <div class="bl-btn-wrap" v-if="!authUser">
        <NuxtLink class="bl-primary-btn bl-link" to="/login"> Login/signup </NuxtLink>
      </div>
    </div>
    <div class="bl-hambergIcon-wrap">
      <SvgHambergMenuIcon class="bl-icon" />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/authStore";
import { useCommonStates } from "~/store/commonStates";

const commonStates = useCommonStates();
const authStore = useAuthStore();
const { logout } = authStore;
const authUser = computed(() => authStore.authUser);
const navActive = computed(() => commonStates.navActive);

function formatName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1, name.lenght);
}
</script>

<style lang="scss" scoped>
.bl-nav-container {
  height: 5rem;
  padding: 0.5rem 2.5rem;
  background-color: #008080;
  color: #fff;
  box-shadow: none;
  transition: all 0.3s ease-out;
  @media screen and (max-width: 800px) {
    padding: 0.5rem 1rem;
  }
  .bl-nav-links {
    gap: 1rem;
    .bl-nav-link {
      padding: 0.5rem;
      cursor: pointer;
      &:hover {
        color: #fff;
        font-weight: 600;
      }
    }
    .bl-nav-link-active {
      border-bottom: 4px solid #fff;
      font-weight: 600;
      color: #fff;
    }
    @media screen and (max-width: 800px) {
      display: none;
    }
  }
  .bl-hambergIcon-wrap {
    width: 1.5rem;
    height: 1.5rem;
    .bl-icon {
      fill: #fff;
    }
    @media screen and (min-width: 800px) {
      display: none;
    }
  }
  // .bl-btn-wrap {
  //   gap: 0.5rem;
  //   .bl-profile-icon {
  //     height: 2rem;
  //     width: 2rem;
  //   }
  //   .bl-logout {
  //     color: red;
  //     cursor: pointer;
  //   }
  // }
  &.bl-nav-height {
    height: 5rem;
    padding: 0.5rem 2.5rem;
    background-color: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    color: black;
    position: sticky;
    top: 0;
    z-index: 10;
    .bl-nav-link:hover {
      color: #008080;
    }
    .bl-nav-link-active {
      border-bottom: 4px solid #008080;
      font-weight: 600;
      color: #008080;
    }
    .bl-icon {
      fill: #008080;
    }
  }
}
</style>
