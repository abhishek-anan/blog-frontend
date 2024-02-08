<template>
  <div>
    <Popup v-if="popup" />
    <NavBar />
    <slot />
    <Footer />
  </div>
</template>

<script setup>
import { useCommonStates } from "~/store/commonStates";

const commonStates = useCommonStates();
const popup = computed(() => commonStates.popup);
</script>
