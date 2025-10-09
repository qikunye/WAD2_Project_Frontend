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

    <!-- Description Text (Bottom Left) - NO OVERLAP, NO WHITE BG -->
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
const SLIDE_DURATION = 10000; // 10 seconds
const PROGRESS_INTERVAL = 16; // ~60fps for smooth animation

// Computed properties
const previousIndex = computed(() => 
  currentIndex.value === 0 ? slides.length - 1 : currentIndex.value - 1
);

const nextIndex = computed(() => 
  (currentIndex.value + 1) % slides.length
);

// Progress ring calculations (radius = 290)
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
  bottom: 8rem;
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

/* Progress Ring Container */
.progress-ring-container {
  position: relative;
  width: 600px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Progress Ring SVG - VISIBLE OUTER RING */
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

/* Image Circle - INSIDE THE RING */
.image-circle {
  position: relative;
  width: 550px;
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
  font-family: var(--font-heading);
  font-size: 5rem;
  font-weight: 900;
  fill: #1c1456;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Description Box - NO WHITE BG, SHIFTED LEFT */
.description-box {
  position: absolute;
  bottom: 6rem;
  left: 2rem;  /* Shifted more to the left */
  max-width: 420px;  /* Slightly narrower to avoid overlap */
  background: transparent;  /* Removed white background */
  padding: 2rem;
  z-index: 50;
}

.description-content h3 {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  text-shadow: 0 2px 4px rgba(255, 255, 255, 0.8);  /* Added subtle white shadow for readability */
}

.description-content p {
  font-family: var(--font-body);
  font-size: 0.85rem;
  line-height: 1.6;
  color: #1c1456;  /* Darker color for better contrast */
  margin: 0;
  font-weight: 500;  /* Slightly bolder for readability */
  text-shadow: 0 1px 3px rgba(255, 255, 255, 0.7);  /* Subtle white shadow */
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

  .progress-ring-container {
    width: 530px;
    height: 530px;
  }

  .image-circle {
    width: 480px;
    height: 480px;
  }

  .title-text {
    font-size: 4.5rem;
  }

  .curved-title {
    top: -30px;
  }

  .back-button {
    left: 2rem;
  }

  .further-button {
    right: 2rem;
    bottom: 6rem;
  }

  .description-box {
    left: 1rem;
    max-width: 380px;
  }
}

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

  .curved-title {
    top: -25px;
  }

  .nav-thumbnail {
    width: 60px;
    height: 60px;
  }

  .nav-text {
    font-size: 1.2rem;
  }

  .description-box {
    max-width: 350px;
    padding: 1.5rem;
  }

  .description-content h3 {
    font-size: 1.1rem;
  }

  .description-content p {
    font-size: 0.8rem;
  }

  .further-button {
    bottom: 5rem;
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

  .back-button {
    top: 2rem;
    left: 1rem;
  }

  .further-button {
    bottom: 12rem;
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
    background: rgba(255, 255, 255, 0.95);  /* Restore background on mobile for readability */
    border-radius: 1rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  }

  .description-content h3,
  .description-content p {
    text-shadow: none;  /* Remove text shadow on mobile */
  }

  .title-text {
    font-size: 2.5rem;
  }

  .curved-title {
    top: -20px;
  }

  .description-content h3 {
    font-size: 1rem;
  }

  .description-content p {
    font-size: 0.75rem;
    font-weight: 400;
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

  .curved-title {
    top: -15px;
  }

  .description-content h3 {
    font-size: 0.95rem;
  }

  .description-content p {
    font-size: 0.7rem;
  }

  .further-button {
    bottom: 10rem;
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