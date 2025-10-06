<template>
  <section id="benefits" class="cards-section benefits-section">
    <div class="parallax-bg"></div>
    <h2 class="section-title">
      Why Choose <span class="highlight">ZeroBites</span>
    </h2>
    <div class="cards-container">
      <div v-for="(benefit, index) in benefits" :key="benefit.title" 
           class="benefit-card" :data-index="index">
        <div class="benefit-icon">{{ benefit.icon }}</div>
        <h3 class="card-title">{{ benefit.title }}</h3>
        <p class="card-desc">{{ benefit.description }}</p>
        <div class="benefit-accent"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';

const benefits = [
  {
    title: 'Reduce Waste',
    icon: '♻️',
    description: 'Minimize food waste at home by keeping track of what you have and need.',
  },
  {
    title: 'Save Money',
    icon: '💰',
    description: 'Plan your grocery shopping and meals to avoid overbuying and overspending.',
  },
  {
    title: 'Healthy Meals',
    icon: '🥗',
    description: 'Ensure balanced nutrition by planning meals with dietary preferences in mind.',
  },
  {
    title: 'Community Support',
    icon: '🤝',
    description: 'Connect with others, share your recipes and tips, and get inspired by the community.',
  },
];

onMounted(() => {
  window.addEventListener('scroll', handleParallax);
});

const handleParallax = () => {
  const parallaxBg = document.querySelector('.parallax-bg');
  if (parallaxBg) {
    const scrolled = window.pageYOffset;
    const rect = parallaxBg.getBoundingClientRect();
    const rate = scrolled * 0.3;
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      parallaxBg.style.transform = `translateY(${rate}px)`;
    }
  }
};
</script>

<style scoped>
.benefits-section {
  position: relative;
  padding: 6rem 2rem;
  background: linear-gradient(180deg, var(--color-background) 0%, rgba(244, 182, 194, 0.1) 100%);
  overflow: hidden;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s ease;
}

.benefits-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.parallax-bg {
  position: absolute;
  top: -50%;
  left: 0;
  right: 0;
  height: 200%;
  background: 
    radial-gradient(circle at 20% 50%, rgba(244, 182, 194, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(28, 20, 86, 0.1) 0%, transparent 50%);
  pointer-events: none;
  will-change: transform;
}

.section-title {
  position: relative;
  z-index: 2;
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 4rem;
  text-align: center;
}

.highlight {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.cards-container {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.benefit-card {
  position: relative;
  background: white;
  padding: 3rem 2rem;
  border-radius: 1.5rem;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  opacity: 0;
  transform: translateX(-50px);
}

.benefit-card[data-index="0"] { animation: slideInLeft 0.6s ease 0.1s forwards; }
.benefit-card[data-index="1"] { animation: slideInRight 0.6s ease 0.2s forwards; }
.benefit-card[data-index="2"] { animation: slideInLeft 0.6s ease 0.3s forwards; }
.benefit-card[data-index="3"] { animation: slideInRight 0.6s ease 0.4s forwards; }

@keyframes slideInLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.benefit-card:hover {
  transform: translateY(-15px) scale(1.02);
  box-shadow: 0 20px 60px rgba(244, 182, 194, 0.3);
}

.benefit-card:hover .benefit-accent {
  transform: scale(1.5);
  opacity: 1;
}

.benefit-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.benefit-card:hover .benefit-icon {
  animation: spin 0.6s ease;
}

@keyframes spin {
  from {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.2);
  }
  to {
    transform: rotate(360deg) scale(1);
  }
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
}

.card-desc {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
}

.benefit-accent {
  position: absolute;
  bottom: -30px;
  right: -30px;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, var(--color-secondary), var(--color-primary));
  border-radius: 50%;
  opacity: 0.1;
  transition: all 0.5s ease;
  pointer-events: none;
}

@media (max-width: 768px) {
  .benefit-card[data-index="1"],
  .benefit-card[data-index="3"] {
    animation: slideInLeft 0.6s ease forwards;
  }
}
</style>