<template>
  <section id="home" class="home-section">
    <div class="gradient-background"></div>
    <div class="floating-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>
    <div class="home-container">
      <h1 class="home-title">
        <span class="title-word" v-for="(word, index) in titleWords" :key="index" 
              :style="{ animationDelay: `${index * 0.1}s` }">
          {{ word }}
        </span>
      </h1>
      <p class="home-description">
        According to the statistics, a significant amount of food wastage comes from households, 
        where people often overbuy, forget what they have at home, or struggle to use up ingredients 
        before they spoil. When dietary restrictions are involved, meal planning becomes even more 
        challenging which leads to edible food being thrown away instead of enjoyed.
      </p>
      <div class="cta-buttons">
        <router-link to="/register" class="cta-button primary">Get Started</router-link>
        <button class="cta-button secondary" @click="scrollToFeatures">Learn More</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const titleWords = computed(() => 'Reducing Food Waste at Home'.split(' '));

const scrollToFeatures = () => {
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
};
</script>

<style scoped>
.home-section {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  overflow: hidden;
  width: 100%; /* Ensure full width */
  max-width: 100vw; /* Prevent overflow */
}

.gradient-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(244, 182, 194, 0.1) 0%,
    rgba(28, 20, 86, 0.05) 50%,
    rgba(244, 182, 194, 0.1) 100%
  );
  animation: gradientShift 15s ease infinite;
  z-index: 0;
}

@keyframes gradientShift {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
}

.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: hidden; /* Prevent shapes from causing overflow */
}

.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
  animation: float 20s ease-in-out infinite;
  will-change: transform; /* Performance optimization */
}

.shape-1 {
  width: 300px;
  height: 300px;
  background: var(--color-secondary);
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 200px;
  height: 200px;
  background: var(--color-primary);
  top: 60%;
  right: 15%;
  animation-delay: 5s;
}

.shape-3 {
  width: 150px;
  height: 150px;
  background: var(--color-accent);
  bottom: 20%;
  left: 60%;
  animation-delay: 10s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, -30px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
}

.home-container {
  position: relative;
  z-index: 2;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 0 1rem; /* Add some breathing room */
}

.home-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 2rem;
  line-height: 1.2;
  word-wrap: break-word; /* Prevent text overflow */
}

.title-word {
  display: inline-block;
  margin: 0 0.25em;
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.home-description {
  font-size: 1.125rem;
  line-height: 1.8;
  margin-bottom: 3rem;
  opacity: 0;
  animation: fadeIn 1s ease 0.6s forwards;
  max-width: 100%; /* Prevent text overflow */
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  opacity: 0;
  animation: fadeInUp 0.8s ease 0.8s forwards;
}

.cta-button {
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-family: var(--font-heading);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  text-decoration: none;
  display: inline-block;
  position: relative;
  overflow: hidden;
  white-space: nowrap; /* Prevent button text wrapping */
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.cta-button:hover::before {
  width: 300px;
  height: 300px;
}

.cta-button.primary {
  background-color: var(--color-primary);
  color: var(--color-secondary);
}

.cta-button.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(28, 20, 86, 0.3);
}

.cta-button.secondary {
  background-color: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.cta-button.secondary:hover {
  background-color: var(--color-primary);
  color: var(--color-secondary);
  transform: translateY(-3px);
}
</style>