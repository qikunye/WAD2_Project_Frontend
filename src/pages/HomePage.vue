<template>
  <!--
    Top-level layout for the food waste app.  In addition to the navigation
    bar and home section, we now include sections for statistics, features,
    benefits and a back-to-top button.  Each component is rendered
    sequentially on the page.
  -->
  <div class="home-container">
    <HomeSection />
    <Counter />
    <Features />
    <Benefits />
    <BackToTop />
  </div>
</template>

<script setup>
// Import static components directly without lazy loading.  This keeps
// the setup simple and makes the page load quickly because there are
// no asynchronous component boundaries.
import Navbar from '@/components/Navbar.vue';
import HomeSection from '@/components/HomeSection.vue';
import Counter from '@/components/Counter.vue';
import Features from '@/components/Features.vue';
import Benefits from '@/components/Benefits.vue';
import BackToTop from '@/components/BackToTop.vue';
</script>