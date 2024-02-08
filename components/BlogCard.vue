<template>
  <NuxtLink
    v-if="(blog && blog.id) || (blog && blog.blog_id)"
    :to="`/blog-detail/${blog.id ? blog.id : blog.blog_id}`"
    class="bl-link bl-blog-container"
  >
    <div class="bl-blog-img">
      <img
        :src="blog.image ? `http://localhost:8000/media/${blog.image}` : '/images/blog.jpg'"
        width="600"
        height="250"
        class="bl-img-cover"
        alt="BeyondTheByline"
      />
    </div>
    <div class="bl-blog-content">
      <div v-if="blog && blog.category_name" class="bl-blog-category bl-f-14 bl-fw-400">
        {{ blog.category_name }}
      </div>
      <div class="bl-blog-title bl-f-20 bl-fw-600" v-if="blog && blog.title">{{ blog.title }}</div>
      <div class="bl-blog-title bl-f-20 bl-fw-600" v-if="blog && blog.blog_title">{{ blog.blog_title }}</div>
      <div class="bl-small-desc bl-f-14 bl-fw-400" v-if="blog && blog.sub_desc">
        {{ formatDesc(blog.sub_desc) }}
      </div>
      <div class="bl-small-desc bl-f-14 bl-fw-400" v-if="blog && blog.blog_sub_desc">
        {{ formatDesc(blog.blog_sub_desc) }}
      </div>
      <div class="bl-flex">
        <div class="bl-blog-author bl-f-14 bl-fw-600">{{ blog.user_name }}</div>
        <div class="bl-blog-date bl-f-14 bl-fw-400">{{ formatDate(blog.created) }}</div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import { useCommonStates } from "~/store/commonStates";

const commonStates = useCommonStates();
const { formatDate } = commonStates;

const props = defineProps({
  blog: {
    type: Object,
    required: true,
  },
});

function getUrl(id) {
  return `/blog-detail/${id}`;
}

function formatDesc(value) {
  if (value && value.length >= 115) {
    return value.slice(0, 115) + "...";
  }
  return value;
}
</script>

<style lang="scss" scoped>
.bl-blog-container {
  min-width: 20rem;
  flex-basis: 48%;
  background-color: #fff;
  color: #121212;
  border-radius: 1rem;
  border: 2px solid #26cfa0;
  position: relative;
  @media screen and (max-width: 500px) {
    flex: 1;
    min-width: 0;
  }
  .bl-blog-img {
    border-radius: 1rem 1rem 0 0;
    overflow: hidden;
    max-height: 220px;
    img {
      min-height: 220px;
      max-height: 220px;
    }
  }
  .bl-blog-content {
    padding: 1rem 1.5rem;
  }
  .bl-blog-title {
    display: inline-block;
    margin-bottom: 0.5rem;
  }
  .bl-blog-category {
    color: #6c6c6c;
    margin-bottom: 0.25rem;
  }
  .bl-small-desc {
    min-height: 36px;
    margin-bottom: 0.5rem;
  }
  .bl-blog-author {
    margin-right: 0.25rem;
  }
}
</style>
