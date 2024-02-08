<template>
  <div class="bl-contact-container bl-flex">
    <div class="bl-contact-left-section">
      <div class="bl-contact-header bl-f-24 bl-fw-600">Contact</div>
      <div class="bl-contact-desc bl-f-16 bl-fw-400">
        "Have a question, suggestion, or an exciting idea to share? We're all ears! Reach out to us and let's start a
        conversation."
      </div>
      <div class="bl-contact-form">
        <div class="bl-input-flex">
          <div class="bl-contact-input-wrap">
            <div class="bl-contact-form-label">Name</div>
            <input type="text" class="bl-input" />
          </div>
          <div class="bl-contact-input-wrap">
            <div class="bl-contact-form-label">Email</div>
            <input type="text" class="bl-input" />
          </div>
        </div>
        <div class="bl-input-flex">
          <div class="bl-contact-input-wrap">
            <div class="bl-contact-form-label">Mobile</div>
            <input type="text" class="bl-input" />
          </div>
          <div class="bl-contact-input-wrap"></div>
        </div>
        <div class="bl-contact-input-wrap">
          <div class="bl-contact-form-label">Message (optional)</div>
          <textarea rows="5" class="bl-input"></textarea>
        </div>
        <div class="bl-flex bl-contact-btn-wrap">
          <button class="bl-primary-btn bl-contact-btn">Submit</button>
        </div>
      </div>
    </div>
    <div class="bl-contact-right">
      <div class="bl-contact-right-section">
        <div class="bl-top-articles-title bl-f-20 bl-fw-500">Top article</div>
        <div class="bl-top-articles">
          <div class="bl-top-article bl-f-16 bl-fw-400">The Grand Stage: Cricket World Cup 2023 Unveiled</div>
          <div class="bl-top-article bl-f-16 bl-fw-400">The Grand Stage: Cricket World Cup 2023 Unveiled</div>
          <div class="bl-top-article bl-f-16 bl-fw-400">The Grand Stage: Cricket World Cup 2023 Unveiled</div>
        </div>
      </div>
      <div class="bl-contact-right-section">
        <div class="bl-top-articles-title bl-f-20 bl-fw-500">Top Category</div>
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCommonStates } from "~/store/commonStates";

const commonStates = useCommonStates();
const { setNavActive } = commonStates;

onMounted(() => {
  setNavActive("contact");
});
</script>

<style lang="scss" scoped>
.bl-contact-container {
  background-color: #008080;
  padding: 2rem 2.5rem;
  gap: 1.5rem;
  @media screen and (max-width: 800px) {
    padding: 1.5rem;
    flex-direction: column;
  }
  .bl-contact-left-section {
    flex: 1.5;
    background-color: #fff;
    // color: #008080;
    padding: 1.5rem;
    border-radius: 0.5rem;
    .bl-contact-header {
      margin-bottom: 0.5rem;
    }
    .bl-contact-desc {
      margin-bottom: 1.5rem;
    }
    .bl-contact-form {
      .bl-input-flex {
        display: flex;
        gap: 1rem;
        @media screen and (max-width: 800px) {
          flex-direction: column;
        }
      }
      .bl-contact-input-wrap {
        margin-bottom: 1rem;
        width: 100%;
        .bl-contact-form-label {
          margin-bottom: 0.25rem;
        }
      }
      .bl-contact-btn-wrap {
        justify-content: flex-end;
        .bl-contact-btn {
          min-width: 180px;
        }
      }
    }
  }
  .bl-contact-right {
    flex: 0.5;
  }
  .bl-contact-right-section {
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
