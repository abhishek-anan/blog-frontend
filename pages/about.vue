<template>
  <div class="bl-about-container">
    <div class="bl-about-top-section bl-flex bl-space-btw">
      <div class="bl-top-content bl-flex bl-direction-column bl-h-center">
        <div class="bl-top-header">About Us</div>
        <div class="bl-top-desc bl-f-24 bl-fw-400">
          Welcome to BeyondTheByline, where passion meets words, and stories come to life. Our journey began 2023,
          driven by a shared love for creativity and a desire to inspire others.
        </div>
      </div>
      <div class="bl-top-img">
        <img src="/images/aboutus.webp" width="1000" height="800" alt="" class="bl-img-contain" />
      </div>
    </div>
    <div class="bl-about-top-section bl-flex bl-space-btw">
      <div class="bl-top-img">
        <img src="/images/who-we-are.jpeg" width="1000" height="800" alt="" class="bl-img-contain" />
      </div>
      <div class="bl-top-content bl-flex bl-direction-column bl-h-center">
        <div class="bl-top-header">Who We Are</div>
        <div class="bl-top-desc bl-f-24 bl-fw-400">
          At BeyondTheByline, we are a team of enthusiastic writers, photographers, and creatives, bound together by our
          love for storytelling. Each member of our team brings a unique perspective and expertise, ensuring a diverse
          range of content that resonates with our readers.
        </div>
      </div>
    </div>
    <div class="bl-about-top-section bl-flex bl-space-btw">
      <div class="bl-top-content bl-flex bl-direction-column bl-h-center">
        <div class="bl-top-header">Our Mission</div>
        <div class="bl-top-desc bl-f-24 bl-fw-400">
          Our mission is to create a space where ideas flourish, perspectives collide, and voices are heard. We believe
          in the power of words to educate, entertain, and empower. Through our carefully crafted articles, inspiring
          stories, and thought-provoking essays, we aim to spark conversations, foster understanding, and foster a sense
          of community among our readers.
        </div>
      </div>
      <div class="bl-top-img">
        <img src="/images/mission.jpg" width="1000" height="800" alt="" class="bl-img-contain" />
      </div>
    </div>
    <div class="bl-about-top-section bl-flex bl-space-btw">
      <div class="bl-top-img">
        <img src="/images/offer.jpg" width="1000" height="800" alt="" class="bl-img-contain" />
      </div>
      <div class="bl-top-content bl-flex bl-direction-column bl-h-center">
        <div class="bl-top-header">What We Offer</div>
        <div class="bl-top-heading bl-f-24 bl-fw-500">Engaging Content</div>
        <div class="bl-top-desc bl-f-24 bl-fw-400">
          From insightful articles on diverse topics to captivating narratives and helpful guides, we offer a wide array
          of content that caters to various interests.
        </div>
        <div class="bl-top-heading bl-f-24 bl-fw-500">Visual Delights</div>
        <div class="bl-top-desc bl-f-24 bl-fw-400">
          Our blog is not just about words; it’s also a visual treat. Explore the world through our lens with stunning
          photographs, vibrant illustrations, and compelling multimedia content.
        </div>
        <div class="bl-top-heading bl-f-24 bl-fw-500">Interactive Community</div>
        <div class="bl-top-desc bl-f-24 bl-fw-400">
          We value our readers and encourage active participation. Join discussions, leave comments, and be a part of
          our growing community of thinkers and dreamers.
        </div>
      </div>
    </div>
    <div class="bl-about-top-section bl-flex bl-space-btw">
      <div class="bl-top-content bl-flex bl-direction-column bl-h-center">
        <div class="bl-top-header">Why Choose Us</div>
        <div class="bl-top-heading bl-f-24 bl-fw-500">Quality</div>
        <div class="bl-top-desc bl-f-24 bl-fw-400">
          We are committed to delivering high-quality, well-researched, and informative content that adds value to your
          life.
        </div>
        <div class="bl-top-heading bl-f-24 bl-fw-500">Diversity</div>
        <div class="bl-top-desc bl-f-24 bl-fw-400">
          Our team represents diverse backgrounds, cultures, and perspectives, ensuring a rich tapestry of content that
          appeals to a wide audience.
        </div>
        <div class="bl-top-heading bl-f-24 bl-fw-500">Inspiration</div>
        <div class="bl-top-desc bl-f-24 bl-fw-400">
          Whether you’re seeking motivation, knowledge, or simply a good read, [Your Blog Name] is your go-to source for
          inspiration and enlightenment.
        </div>
      </div>
      <div class="bl-top-img">
        <img src="/images/why-chose-us.jpg" width="1000" height="800" alt="" class="bl-img-contain" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCommonStates } from "~/store/commonStates";

const commonStates = useCommonStates();
const { setNavActive } = commonStates;

onMounted(() => {
  setNavActive("about");
});
</script>

<style lang="scss" scoped>
.bl-about-container {
  background-color: #008080;
  padding: 2rem 2.5rem;
  color: #fff;
  @media screen and (max-width: 800px) {
    padding: 1.5rem;
  }
  .bl-about-top-section {
    height: 100%;
    gap: 2rem;
    margin-bottom: 4rem;
    @media screen and (max-width: 800px) {
      flex-direction: column;
      margin-bottom: 1.5rem;
    }
    .bl-top-content {
      flex: 1;
      @media screen and (max-width: 800px) {
        order: 2;
      }
      .bl-top-header {
        font-size: 64px;
        font-weight: 600;
        margin-bottom: 1rem;
        @media screen and (max-width: 800px) {
          font-size: 1.5rem;
        }
      }
      .bl-top-heading {
        margin-bottom: 0.5rem;
      }
      .bl-top-desc {
        margin-bottom: 1rem;
        @media screen and (max-width: 800px) {
          font-size: 1rem;
        }
      }
    }
    .bl-top-img {
      flex: 1;
      @media screen and (max-width: 800px) {
        order: 1;
      }
    }
  }
}
</style>
