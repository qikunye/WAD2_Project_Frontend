<template>
  <section id="stats" class="stats-section">
    <div class="stats-container">
      <div v-for="item in numbers" :key="item.id" class="stat" :data-index="item.id">
        <div class="stat-circle">
          <h2 class="stat-number" :data-target="item.number">0</h2>
          <span class="stat-plus">+</span>
        </div>
        <p class="stat-title">{{ item.title }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';

const numbers = [
  { id: 1, number: 30, title: 'Recipes' },
  { id: 2, number: 15, title: 'Ingredients' },
  { id: 3, number: 5, title: 'Meal Plans' },
];

onMounted(() => {
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

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numberElement = entry.target.querySelector('.stat-number');
        const target = parseInt(numberElement.getAttribute('data-target'));
        animateCounter(numberElement, target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat').forEach(stat => observer.observe(stat));
});
</script>

<style scoped>
.stats-section {
  padding: 6rem 2rem;
  text-align: center;
  background: linear-gradient(180deg, transparent 0%, rgba(244, 182, 194, 0.05) 100%);
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

@media (max-width: 768px) {
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
}
</style>