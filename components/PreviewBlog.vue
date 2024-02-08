<template>
  <div class="bl-preview-content">
    <div class="bl-blog-title bl-f-24 bl-fw-600">
      <span v-if="title">{{ title }}</span>
      <span v-else>Title</span>
    </div>
    <div class="bl-blog-desc bl-f-16 bl-fw-400">
      <span v-if="subDesc">{{ subDesc }}</span>
      <span v-else>Summary (this show in card with title)</span>
    </div>
    <div class="bl-blog-para">
      <div class="bl-blog-sub-title bl-f-20 bl-fw-600">Introduction:</div>
      <div class="bl-blog-desc bl-f-16 bl-fw-500">
        <span v-if="intro">{{ intro }}</span>
        <span v-else>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi voluptate quaerat suscipit possimus ea enim
          culpa unde quia. Labore ab officia officiis unde et nihil autem magnam enim sequi sapiente atque quis pariatur
          eius vitae repellat laborum, ipsam, dolores nobis, illo expedita consectetur numquam perferendis iure? Neque
          accusantium esse id, amet rerum harum voluptatibus laudantium perferendis voluptates similique tempore magnam.
        </span>
      </div>
    </div>
    <template v-for="i in paraLenght" :key="i">
      <div class="bl-blog-para">
        <div class="bl-blog-sub-title bl-f-20 bl-fw-600">{{ headingObj["heading" + i] }}:</div>
        <div class="bl-blog-desc bl-f-16 bl-fw-500">
          <span v-if="headingObj['content' + i]">{{ headingObj["content" + i] }}</span>
          <span v-else>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi voluptate quaerat suscipit possimus ea enim
            culpa unde quia.
          </span>
        </div>
      </div>
    </template>
    <div class="bl-blog-para" v-if="paraLenght === 0">
      <div class="bl-blog-sub-title bl-f-20 bl-fw-600">New Heading:</div>
      <div class="bl-blog-desc bl-f-16 bl-fw-500">
        <span>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi voluptate quaerat suscipit possimus ea enim
          culpa unde quia.
        </span>
      </div>
    </div>
    <div class="bl-blog-para">
      <div class="bl-blog-sub-title bl-f-20 bl-fw-600">Conclusion:</div>
      <div class="bl-blog-desc bl-f-16 bl-fw-500">
        <span v-if="conclusion">{{ conclusion }}</span>
        <span v-else>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi voluptate quaerat suscipit possimus ea enim
          culpa unde quia. Labore ab officia officiis unde et nihil autem magnam enim sequi sapiente atque quis pariatur
          eius vitae repellat laborum, ipsam, dolores nobis, illo expedita consectetur numquam perferendis iure? Neque
          accusantium esse id, amet rerum harum voluptatibus laudantium perferendis voluptates similique tempore magnam.
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subDesc: {
    type: String,
    required: true,
  },
  intro: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.bl-preview-content {
  .bl-blog-title {
    margin-bottom: 1rem;
  }
  .bl-blog-desc {
    margin-bottom: 0.75rem;
  }
  .bl-blog-para {
    margin-bottom: 0.75rem;
    .bl-blog-sub-title {
      margin-bottom: 0.5rem;
    }
  }
}
</style>
