<template>
  <section 
    id="home" 
    class="home-section"
    @mousemove="handleMouseMove"
    @mouseenter="isHovering = true"
    @mouseleave="handleMouseLeave"
    ref="homeSection"
  >
    <!-- Hover Images - Multiple instances -->
    <div 
      v-for="image in activeImages"
      :key="image.id"
      class="hover-image"
      :class="{ 'fading-out': image.fadingOut }"
      :style="{ left: `${image.x}px`, top: `${image.y}px` }"
    >
      <img :src="image.src" alt="Interactive element" />
    </div>

    <!-- Main Container -->
    <div class="home-container">
      <!-- Bold Title with Icons -->
      <div class="title-wrapper" ref="titleWrapper">
        <h1 class="main-title">
          <span class="title-line-1">
            <span>Beyond the b</span><img src="/images/homesection_pic1.png" alt="Discover" class="inline-icon" /><span>n</span>
          </span>
          <span class="title-line-2">A food waste initiative</span>

          <!-- Yellow Icon (Bottom Left of Title) -->
          <button 
            class="corner-icon-button"
            @click="handleCornerIconClick"
            aria-label="Peace sign"
          >
            <img src="/images/homesection_pic2.png" alt="Peace" />
          </button>
        </h1>
      </div>

      <!-- Subtitle/Description -->
      <div class="description-wrapper">
        <div class="divider-line"></div>
        <p class="subtitle">
          Find out what drives us and how we bring a second life for leftovers.
        </p>
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
import { ref, onMounted, onUnmounted } from 'vue';

const homeSection = ref(null);
const statsSection = ref(null);
const titleWrapper = ref(null);
const isHovering = ref(false);
const currentImageIndex = ref(0);
const activeImages = ref([]);
const imageIdCounter = ref(0);

let spawnTimer = null;

// 10 predefined hover images
const hoverImages = [
  '/images/hoverpic1.jpg',
  '/images/hoverpic2.jpg',
  '/images/hoverpic3.jpg',
  '/images/hoverpic4.jpg',
  '/images/hoverpic5.jpg',
  '/images/hoverpic6.jpg',
  '/images/hoverpic7.jpg',
  '/images/hoverpic8.jpg',
  '/images/hoverpic9.jpg',
  '/images/hoverpic10.jpg',
];

// Stats data
const numbers = [
  { id: 1, number: 30, title: 'Recipes' },
  { id: 2, number: 15, title: 'Ingredients' },
  { id: 3, number: 5, title: 'Meal Plans' },
];

const spawnImage = (x, y) => {
  const imageId = imageIdCounter.value++;
  const imageSrc = hoverImages[currentImageIndex.value];
  
  // Offset the image position (20px right, 20px down from cursor)
  const offsetX = x + 20;
  const offsetY = y + 20;
  
  // Create new image object
  const newImage = {
    id: imageId,
    x: offsetX,
    y: offsetY,
    src: imageSrc,
    fadingOut: false
  };
  
  activeImages.value.push(newImage);
  
  // Move to next image in sequence
  currentImageIndex.value = (currentImageIndex.value + 1) % hoverImages.length;
  
  // Start fade out after 0.7 seconds (fade takes 0.3s)
  setTimeout(() => {
    const image = activeImages.value.find(img => img.id === imageId);
    if (image) {
      image.fadingOut = true;
    }
  }, 700);
  
  // Remove after 1 second total
  setTimeout(() => {
    activeImages.value = activeImages.value.filter(img => img.id !== imageId);
  }, 1000);
};

const handleMouseMove = (e) => {
  if (!isHovering.value) return;

  const rect = homeSection.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Spawn image every 0.1 seconds (100ms)
  if (!spawnTimer) {
    spawnImage(x, y);
    
    spawnTimer = setTimeout(() => {
      spawnTimer = null;
    }, 100);
  }
};

const handleMouseLeave = () => {
  isHovering.value = false;
  clearTimeout(spawnTimer);
  spawnTimer = null;
  // Clear all active images
  activeImages.value = [];
};

const handleCornerIconClick = () => {
  console.log('Corner icon clicked - Peace!');
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
        entry.target.classList.add('is-visible');
        
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

onUnmounted(() => {
  clearTimeout(spawnTimer);
  activeImages.value = [];
});
</script>

<style scoped>
.home-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background-color: #e5e4e2;
  overflow: hidden;
  cursor: crosshair;
}

/* Hover Images - Multiple instances with elegant entrance animation */
.hover-image {
  position: absolute;
  width: 180px;
  height: 180px;
  pointer-events: none;
  z-index: 100;
  transform: translate(-50%, -50%) scale(1);
  will-change: transform, opacity;
  opacity: 1;
  animation: elegantEntrance 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition: opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes elegantEntrance {
  0% {
    transform: translate(-50%, -50%) scale(0.3) translateY(20px);
    opacity: 0;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.08) translateY(-3px) rotate(2deg);
    opacity: 0.9;
  }
  75% {
    transform: translate(-50%, -50%) scale(0.97) translateY(1px) rotate(-1deg);
  }
  100% {
    transform: translate(-50%, -50%) scale(1) translateY(0) rotate(0deg);
    opacity: 1;
  }
}

.hover-image.fading-out {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.85) translateY(-10px) rotate(3deg);
}

.hover-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2));
}

/* Main Container */
.home-container {
  position: relative;
  z-index: 2;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 0 2rem;
}

/* Title Wrapper */
.title-wrapper {
  position: relative;
  margin-bottom: 3rem;
}

/* Bold Main Title - EISLAB Style */
.main-title {
  position: relative;
  font-family: var(--font-heading);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.85;
  color: #1c1456;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.title-line-1 {
  font-size: clamp(3rem, 12vw, 10rem);
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-line-2 {
  font-size: clamp(2rem, 8vw, 6rem);
  display: block;
}

/* Embedded icon within the first line of the title */
.inline-icon {
  display: inline-block;
  width: 0.85em;
  height: 0.85em;
  margin: 0 -0.05em;
  vertical-align: middle;
  transform: translateY(-0.05em);
}

/* Yellow Corner Icon - REPOSITIONED to bottom-left of title */
.corner-icon-button {
  position: absolute;
  bottom: -60px;
  left: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f7e273 0%, #ffd966 100%);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 10;
}

.corner-icon-button:hover {
  transform: scale(1.15) rotate(-10deg);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.25);
}

.corner-icon-button img {
  width: 50%;
  height: 50%;
  object-fit: contain;
}

/* Description Wrapper */
.description-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
  margin-top: 5rem;
}

.divider-line {
  width: 2px;
  height: 80px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    #1c1456 50%,
    transparent 100%
  );
}

.subtitle {
  font-family: var(--font-body);
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  color: #1c1456;
  max-width: 600px;
  line-height: 1.6;
  font-weight: 400;
}

/* Stats Section - UPDATED STYLING */
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

/* Counter Bubble - UPDATED COLORS */
.stat-circle {
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e5e4e2;
  border-radius: 50%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 4px solid #1c1456;
}

.stat:hover .stat-circle {
  transform: translateY(-10px) rotate(5deg);
  box-shadow: 0 20px 60px rgba(28, 20, 86, 0.4);
  border-color: #1c1456;
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
  .home-section {
    padding: 3rem 1rem;
  }

  .title-line-1,
  .title-line-2 {
    font-size: clamp(2rem, 10vw, 5rem);
  }

  .corner-icon-button {
    width: 70px;
    height: 70px;
    bottom: -50px;
    left: 0;
  }

  .description-wrapper {
    margin-top: 4rem;
  }

  .divider-line {
    height: 60px;
  }

  .hover-image {
    width: 140px;
    height: 140px;
  }

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
  .title-line-1,
  .title-line-2 {
    font-size: clamp(1.8rem, 9vw, 3.5rem);
  }

  .corner-icon-button {
    width: 60px;
    height: 60px;
    bottom: -40px;
  }

  .description-wrapper {
    margin-top: 3rem;
  }

  .hover-image {
    width: 120px;
    height: 120px;
  }

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

/* Performance Optimizations */
.hover-image,
.corner-icon-button {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000px;
  perspective: 1000px;
}

/* Accessibility */
.corner-icon-button:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 4px;
}
</style>