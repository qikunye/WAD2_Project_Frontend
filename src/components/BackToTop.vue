<template>
  <!--
    A simple back-to-top button.  It becomes visible when the user scrolls down
    more than 300px.  The button uses a Unicode up-arrow character instead of
    relying on an external icon library.  Styles for `.back-to-top` and
    `.icon` are defined in styles.css.
  -->
  <button
    v-if="isVisible"
    @click="scrollToTop"
    class="back-to-top"
  >
    <!-- Use a Unicode arrow to avoid external dependencies -->
    <span class="icon">&#8679;</span>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Reactive state to determine when the button should be visible.
const isVisible = ref(false);

// Show the button after scrolling down a certain distance.
const handleScroll = () => {
  isVisible.value = window.scrollY > 300;
};

// Scroll smoothly back to the top of the page when clicked.
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Add and remove the scroll listener on mount/unmount.
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>