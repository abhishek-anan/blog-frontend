<template>
  <div class="">
    <TopSection />
    <div class="bl-home-container bl-flex">
      <div class="bl-home-left-section">
        <div class="bl-f-24 bl-fw-500 bl-home-heading">Recent Blog</div>
        <div class="bl-flex bl-wrap bl-blog-wrap">
          <template v-for="(blog, index) in blogList.slice(0, 4)" :key="index">
            <BlogCard class="bl-blog-main" :blog="blog" />
          </template>
        </div>
      </div>
      <div class="bl-home-right">
        <div class="bl-home-right-section">
          <div class="bl-top-articles-title bl-f-20 bl-fw-500">Top article</div>
          <div class="bl-top-articles">
            <template v-for="(blog, index) in blogList.slice(0, 4)" :key="index">
              <NuxtLink :to="`/blog-detail/${blog.id}`" class="bl-top-article bl-f-16 bl-fw-400 bl-link">
                {{ blog.title }}
              </NuxtLink>
            </template>
          </div>
        </div>
        <div class="bl-home-right-section">
          <div class="bl-top-articles-title bl-f-20 bl-fw-500">Top Category</div>
          <template v-for="(category, index) in categoryList" :key="index">
            <div class="bl-category-card bl-flex bl-center">
              <div class="bl-f-16 bl-fw-500">{{ category.name }}</div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- <div class="bl-faq-container">
      <div class="bl-faq-heading bl-f-24 bl-fw-600">Frequently asked questions</div>
      <div class="bl-faq-block">
        <div class="bl-faq-wrap">
          <div class="bl-faq-question">What is BeyondTheByline about?</div>
          <div class="bl-faq-answer">
            BeyondTheByline is a platform dedicated to diverse topics, including lifestyle, travel, technology, culture,
            and personal development. We curate engaging content, from informative articles to inspiring stories, to
            cater to a wide range of interests.
          </div>
        </div>
        <div class="bl-faq-wrap">
          <div class="bl-faq-question">How often do you update your content?</div>
          <div class="bl-faq-answer">
            We strive to provide fresh content regularly. Our team publishes new articles multiple times a week,
            ensuring there’s always something new and exciting to discover on BeyondTheByline.
          </div>
        </div>
        <div class="bl-faq-wrap">
          <div class="bl-faq-question">Can I submit my own content to be published on your blog?</div>
          <div class="bl-faq-answer">
            Absolutely! We welcome guest contributions from passionate writers. If you have a compelling story or a
            unique perspective to share, please visit our "Write for Us" page to learn about our submission guidelines
            and how to get involved.
          </div>
        </div>
        <div class="bl-faq-wrap">
          <div class="bl-faq-question">How can I stay updated with the latest posts?</div>
          <div class="bl-faq-answer">
            You can stay in the loop by subscribing to our newsletter. By doing so, you'll receive regular updates about
            our newest articles, exclusive content, and special promotions, directly in your inbox.
          </div>
        </div>
        <div class="bl-faq-wrap">
          <div class="bl-faq-question">Do I need to create an account to read your articles?</div>
          <div class="bl-faq-answer">
            No, you don’t need an account to access our content. All articles on [Your Blog Name] are freely accessible
            to everyone. However, creating an account allows you to engage in discussions, leave comments, and
            participate in our community.
          </div>
        </div>
        <div class="bl-faq-wrap">
          <div class="bl-faq-question">How can I contact your team if I have a question or feedback?</div>
          <div class="bl-faq-answer">
            We value your feedback and inquiries. Please feel free to reach out to us via our Contact Us page. You can
            also connect with us on social media platforms, including Facebook, Twitter, and Instagram, where we
            actively engage with our audience.
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { useBlogStore } from "~/store/blogStore";
import { useCategoryStore } from "~/store/categoryStore";
import { useCommonStates } from "~/store/commonStates";

const commonStates = useCommonStates();
const blogStore = useBlogStore();
const categoryStore = useCategoryStore();
const { fetchBlogs } = blogStore;
const { setNavActive } = commonStates;
const { fetchCategory } = categoryStore;
const blogList = computed(() => blogStore.blogList);
const categoryList = computed(() => categoryStore.categoryList);
if (process.client) {
  window.addEventListener("scroll", () => {
    let ele = document.querySelector(".bl-nav-container");
    // if (window.scrollY < 520 && !ele.classList.contains("bl-nav-height")) {
    //   ele.classList.add("bl-nav-height");
    // } else if (window.scrollY > 520 && ele.classList.contains("bl-nav-height")) {
    //   ele.classList.remove("bl-nav-height");
    // }
    if (window.scrollY < 520 && ele.classList.contains("bl-nav-height")) {
      ele.classList.remove("bl-nav-height");
    } else if (window.scrollY > 520 && !ele.classList.contains("bl-nav-height")) {
      ele.classList.add("bl-nav-height");
    }
  });
}

onUnmounted(() => {
  // clearInterval(x);
  if (process.client) {
    let ele = document.querySelector(".bl-nav-container");
    ele.classList.remove("bl-nav-height");
  }
});

onMounted(async () => {
  await fetchBlogs();
  await fetchCategory();
  setNavActive("home");
});
</script>

<style lang="scss" scoped>
.bl-home-container {
  position: relative;
  background-color: #008080;
  padding: 2rem 2.5rem;
  gap: 1.5rem;
  @media screen and (max-width: 800px) {
    padding: 1.5rem;
    flex-direction: column;
  }
  .bl-home-left-section {
    flex: 1.5;
    @media screen and (max-width: 800px) {
      flex: 1;
    }
    .bl-home-heading {
      color: #fff;
      margin-bottom: 1rem;
    }
    .bl-blog-wrap {
      gap: 1rem;
    }
    .bl-blog-category {
      margin-bottom: 1rem;
    }
    .bl-two-blog {
      gap: 1rem;
      margin-bottom: 2.5rem;
    }
  }
  .bl-home-right {
    flex: 0.5;
    @media screen and (max-width: 800px) {
      flex: 1;
    }
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
        display: block;
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
.bl-faq-container {
  position: relative;
  background-color: #008080;
  color: #fff;
  padding: 2rem 2.5rem;
  .bl-faq-heading {
    margin-bottom: 1rem;
  }
}
.bl-category-card {
  padding: 1rem 0.5rem;
  // border: 1px solid;
  cursor: pointer;
  margin-bottom: 1rem;
  border-radius: 1rem;
  background-color: #fff;
  &:hover {
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.3);
  }
}
</style>
