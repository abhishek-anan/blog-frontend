<template>
  <div class="bl-home-container bl-flex">
    <div class="bl-home-left-section">
      <!-- <div class="bl-f-24 bl-fw-500 bl-home-heading">Recent Blog</div> -->
      <div class="bl-flex bl-wrap bl-blog-wrap">
        <template v-for="(blog, index) in blogList" :key="index">
          <BlogCard class="bl-blog-main" :blog="blog" />
        </template>
      </div>
    </div>
    <div class="bl-home-right">
      <div class="bl-home-right-section">
        <div class="bl-top-articles-title bl-f-20 bl-fw-500">Top article</div>
        <div class="bl-top-articles">
          <div class="bl-top-article bl-f-16 bl-fw-400">The Grand Stage: Cricket World Cup 2023 Unveiled</div>
          <div class="bl-top-article bl-f-16 bl-fw-400">The Grand Stage: Cricket World Cup 2023 Unveiled</div>
          <div class="bl-top-article bl-f-16 bl-fw-400">The Grand Stage: Cricket World Cup 2023 Unveiled</div>
        </div>
      </div>
      <div class="bl-home-right-section">
        <div class="bl-top-articles-title bl-f-20 bl-fw-500">Top Category</div>
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBlogStore } from "~/store/blogStore";
import { useCommonStates } from "~/store/commonStates";

const commonStates = useCommonStates();
const blogStore = useBlogStore();
const { setNavActive } = commonStates;
const { fetchBlogs, fetchTagBytag } = blogStore;
const blogList = computed(() => blogStore.blogList);
const route = useRoute();

onMounted(async () => {
  // await fetchBlogs();
  if (route && route.query && route.query.tag_id) {
    await fetchTagBytag({ id: route.query.tag_id });
  } else if (!route && !route.query) {
    await fetchBlogs();
  }
  setNavActive("blog");
});
</script>

<style lang="scss" scoped>
.bl-home-container {
  background-color: #008080;
  padding: 2rem 2.5rem;
  gap: 1.5rem;
  @media screen and (max-width: 800px) {
    padding: 1.5rem;
    flex-direction: column;
  }
  .bl-home-left-section {
    flex: 1.5;
    .bl-blog-wrap {
      gap: 1rem;
    }
  }
  .bl-home-right {
    flex: 0.5;
  }
  .bl-home-right-section {
    .bl-top-articles-title {
      margin-bottom: 1rem;
      display: inline-block;
      border-bottom: 4px solid;
      color: #fff;
    }
    .bl-top-articles {
      margin-bottom: 2rem;
      padding: 1rem;
      background-color: #fff;
      border-radius: 0.5rem;
      .bl-top-article {
        margin-bottom: 0.75rem;
        cursor: pointer;
        &:hover {
          color: #4169e1;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
