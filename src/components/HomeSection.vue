<template>
  <section 
    id="home" 
    class="home-section"
    @mousemove="handleMouseMove"
    @mouseenter="isHovering = true"
    @mouseleave="handleMouseLeave"
    ref="homeSection"
  >
    <!-- Video Background -->
    <video
      class="video-background"
      autoplay
      loop
      muted
      playsinline
    >
      <source src="/images/waste_management.mov" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    
    <!-- Overlay for better text readability -->
    <div class="video-overlay"></div>

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
      <!-- Bold Title with Icon -->
      <div class="title-wrapper">
        <h1 class="main-title">
          <span class="title-line-1">
            <span>Beyond the b</span><img src="/images/homesection_pic1.png" alt="Discover" class="inline-icon" /><span>n</span>
          </span>
        </h1>
        
        <!-- Typewriter Subtitle -->
        <div class="subtitle-wrapper">
          <h2 class="typewriter-subtitle" ref="typewriterText">
            <span class="typed-text">{{ displayedText }}</span>
            <span class="cursor" :class="{ 'blinking': isTypingComplete }">|</span>
          </h2>
        </div>
      </div>

      <!-- Divider Line -->
      <div class="divider-wrapper">
        <div class="divider-line"></div>
      </div>

      <!-- Stats Sentence Section -->
      <div class="stats-section" ref="statsSection">
        <p class="stats-sentence">
          Our platform gives you access to over 
          <span class="stat-highlight" data-index="0">30+</span> recipes, 
          <span class="stat-highlight" data-index="1">15+</span> ingredients, and 
          <span class="stat-highlight" data-index="2">5+</span> meal plans.
        </p>
        
        <!-- Bottom Description -->
        <div class="description-wrapper">
          <p class="subtitle">
            Find out what drives us and how we bring a second life to leftovers.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const homeSection = ref(null);
const statsSection = ref(null);
const typewriterText = ref(null);
const isHovering = ref(false);
const currentImageIndex = ref(0);
const activeImages = ref([]);
const imageIdCounter = ref(0);

// Typewriter animation state
const displayedText = ref('');
const isTypingComplete = ref(false);
const fullText = 'A Food Waste Initiative';

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
  
  // Start fade out after 0.7 seconds
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

  // Spawn image every 0.1 seconds
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
  activeImages.value = [];
};

// Typewriter animation
const typeWriter = () => {
  let charIndex = 0;
  
  const type = () => {
    if (charIndex < fullText.length) {
      displayedText.value += fullText.charAt(charIndex);
      charIndex++;
      setTimeout(type, 80); // Typing speed
    } else {
      isTypingComplete.value = true;
    }
  };
  
  // Start typing after a short delay
  setTimeout(type, 500);
};

// Animate stat highlights
const animateStatHighlights = () => {
  const highlights = document.querySelectorAll('.stat-highlight');
  highlights.forEach((highlight, index) => {
    setTimeout(() => {
      highlight.classList.add('animate');
    }, 200 + (index * 150)); // Stagger the animations
  });
};

onMounted(() => {
  // Start typewriter animation
  typeWriter();
  
  // Animate stats when section becomes visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        animateStatHighlights();
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
  overflow: hidden;
  cursor: crosshair;
}

/* Video Background */
.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

/* Overlay for text readability */
.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(28, 20, 86, 0.7) 0%,
    rgba(28, 20, 86, 0.5) 50%,
    rgba(28, 20, 86, 0.7) 100%
  );
  z-index: 1;
}

/* Hover Images */
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
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
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

/* Main Title */
.main-title {
  position: relative;
  font-family: var(--font-heading);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.85;
  color: #ffffff;
  margin: 0 0 2rem 0;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.title-line-1 {
  font-size: clamp(3rem, 12vw, 10rem);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Embedded icon */
.inline-icon {
  display: inline-block;
  width: 0.85em;
  height: 0.85em;
  margin: 0 -0.05em;
  vertical-align: middle;
  transform: translateY(-0.05em);
  filter: brightness(0) invert(1);
}

/* Typewriter Subtitle */
.subtitle-wrapper {
  margin-top: 1.5rem;
}

.typewriter-subtitle {
  font-family: var(--font-body);
  font-size: clamp(1.5rem, 4vw, 3rem);
  color: #ffffff;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.typed-text {
  display: inline-block;
}

.cursor {
  display: inline-block;
  margin-left: 0.1em;
  animation: none;
}

.cursor.blinking {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* Divider */
.divider-wrapper {
  display: flex;
  justify-content: center;
  margin: 4rem 0;
}

.divider-line {
  width: 2px;
  height: 80px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(255, 255, 255, 0.8) 50%,
    transparent 100%
  );
}

/* Stats Section */
.stats-section {
  padding: 2rem 0;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.stats-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.stats-sentence {
  font-family: var(--font-body);
  font-size: clamp(1.2rem, 3vw, 2rem);
  color: #ffffff;
  line-height: 1.8;
  max-width: 900px;
  margin: 0 auto 3rem;
  font-weight: 400;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.stat-highlight {
  font-family: var(--font-heading);
  font-size: 1.3em;
  font-weight: 900;
  color: #f7e273;
  display: inline-block;
  padding: 0 0.3em;
  position: relative;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.stat-highlight.animate {
  opacity: 1;
  transform: scale(1);
}

.stat-highlight::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #f7e273, #ffd966);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease 0.2s;
}

.stat-highlight.animate::after {
  transform: scaleX(1);
}

/* Description */
.description-wrapper {
  margin-top: 3rem;
  padding-top: 2rem;
}

.subtitle {
  font-family: var(--font-body);
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 400;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

/* Responsive Design */
@media (max-width: 768px) {
  .home-section {
    padding: 3rem 1rem;
  }

  .title-line-1 {
    font-size: clamp(2rem, 10vw, 5rem);
  }

  .typewriter-subtitle {
    font-size: clamp(1.2rem, 3vw, 2rem);
  }

  .divider-wrapper {
    margin: 3rem 0;
  }

  .divider-line {
    height: 60px;
  }

  .hover-image {
    width: 140px;
    height: 140px;
  }

  .stats-sentence {
    font-size: clamp(1rem, 2.5vw, 1.5rem);
  }

  .description-wrapper {
    margin-top: 2rem;
  }
}

@media (max-width: 480px) {
  .title-line-1 {
    font-size: clamp(1.8rem, 9vw, 3.5rem);
  }

  .typewriter-subtitle {
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    letter-spacing: 0.05em;
  }

  .divider-wrapper {
    margin: 2rem 0;
  }

  .hover-image {
    width: 120px;
    height: 120px;
  }

  .stats-sentence {
    font-size: clamp(0.9rem, 2vw, 1.2rem);
    margin-bottom: 2rem;
  }

  .stat-highlight {
    font-size: 1.2em;
  }
}

/* Performance Optimizations */
.hover-image,
.video-background {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000px;
  perspective: 1000px;
}
</style>