<template>
  <div class="home-container">
    <HomeSection />
    <Problems/>
    <Features />  
    <Benefits />
    <BackToTop />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import HomeSection from '@/components/HomeSection.vue';
import Problems from '@/components/Problems.vue';
import Features from '@/components/Features.vue';
import Benefits from '@/components/Benefits.vue';
import BackToTop from '@/components/BackToTop.vue';

onMounted(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.cards-section, .stats-section, .home-section, .benefits-section').forEach(section => {
    observer.observe(section);
  });
});
</script>

<style scoped>
.home-container {
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}
</style>