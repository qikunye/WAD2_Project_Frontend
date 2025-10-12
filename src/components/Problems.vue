<template>
  <section class="problems-section" id="problems">
    <!-- Background decorative shapes -->
    <div class="background-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
    </div>

    <!-- Main Container with Flexbox for responsive stacking -->
    <div class="problems-wrapper">
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

      <!-- Carousel Container -->
      <div class="carousel-container">
        <!-- Progress Ring Container -->
        <div class="progress-ring-container">
          <!-- Progress Ring SVG -->
          <svg class="progress-ring" viewBox="0 0 600 600">
            <circle
              class="progress-ring-background"
              cx="300"
              cy="300"
              r="290"
              fill="none"
              stroke="#e5e4e2"
              stroke-width="8"
            />
            <circle
              class="progress-ring-progress"
              cx="300"
              cy="300"
              r="290"
              fill="none"
              stroke="#1c1456"
              stroke-width="8"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="progressOffset"
              transform="rotate(-90 300 300)"
            />
          </svg>
          
          <!-- Circular Image Container (inside the ring) -->
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

      <!-- Bottom Content Container (stacks on smaller screens) -->
      <div class="bottom-content">
        <!-- Description Box -->
        <div class="description-box">
          <transition name="fade" mode="out-in">
            <div :key="currentIndex" class="description-content">
              <h3>{{ slides[currentIndex].subtitle }}</h3>
              <p>{{ slides[currentIndex].description }}</p>
            </div>
          </transition>
        </div>

        <!-- Further Button -->
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
      </div>

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
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// Slide data
const slides = [
  {
    title: 'FOOD WASTE CRISIS',
    subtitle: 'The Challenge',
    description: 'In 2024, food waste accounted for 12% of all waste generated nationwide, rising from 755,000 tonnes in 2023 to 784,000 tonnes in 2024. Households alone discard over 26,000 tonnes of uneaten food every year, often because groceries are forgotten or expire before use. Each wasted meal represents lost resources, unnecessary carbon emissions, and wasted money - a cycle that urgently needs to be broken.',
    image: 'images/1d5798c5d9483e873441cdf060005269.jpg',
    thumbnail: 'images/food_waste_thumbnail.png'
  },
  {
    title: 'Convenience Trap',
    subtitle: 'Convenience Culture and Edible Waste',
    description: 'In today\'s fast-paced urban lifestyle, convenience often takes precedence over mindfulness. Busy routines, takeaway culture, and impulsive grocery runs result in duplicate purchases, forgotten leftovers, and premature spoilage. Studies show that one in three households discard food weekly simply because they lack the time or energy to cook.',
    image: 'images/problems_pic2.png',
    thumbnail: 'images/problems_pic2.png'
  },
  {
    title: 'Awareness Gap',
    subtitle: 'The Awareness & Behaviour Gap',
    description: 'Although sustainability is a familiar term, there remains a major gap between knowing and doing. Many consumers underestimate the impact of everyday waste—throwing away one bowl of rice wastes roughly 500 litres of water used to grow it. Despite awareness campaigns by NEA and WWF, behaviour rarely changes without clear feedback and motivation.',
    image: '/images/problems_pic3.jpg',
    thumbnail: '/images/problems_pic3_thumbnail.png'
  }
];

// State
const currentIndex = ref(0);
const progress = ref(0);
const isHoveringNav = ref(false);

// Timer variables
let progressInterval = null;
const SLIDE_DURATION = 10000;
const PROGRESS_INTERVAL = 16;

// Computed properties
const previousIndex = computed(() => 
  currentIndex.value === 0 ? slides.length - 1 : currentIndex.value - 1
);

const nextIndex = computed(() => 
  (currentIndex.value + 1) % slides.length
);

const circumference = computed(() => 2 * Math.PI * 290);

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
  startTimer();
};

const startTimer = () => {
  const increment = 100 / (SLIDE_DURATION / PROGRESS_INTERVAL);
  
  progressInterval = setInterval(() => {
    progress.value += increment;
    
    if (progress.value >= 100) {
      nextSlide();
    }
  }, PROGRESS_INTERVAL);
};

// Lifecycle
onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  clearInterval(progressInterval);
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
  background: var(--color-secondary, #f4b6c2);
  top: -100px;
  left: -100px;
}

.shape-2 {
  width: 400px;
  height: 400px;
  background: var(--color-primary, #1c1456);
  bottom: -100px;
  right: -100px;
}

/* Main wrapper for responsive layout */
.problems-wrapper {
  position: relative;
  width: 100%;
  max-width: 1600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

/* Navigation Buttons */
.nav-button {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
}

/* Desktop positioning (xl and above) */
@media (min-width: 1280px) {
  .back-button {
    position: absolute;
    top: 2rem;
    left: 2rem;
    flex-direction: row;
  }
}

/* Mobile/Tablet positioning */
@media (max-width: 1279px) {
  .back-button {
    align-self: flex-start;
    flex-direction: row;
    margin-bottom: 1rem;
  }
}

.nav-thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--color-primary, #1c1456);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.nav-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.nav-button:hover .nav-thumbnail {
  border-color: var(--color-secondary, #f4b6c2);
  transform: scale(1.1);
}

.nav-button:hover .nav-thumbnail img {
  transform: scale(1.2);
}

.nav-text {
  font-family: var(--font-heading, 'Anton', sans-serif);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary, #1c1456);
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
  color: var(--color-secondary, #f4b6c2);
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
  max-width: 100%;
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Progress Ring Container */
.progress-ring-container {
  position: relative;
  width: 600px;
  max-width: 100%;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Progress Ring SVG */
.progress-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transform: scaleX(-1);
  z-index: 2;
}

.progress-ring-background {
  opacity: 0.5;
}

.progress-ring-progress {
  transition: stroke-dashoffset 0.016s linear;
  stroke-linecap: round;
  opacity: 0.9;
}

/* Image Circle */
.image-circle {
  position: relative;
  width: 550px;
  max-width: 90%;
  height: 550px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 1;
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
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 200px;
  pointer-events: none;
  z-index: 5;
}

.title-text {
  font-family: var(--font-heading, 'Anton', sans-serif);
  font-size: 5rem;
  font-weight: 900;
  fill: #1c1456;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Bottom Content Container - responsive stacking */
.bottom-content {
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  z-index: 50;
}

/* Desktop layout (xl and above) */
@media (min-width: 1280px) {
  .bottom-content {
    position: absolute;
    bottom: 4rem;
    left: 2rem;
    right: 2rem;
    justify-content: space-between;
  }
  
  .description-box {
    max-width: 380px;
  }
  
  .further-button {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    flex-direction: row-reverse;
  }
}

/* Larger screens - more space for description */
@media (min-width: 1536px) {
  .description-box {
    max-width: 450px;
  }
}

/* Tablet/Mobile layout (below xl) */
@media (max-width: 1279px) {
  .bottom-content {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .description-box {
    max-width: 100%;
    width: 100%;
  }
  
  .further-button {
    align-self: center;
    flex-direction: row-reverse;
  }
}

/* Description Box */
.description-box {
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.description-content h3 {
  font-family: var(--font-heading, 'Anton', sans-serif);
  font-size: 1.3rem;
  color: var(--color-primary, #1c1456);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.description-content p {
  font-family: var(--font-body, 'Poppins', sans-serif);
  font-size: 0.95rem;
  line-height: 1.6;
  color: #1c1456;
  margin: 0;
  font-weight: 400;
}

/* Slide Indicators */
.slide-indicators {
  display: flex;
  gap: 1rem;
  z-index: 100;
  margin-top: 1rem;
}

@media (min-width: 1280px) {
  .slide-indicators {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0;
  }
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
  background: var(--color-primary, #1c1456);
  transform: scale(1.3);
}

.indicator:hover {
  background: var(--color-secondary, #f4b6c2);
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

/* Responsive adjustments for smaller carousel */
@media (max-width: 1024px) {
  .carousel-container {
    width: 600px;
    height: 600px;
  }

  .progress-ring-container {
    width: 450px;
    height: 450px;
  }

  .image-circle {
    width: 400px;
    height: 400px;
  }

  .title-text {
    font-size: 3.5rem;
  }

  .nav-thumbnail {
    width: 60px;
    height: 60px;
  }

  .nav-text {
    font-size: 1.2rem;
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

  .progress-ring-container {
    width: 370px;
    height: 370px;
  }

  .image-circle {
    width: 320px;
    height: 320px;
  }

  .nav-thumbnail {
    width: 50px;
    height: 50px;
  }

  .nav-text {
    font-size: 1rem;
  }

  .title-text {
    font-size: 2.5rem;
  }

  .description-content h3 {
    font-size: 1.1rem;
  }

  .description-content p {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .carousel-container {
    height: 400px;
  }

  .progress-ring-container {
    width: 310px;
    height: 310px;
  }

  .image-circle {
    width: 260px;
    height: 260px;
  }

  .nav-text span:not(.nav-arrow) {
    display: none;
  }

  .nav-thumbnail {
    width: 40px;
    height: 40px;
  }

  .title-text {
    font-size: 1.8rem;
  }

  .description-content h3 {
    font-size: 1rem;
  }

  .description-content p {
    font-size: 0.75rem;
  }

  .description-box {
    padding: 1.5rem;
  }
}

/* Accessibility */
.nav-button:focus-visible {
  outline: 3px solid var(--color-primary, #1c1456);
  outline-offset: 4px;
  border-radius: 50%;
}

.indicator:focus-visible {
  outline: 2px solid var(--color-primary, #1c1456);
  outline-offset: 4px;
}
</style>