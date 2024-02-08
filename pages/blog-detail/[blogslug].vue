<template>
  <div class="bl-blog-detail-container">
    <div class="bl-blog-detail-img" v-if="currBlog && currBlog.image">
      <img
        :src="`http://localhost:8000/media/${currBlog.image}`"
        class="bl-img-cover"
        width="750"
        height="250"
        alt="BeyondTheByline"
      />
    </div>
    <div class="bl-blog-author bl-flex bl-f-16 bl-fw-200">
      <div class="bl-blog-author-name bl-fw-600" v-if="currBlog.user_name">{{ currBlog.user_name }}</div>
      <div class="bl-blog-date" v-if="currBlog.created">{{ formatDate(currBlog.created) }}</div>
    </div>
    <div class="bl-blog-content-container bl-flex">
      <div class="bl-blog-detail-content">
        <template v-if="currBlog">
          <div class="bl-blog-title bl-f-24 bl-fw-600">{{ currBlog.title }}</div>
          <div class="bl-blog-title bl-f-16 bl-fw-400">
            {{ currBlog.sub_desc }}
          </div>
        </template>
        <template v-for="(item, i) in currBlogDetail" :key="i">
          <div class="bl-blog-para">
            <div class="bl-blog-sub-title bl-f-20 bl-fw-600" v-if="item.heading">{{ item.heading }}</div>
            <div class="bl-blog-desc bl-f-16 bl-fw-500">
              {{ item.text }}
            </div>
          </div>
        </template>
      </div>
      <div class="bl-blog-right-container">
        <div class="bl-blog-tags-container" v-if="tagList && tagList.length > 0">
          <div class="bl-blog-tags-title bl-f-20 bl-fw-500">Top tag</div>
          <div class="bl-blog-tags bl-flex bl-wrap">
            <template v-for="(item, i) in tagList" :key="i">
              <NuxtLink class="bl-blog-tag bl-link bl-f-16 bl-fw-400" :to="`/blog?tag_id=${item.tag_id}`"
                >#{{ item.tag_name }}</NuxtLink
              >
            </template>
          </div>
        </div>
        <div class="bl-blog-tags-container">
          <div class="bl-blog-tags-title bl-f-20 bl-fw-500">Top article</div>
          <div class="bl-blog-tags bl-flex bl-wrap">
            <template v-for="i in 8" :key="i">
              <div class="bl-blog-tag bl-f-16 bl-fw-400">#hello</div>
              <div class="bl-blog-tag bl-f-16 bl-fw-400">#technology</div>
              <div class="bl-blog-tag bl-f-16 bl-fw-400">#foods</div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBlogStore } from "~/store/blogStore";
import { useCommonStates } from "~/store/commonStates";

const commonStates = useCommonStates();
const blogStore = useBlogStore();
const { fetchBlogDetail, fetchTagByBlog, fetchCurrBlog } = blogStore;
const currBlog = computed(() => blogStore.currBlog);
const currBlogDetail = computed(() => blogStore.currBlogDetail);
const tagList = computed(() => blogStore.tagList);
const { setNavActive, formatDate } = commonStates;
const route = useRoute();
const blogId = route.params.blogslug;

onMounted(async () => {
  setNavActive("blog");
  await fetchBlogDetail({ id: blogId });
  await fetchCurrBlog({ id: blogId });
  await fetchTagByBlog({ id: blogId });
});
</script>

<style lang="scss" scoped>
.bl-blog-detail-container {
  background-color: #008080;
  padding: 2rem 2.5rem;
  @media screen and (max-width: 800px) {
    padding: 1.5rem;
  }
  .bl-blog-detail-img {
    height: 20rem;
  }
  .bl-blog-author {
    padding: 0.25rem 0;
    gap: 0.25rem;
    margin-bottom: 1rem;
  }
  .bl-blog-content-container {
    gap: 1.5rem;
    @media screen and (max-width: 800px) {
      flex-direction: column;
    }
    .bl-blog-detail-content {
      background-color: #fff;
      border-radius: 0.5rem;
      flex: 1.5;
      padding: 2rem 1rem;
      .bl-blog-title {
        margin-bottom: 1rem;
      }
      .bl-blog-para {
        margin-bottom: 1rem;
        .bl-blog-sub-title {
          margin-bottom: 0.5rem;
        }
      }
    }
    .bl-blog-right-container {
      flex: 0.5;
      .bl-blog-tags-container {
        background-color: #fff;
        margin-bottom: 2rem;
        padding: 1rem;
        border-radius: 0.5rem;
        .bl-blog-tags-title {
          margin-bottom: 1rem;
          display: inline-block;
          border-bottom: 4px solid;
        }
        .bl-blog-tags {
          row-gap: 0.5rem;
          column-gap: 0.25rem;
          .bl-blog-tag {
            // margin-bottom: 0.75rem;
            cursor: pointer;
            &:hover {
              color: #4169e1;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
</style>
