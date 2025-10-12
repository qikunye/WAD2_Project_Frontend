<template>
  <section id="call_to_action" class="call-to-action-section" ref="sectionRef">
    <!-- Animated Background Image Container -->
    <div class="background-container">
      <div 
        class="background-image"
        :class="{ 'is-transitioning': isTransitioning, 'show-after': showAfter }"
        :style="{ backgroundImage: `url(${beforeImage})` }"
      ></div>
      <div 
        class="background-image background-after"
        :class="{ 'is-transitioning': isTransitioning, 'show-after': showAfter }"
        :style="{ backgroundImage: `url(${afterImage})` }"
      ></div>
      
      <!-- Animated particles overlay -->
      <div class="particles-overlay" :class="{ 'active': showAfter }">
        <div v-for="i in 20" :key="i" class="particle" :style="getParticleStyle(i)"></div>
      </div>
    </div>

    <!-- Content Overlay -->
    <div class="content-overlay">
      <div class="content-wrapper">
        <!-- Main Title -->
        <div class="hero-content">
          <h1 class="main-title">
            <span class="title-line" :class="{ 'animate': showAfter }">Transform</span>
            <span class="title-line" :class="{ 'animate': showAfter }">Your Impact</span>
          </h1>
          
          <p class="subtitle">
            See the journey from waste to sustainability
          </p>
        </div>

        <!-- Before/After Toggle Buttons -->
        <div class="toggle-container">
          <button 
            @click="toggleState(false)" 
            class="toggle-button"
            :class="{ active: !showAfter }"
          >
            <span class="button-icon">🗑️</span>
            <span class="button-text">BEFORE</span>
          </button>
          
          <div class="toggle-divider"></div>
          
          <button 
            @click="toggleState(true)" 
            class="toggle-button"
            :class="{ active: showAfter }"
          >
            <span class="button-icon">🌱</span>
            <span class="button-text">AFTER</span>
          </button>
        </div>

        <!-- Dynamic Call to Action Content -->
        <transition name="content-fade" mode="out-in">
          <div :key="showAfter ? 'after' : 'before'" class="cta-content">
            <h2>{{ currentContent.title }}</h2>
            <p>{{ currentContent.description }}</p>
            
            <button @click="handleStartJourney" class="cta-button">
              <span class="button-shine"></span>
              Start Your Journey
            </button>
          </div>
        </transition>
      </div>
    </div>

    <!-- Back to Top Arrow -->
    <transition name="fade">
      <button
        v-if="showBackToTop"
        @click="scrollToTop"
        class="back-to-top"
        aria-label="Back to top"
      >
        ↑
      </button>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// State management
const sectionRef = ref(null);
const showBackToTop = ref(false);
const showAfter = ref(false);
const isTransitioning = ref(false);

// Image sources (replace with your actual image paths)
const beforeImage = '/images/call_to_action_before.png';
const afterImage = '/images/call_to_action_after.png';

// Dynamic content based on state
const currentContent = computed(() => {
  return showAfter.value 
    ? {
        title: "The Future We're Building Together",
        description: "Join thousands who are already making a difference—one meal, one choice, one day at a time."
      }
    : {
        title: "The Challenge We Face Today",
        description: "Food waste is a growing problem, but together we can change that."
      };
});

// Toggle between before/after states with animation
const toggleState = (state) => {
  if (showAfter.value === state) return;
  
  isTransitioning.value = true;
  showAfter.value = state;
  
  setTimeout(() => {
    isTransitioning.value = false;
  }, 800);
};

// Particle animation styles
const getParticleStyle = (index) => {
  const randomDelay = Math.random() * 2;
  const randomDuration = 3 + Math.random() * 2;
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  
  return {
    left: `${randomX}%`,
    top: `${randomY}%`,
    animationDelay: `${randomDelay}s`,
    animationDuration: `${randomDuration}s`
  };
};

// Scroll handlers
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({ 
    top: 0, 
    behavior: 'smooth' 
  });
};

const handleStartJourney = () => {
  // Navigation logic - you can implement router navigation here
  console.log('Starting journey...');
  // Example: router.push('/login');
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Root section */
.call-to-action-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #fbfaf9;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Background container */
.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* Background images with advanced transition */
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: brightness(0.6);
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.8s cubic-bezier(0.4, 0, 0.2, 1),
              filter 0.8s ease;
}

.background-after {
  opacity: 0;
  transform: scale(1.1);
}

.background-image.is-transitioning {
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.8s cubic-bezier(0.4, 0, 0.2, 1),
              filter 0.8s ease;
}

.background-image.show-after {
  opacity: 0;
  transform: scale(0.95);
}

.background-after.show-after {
  opacity: 1;
  transform: scale(1);
  filter: brightness(0.65);
}

/* Particles overlay */
.particles-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.particles-overlay.active {
  opacity: 1;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: float 4s infinite ease-in-out;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) translateX(20px);
    opacity: 0;
  }
}

/* Content overlay */
.content-overlay {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.4) 100%
  );
  padding: 4rem 2rem;
}

.content-wrapper {
  width: 100%;
  max-width: 1200px;
  text-align: center;
}

/* Hero content */
.hero-content {
  margin-bottom: 3rem;
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

.main-title {
  font-family: var(--font-heading, 'Anton', sans-serif);
  font-size: clamp(3rem, 10vw, 7rem);
  font-weight: 900;
  text-transform: uppercase;
  line-height: 0.9;
  color: white;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.title-line {
  display: block;
  letter-spacing: -0.02em;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.title-line.animate {
  animation: titlePulse 0.6s ease;
}

@keyframes titlePulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.subtitle {
  font-family: var(--font-body, 'Poppins', sans-serif);
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  letter-spacing: 0.05em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

/* Toggle container */
.toggle-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 3rem auto;
  max-width: 500px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  padding: 0.5rem;
  animation: fadeInUp 0.8s ease 0.2s forwards;
  opacity: 0;
}

.toggle-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  font-family: var(--font-heading, 'Anton', sans-serif);
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.toggle-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.toggle-button:hover::before {
  width: 300px;
  height: 300px;
}

.toggle-button:hover {
  color: white;
  transform: scale(1.02);
}

.toggle-button.active {
  background: linear-gradient(135deg, #1c1456, #f4b6c2);
  color: white;
  box-shadow: 0 5px 20px rgba(244, 182, 194, 0.4);
}

.button-icon {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.toggle-button.active .button-icon {
  animation: bounce 0.6s ease;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.button-text {
  white-space: nowrap;
  position: relative;
  z-index: 1;
}

.toggle-divider {
  width: 2px;
  height: 30px;
  background: rgba(255, 255, 255, 0.3);
}

/* CTA content with transition */
.cta-content {
  margin-top: 4rem;
  animation: fadeInUp 0.8s ease 0.4s forwards;
  opacity: 0;
}

.content-fade-enter-active,
.content-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.content-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.cta-content h2 {
  font-family: var(--font-heading, 'Anton', sans-serif);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.cta-content p {
  font-family: var(--font-body, 'Poppins', sans-serif);
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
}

/* CTA button with shine effect */
.cta-button {
  position: relative;
  padding: 1.25rem 3.5rem;
  font-family: var(--font-body, 'Poppins', sans-serif);
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: white;
  background: linear-gradient(135deg, #1c1456, #f4b6c2);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(244, 182, 194, 0.4);
  overflow: hidden;
}

.button-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.5s;
}

.cta-button:hover .button-shine {
  left: 100%;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(244, 182, 194, 0.5);
}

/* Back to top button */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: #1c1456;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.back-to-top:hover {
  transform: translateY(-3px);
  background: white;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* Responsive design */
@media (max-width: 768px) {
  .content-overlay {
    padding: 2rem 1.5rem;
  }

  .hero-content {
    margin-bottom: 2rem;
  }

  .toggle-container {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem;
    max-width: 300px;
  }

  .toggle-divider {
    width: 80%;
    height: 2px;
  }

  .toggle-button {
    width: 100%;
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }

  .button-icon {
    font-size: 1.25rem;
  }

  .cta-content {
    margin-top: 2.5rem;
  }

  .cta-button {
    padding: 1rem 2.5rem;
    font-size: 1rem;
  }

  .back-to-top {
    width: 45px;
    height: 45px;
    bottom: 1.5rem;
    right: 1.5rem;
  }
}

@media (max-width: 480px) {
  .main-title {
    margin-bottom: 1rem;
  }

  .toggle-container {
    max-width: 280px;
  }

  .toggle-button {
    padding: 0.75rem 1.25rem;
    font-size: 0.95rem;
    gap: 0.5rem;
  }

  .cta-button {
    padding: 1rem 2rem;
    font-size: 0.95rem;
  }
}
</style>