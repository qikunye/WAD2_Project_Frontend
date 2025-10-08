<template>
  <section class="problems-section" id="problems">
    <!-- Background decorative shapes -->
    <div class="background-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
    </div>

    <!-- Back Button (Top Left) -->
    <button 
      class="nav-button back-button" 
      @click="previousSlide"
      @mouseenter="isHoveringNav = true"
      @mouseleave="isHoveringNav = false"
    >
      <div class="nav-thumbnail">
        <img :src="slides[previousIndex].thumbnail" :alt="slides[previousIndex].title" />
      </div>
      <span class="nav-text">
        <span class="nav-arrow">←</span>
        BACK
      </span>
    </button>

    <!-- Main Carousel Container -->
    <div 
      class="carousel-container"
      @mouseenter="pauseTimer"
      @mouseleave="resumeTimer"
    >
      <!-- Progress Ring -->
      <svg class="progress-ring" width="800" height="800" viewBox="0 0 800 800">
        <circle
          class="progress-ring-background"
          cx="400"
          cy="400"
          r="380"
          fill="none"
          stroke="#e5e4e2"
          stroke-width="8"
        />
        <circle
          class="progress-ring-progress"
          cx="400"
          cy="400"
          r="380"
          fill="none"
          stroke="#1c1456"
          stroke-width="8"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="progressOffset"
          transform="rotate(-90 400 400)"
        />
      </svg>

      <!-- Circular Image Container -->
      <div class="image-circle" :class="{ 'hovering': isHoveringNav }">
        <transition name="fade-scale" mode="out-in">
          <img 
            :key="currentIndex" 
            :src="slides[currentIndex].image" 
            :alt="slides[currentIndex].title"
            class="circle-image"
          />
        </transition>
      </div>

      <!-- Curved Title -->
      <div class="curved-title">
        <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
          <path
            id="curve"
            d="M 50,150 Q 400,50 750,150"
            fill="none"
          />
          <text class="title-text">
            <textPath href="#curve" startOffset="50%" text-anchor="middle">
              {{ slides[currentIndex].title }}
            </textPath>
          </text>
        </svg>
      </div>
    </div>

    <!-- Description Text (Bottom Left) -->
    <div class="description-box">
      <transition name="fade" mode="out-in">
        <div :key="currentIndex" class="description-content">
          <h3>{{ slides[currentIndex].subtitle }}</h3>
          <p>{{ slides[currentIndex].description }}</p>
        </div>
      </transition>
    </div>

    <!-- Further Button (Bottom Right) -->
    <button 
      class="nav-button further-button" 
      @click="nextSlide"
      @mouseenter="isHoveringNav = true"
      @mouseleave="isHoveringNav = false"
    >
      <span class="nav-text">
        FURTHER
        <span class="nav-arrow">→</span>
      </span>
      <div class="nav-thumbnail">
        <img :src="slides[nextIndex].thumbnail" :alt="slides[nextIndex].title" />
      </div>
    </button>

    <!-- Slide Indicators -->
    <div class="slide-indicators">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        class="indicator"
        :class="{ active: index === currentIndex }"
        @click="goToSlide(index)"
      ></button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// Slide data
const slides = [
  {
    title: 'FOOD WASTE CRISIS',
    subtitle: 'Our Goal',
    description: 'At ZeroBites, we tackle food waste head-on. Households discard thousands of tonnes annually due to overbuying and forgotten ingredients. Our mission is to transform how you manage food at home.',
    image: '/images/problem1.jpg',
    thumbnail: '/images/problem1-thumb.jpg'
  },
  {
    title: 'SMART SOLUTIONS',
    subtitle: 'Our Approach',
    description: 'We combine innovation with tradition to create exceptional meal planning tools. With the highest standards of sustainability and user experience, we strive to offer solutions that delight and inspire.',
    image: '/images/problem2.jpg',
    thumbnail: '/images/problem2-thumb.jpg'
  },
  {
    title: 'COMMUNITY IMPACT',
    subtitle: 'Our Vision',
    description: 'Join a community committed to reducing waste and maximizing sustainability. Together, we create genuine moments of enjoyment while protecting our planet for future generations.',
    image: '/images/problem3.jpg',
    thumbnail: '/images/problem3-thumb.jpg'
  }
];

// State
const currentIndex = ref(0);
const progress = ref(0);
const isPaused = ref(false);
const isHoveringNav = ref(false);

// Timer variables
let progressInterval = null;
let autoPlayInterval = null;
const SLIDE_DURATION = 10000; // 10 seconds
const PROGRESS_INTERVAL = 50; // Update every 50ms

// Computed properties
const previousIndex = computed(() => 
  currentIndex.value === 0 ? slides.length - 1 : currentIndex.value - 1
);

const nextIndex = computed(() => 
  (currentIndex.value + 1) % slides.length
);

const circumference = computed(() => 2 * Math.PI * 380);

const progressOffset = computed(() => {
  const offset = circumference.value - (progress.value / 100) * circumference.value;
  return offset;
});

// Methods
const nextSlide = () => {
  currentIndex.value = nextIndex.value;
  resetTimer();
};

const previousSlide = () => {
  currentIndex.value = previousIndex.value;
  resetTimer();
};

const goToSlide = (index) => {
  currentIndex.value = index;
  resetTimer();
};

const resetTimer = () => {
  progress.value = 0;
  clearInterval(progressInterval);
  clearInterval(autoPlayInterval);
  startTimer();
};

const startTimer = () => {
  progressInterval = setInterval(() => {
    if (!isPaused.value) {
      progress.value += (100 / (SLIDE_DURATION / PROGRESS_INTERVAL));
      
      if (progress.value >= 100) {
        nextSlide();
      }
    }
  }, PROGRESS_INTERVAL);
};

const pauseTimer = () => {
  isPaused.value = true;
};

const resumeTimer = () => {
  isPaused.value = false;
};

// Lifecycle
onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  clearInterval(progressInterval);
  clearInterval(autoPlayInterval);
});
</script>

<style scoped>
.problems-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fbfaf9;
  overflow: hidden;
  padding: 4rem 2rem;
}

/* Background shapes */
.background-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.03;
}

.shape-1 {
  width: 500px;
  height: 500px;
  background: var(--color-secondary);
  top: -100px;
  left: -100px;
}

.shape-2 {
  width: 400px;
  height: 400px;
  background: var(--color-primary);
  bottom: -100px;
  right: -100px;
}

/* Navigation Buttons */
.nav-button {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
}

.back-button {
  top: 6rem;
  left: 4rem;
  flex-direction: row;
}

.further-button {
  bottom: 4rem;
  right: 4rem;
  flex-direction: row-reverse;
}

.nav-thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--color-primary);
  transition: all 0.3s ease;
}

.nav-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.nav-button:hover .nav-thumbnail {
  border-color: var(--color-secondary);
  transform: scale(1.1);
}

.nav-button:hover .nav-thumbnail img {
  transform: scale(1.2);
}

.nav-text {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.nav-arrow {
  font-size: 2rem;
  transition: all 0.3s ease;
}

.nav-button:hover .nav-arrow {
  color: var(--color-secondary);
  transform: translateX(0);
}

.back-button:hover .nav-arrow {
  transform: translateX(-5px);
}

.further-button:hover .nav-arrow {
  transform: translateX(5px);
}

/* Carousel Container */
.carousel-container {
  position: relative;
  width: 800px;
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Progress Ring */
.progress-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scaleX(-1);
  pointer-events: none;
}

.progress-ring-progress {
  transition: stroke-dashoffset 0.05s linear;
}

/* Image Circle */
.image-circle {
  position: relative;
  width: 700px;
  height: 700px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.image-circle.hovering {
  transform: scale(1.05);
}

.circle-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Curved Title */
.curved-title {
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 200px;
  pointer-events: none;
}

.title-text {
  font-family: var(--font-heading);
  font-size: 4rem;
  font-weight: 900;
  fill: #1c1456;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Description Box */
.description-box {
  position: absolute;
  bottom: 6rem;
  left: 4rem;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  z-index: 50;
}

.description-content h3 {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.description-content p {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-primary);
  margin: 0;
}

/* Slide Indicators */
.slide-indicators {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 100;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(28, 20, 86, 0.3);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: var(--color-primary);
  transform: scale(1.3);
}

.indicator:hover {
  background: var(--color-secondary);
}

/* Transitions */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive Design */
@media (max-width: 1400px) {
  .carousel-container {
    width: 700px;
    height: 700px;
  }

  .image-circle {
    width: 600px;
    height: 600px;
  }

  .back-button {
    left: 2rem;
  }

  .further-button {
    right: 2rem;
  }

  .description-box {
    left: 2rem;
  }
}

@media (max-width: 1024px) {
  .carousel-container {
    width: 600px;
    height: 600px;
  }

  .image-circle {
    width: 500px;
    height: 500px;
  }

  .title-text {
    font-size: 3rem;
  }

  .nav-thumbnail {
    width: 60px;
    height: 60px;
  }

  .nav-text {
    font-size: 1.2rem;
  }

  .description-box {
    max-width: 300px;
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .problems-section {
    padding: 2rem 1rem;
  }

  .carousel-container {
    width: 100%;
    max-width: 500px;
    height: 500px;
  }

  .image-circle {
    width: 400px;
    height: 400px;
  }

  .back-button {
    top: 2rem;
    left: 1rem;
  }

  .further-button {
    bottom: 2rem;
    right: 1rem;
  }

  .nav-thumbnail {
    width: 50px;
    height: 50px;
  }

  .nav-text {
    font-size: 1rem;
  }

  .description-box {
    position: relative;
    bottom: auto;
    left: auto;
    margin-top: 2rem;
    max-width: 100%;
  }

  .title-text {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .carousel-container {
    height: 400px;
  }

  .image-circle {
    width: 320px;
    height: 320px;
  }

  .nav-text span:not(.nav-arrow) {
    display: none;
  }

  .nav-thumbnail {
    width: 40px;
    height: 40px;
  }

  .title-text {
    font-size: 1.5rem;
  }
}

/* Accessibility */
.nav-button:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 4px;
  border-radius: 50%;
}

.indicator:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
}
</style>