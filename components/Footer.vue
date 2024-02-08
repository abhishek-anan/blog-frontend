<template>
  <div class="bl-footer-container">
    <div class="bl-flex bl-footer-blocks bl-space-btw bl-wrap">
      <div class="bl-footer-header">
        <div class="bl-nav-logo bl-f-28 bl-fw-600">BeyondTheByline:</div>
      </div>
      <div class="bl-footer-block">
        <NuxtLink to="/about" class="bl-footer-link bl-link bl-f-16 bl-fw-400">About</NuxtLink>
        <NuxtLink to="/blog" class="bl-footer-link bl-link bl-f-16 bl-fw-400">Blog</NuxtLink>
        <NuxtLink to="/contact" class="bl-footer-link bl-link bl-f-16 bl-fw-400">Contact</NuxtLink>
      </div>
      <div class="bl-footer-subcribe bl-flex bl-direction-column bl-h-center">
        <div class="bl-footer-subcribe-text bl-f-16 bl-fw-400">
          Sign up to our newsletter and get all of the latest news and updates.
        </div>
        <div class="bl-subcribe-input-wrap">
          <input type="text" class="bl-input bl-subcribe-input" placeholder="Enter Email*" />
          <button class="bl-subcribe-btn bl-primary-btn">Subscribe</button>
        </div>
      </div>
    </div>
    <div class="bl-footer-bottom bl-flex bl-space-btw bl-v-center">
      <div class="bl-copywrite bl-f-14 bl-fw-400">
        © Copyright | BeyondTheByline Website Builder by Abhishek | All rights reserved | Powered by Nuxt
      </div>
      <div class="bl-footer-social bl-flex">
        <div class="bl-icon-warp">
          <SvgInstagramIcon class="bl-icon" />
        </div>
        <div class="bl-icon-warp">
          <SvgFaceBookIcon class="bl-icon" />
        </div>
        <div class="bl-icon-warp">
          <SvgLinkedInIcon class="bl-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bl-footer-container {
  position: relative;
  padding: 2.5rem 4rem;
  background-color: #141414;
  color: #fff;
  @media screen and (max-width: 800px) {
    padding: 1.5rem;
  }
  .bl-footer-blocks {
    padding: 16px;
    margin-bottom: 3rem;
    @media screen and (max-width: 800px) {
      margin-bottom: 1rem;
    }
    .bl-footer-header {
      flex: 1;
      max-width: 280px;
      min-width: 280px;
      padding: 1rem 0;
    }
    .bl-footer-block {
      flex: 1;
      max-width: 280px;
      min-width: 280px;
      .bl-footer-link {
        display: block;
        margin-bottom: 1rem;
        max-width: 180px;
        cursor: pointer;
        &:hover {
          color: #008080;
        }
      }
    }
    .bl-footer-subcribe {
      flex: 1;
      max-width: 320px;
      min-width: 280px;
      .bl-footer-subcribe-text {
        margin-bottom: 1rem;
      }
      .bl-subcribe-input-wrap {
        position: relative;
        .bl-subcribe-input {
          height: 3rem;
        }
        .bl-subcribe-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          height: 2rem;
          background-color: #141414;
          color: #fff;
          &:hover {
            background-color: #008080;
            color: #fff;
          }
        }
      }
    }
  }
  .bl-footer-bottom {
    @media screen and (max-width: 800px) {
      flex-direction: column;
    }
    .bl-footer-social {
      gap: 1rem;
      @media screen and (max-width: 800px) {
        margin-top: 1rem;
      }
      .bl-icon-warp {
        height: 2.5rem;
        width: 2.5rem;
        background-color: #282828;
        padding: 4px;
        border-radius: 0.5rem;
        cursor: pointer;
        .bl-icon {
          fill: #fff;
        }
        &:hover {
          background-color: #008080;
        }
      }
    }
  }
}
</style>
