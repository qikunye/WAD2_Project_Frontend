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

      <!-- Stats Counter Section -->
      <div class="stats-section" ref="statsSection">
        <div class="stats-container">
          <div v-for="item in numbers" :key="item.id" class="stat" :data-index="item.id">
            <div class="stat-circle">
              <h2 class="stat-number" :data-target="item.number">0</h2>
              <span class="stat-plus">+</span>
            </div>
            <p class="stat-title">{{ item.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

const titleWords = computed(() => 'Reducing Food Waste at Home'.split(' '));
const statsSection = ref(null);

const numbers = [
  { id: 1, number: 30, title: 'Recipes' },
  { id: 2, number: 15, title: 'Ingredients' },
  { id: 3, number: 5, title: 'Meal Plans' },
];

const scrollToFeatures = () => {
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
};

const animateCounter = (element, target) => {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 30);
};

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visible class to stats section
        entry.target.classList.add('is-visible');
        
        // Animate all counters
        const statElements = entry.target.querySelectorAll('.stat');
        statElements.forEach(stat => {
          const numberElement = stat.querySelector('.stat-number');
          const target = parseInt(numberElement.getAttribute('data-target'));
          animateCounter(numberElement, target);
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  if (statsSection.value) {
    observer.observe(statsSection.value);
  }
});
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
  width: 100%;
  max-width: 100vw;
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
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
  animation: float 20s ease-in-out infinite;
  will-change: transform;
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
  padding: 0 1rem;
}

.home-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 2rem;
  line-height: 1.2;
  word-wrap: break-word;
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
  max-width: 100%;
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
  margin-bottom: 4rem;
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
  white-space: nowrap;
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

/* Stats Section - Integrated */
.stats-section {
  padding: 4rem 0 2rem;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.stats-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.stats-container {
  display: flex;
  justify-content: center;
  gap: 4rem;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}

.stat {
  text-align: center;
  opacity: 0;
  transform: scale(0.8);
  animation: popIn 0.6s ease forwards;
}

.stat[data-index="1"] { animation-delay: 0.1s; }
.stat[data-index="2"] { animation-delay: 0.3s; }
.stat[data-index="3"] { animation-delay: 0.5s; }

@keyframes popIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.stat-circle {
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  border-radius: 50%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 4px solid var(--color-secondary);
}

.stat:hover .stat-circle {
  transform: translateY(-10px) rotate(5deg);
  box-shadow: 0 20px 60px rgba(244, 182, 194, 0.4);
  border-color: var(--color-primary);
}

.stat-number {
  font-family: var(--font-heading);
  font-size: 3.5rem;
  color: var(--color-primary);
  margin: 0;
}

.stat-plus {
  font-family: var(--font-heading);
  font-size: 2rem;
  color: var(--color-secondary);
  margin-left: 0.2rem;
}

.stat-title {
  font-family: var(--font-body);
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-primary);
  margin: 0;
  transition: color 0.3s ease;
}

.stat:hover .stat-title {
  color: var(--color-secondary);
}

/* Responsive Design */
@media (max-width: 768px) {
  .stats-section {
    padding: 3rem 0 1rem;
  }

  .stats-container {
    gap: 3rem;
  }
  
  .stat-circle {
    width: 150px;
    height: 150px;
  }
  
  .stat-number {
    font-size: 2.5rem;
  }

  .stat-plus {
    font-size: 1.5rem;
  }

  .stat-title {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .stats-container {
    gap: 2.5rem;
  }

  .stat-circle {
    width: 130px;
    height: 130px;
  }

  .stat-number {
    font-size: 2rem;
  }
}
</style>