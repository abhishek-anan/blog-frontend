<template>
  <div class="bl-top-container">
    <div class="bl-top-section bl-flex">
      <div class="bl-top-contain bl-flex bl-h-center bl-direction-column">
        <div class="bl-top-heading bl-fw-600">Blog with us and share your story in a single click!"</div>
        <div class="bl-flex bl-top-btn-wrap">
          <NuxtLink to="/blog-write" class="bl-top-btn bl-top-btn bl-link" v-if="authUser">Write blog</NuxtLink>
          <NuxtLink to="/signup" class="bl-top-btn bl-top-btn bl-link" v-if="!authUser">Register</NuxtLink>
        </div>
      </div>
      <div class="bl-img">
        <img src="/images/home-hero.jpg" class="bl-img-cover" width="1582" height="1232" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCommonStates } from "~/store/commonStates";
import { useAuthStore } from "~/store/authStore";

const commonStates = useCommonStates();
const authStore = useAuthStore();
const { setNavActive } = commonStates;
const { logout } = authStore;
const authUser = computed(() => authStore.authUser);
const navActive = computed(() => commonStates.navActive);
</script>

<style lang="scss" scoped>
.bl-top-container {
  height: 100vh;
  position: sticky;
  top: 0;
  @media screen and (max-width: 800px) {
    position: static;
    height: 100%;
    // flex-direction: column;
  }
  .bl-top-nav-container {
    height: 5rem;
    padding: 0.5rem 2.5rem;
    background-color: #008080;
    color: #fff;
    transition: all 0.5s linear;
    &.bl-top-nav-height {
      height: 0;
      overflow-y: hidden;
      transition: all 0.5s linear;
      padding: 0 2.5rem;
      .bl-top-nav-links {
        height: 0;
      }
      .bl-top-nav-logo {
        height: 0;
      }
    }
    .bl-top-nav-links {
      gap: 1rem;
      .bl-top-nav-link {
        padding: 0.5rem;
        cursor: pointer;
        &:hover {
          font-weight: 600;
        }
      }
      .bl-top-nav-link-active {
        border-bottom: 4px solid #fff;
        font-weight: 600;
      }
    }
    .bl-btn-wrap {
      gap: 0.5rem;
      .bl-profile-icon {
        height: 2rem;
        width: 2rem;
      }
      .bl-logout {
        color: red;
        cursor: pointer;
      }
    }
  }
  .bl-top-section {
    background-color: #008080;
    color: #fff;
    padding: 16px 24px 64px;
    gap: 1rem;
    height: 100vh;
    @media screen and (max-width: 800px) {
      height: 100%;
      flex-direction: column-reverse;
    }
    .bl-top-contain {
      flex: 1;
    }
    .bl-img {
      flex: 1;
    }
    .bl-top-contain {
      .bl-top-heading {
        font-size: 48px;
        margin-bottom: 1.5rem;
      }
      .bl-top-btn-wrap {
        gap: 1rem;
        .bl-top-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          border: none;
          column-gap: 0.5rem;
          font-size: 1.5rem;
          font-weight: 400;
          padding: 0.5rem 1rem;
          border-radius: 3rem;
          height: 4rem;
          width: 12.5rem;
        }
        .bl-top-btn {
          color: #fff;
          background-color: #12b2c3;
        }
        .bl-top-btn2 {
          color: #fff;
          border: 4px solid #12b2c3;
          background-color: transparent;
        }
      }
    }
  }
}
</style>
