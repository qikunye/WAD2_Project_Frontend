<template>
  <section 
    id="features" 
    class="scrolly-section" 
    ref="featuresSection"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Title overlays with different effects -->
    <h1 class="text">Our Features</h1>
    <h1 aria-hidden="true" class="text outline-text">Our Features</h1>
    <h1 aria-hidden="true" class="text filter-text">Our Features</h1>

    <div class="scroll-indicator" v-if="showIndicator">
      <div class="indicator-bar">
        <div class="indicator-fill" :style="{ width: `${scrollProgress * 100}%` }"></div>
      </div>
      <p class="indicator-text">
        <span v-if="scrollProgress < 0.01">↓ Scroll down to explore</span>
        <span v-else-if="scrollProgress > 0.99">↑ Scroll up to review</span>
        <span v-else>{{ Math.round(scrollProgress * 100) }}%</span>
      </p>
    </div>

    <div id="wrapper">
      <section id="content">
        <section class="images">
          <!-- Feature images with data-speed for parallax effect -->
          <div class="image-wrapper" data-speed="0.8">
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=80" 
              alt="Recipe Finding Feature"
            />
            <div class="image-label">Recipes Finder</div>
          </div>

          <div class="image-wrapper" data-speed="0.9">
            <img 
              src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&q=80" 
              alt="Food Tracking"
            />
            <div class="image-label">Food Tracker</div>
          </div>

          <div class="image-wrapper" data-speed="1">
            <img 
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80" 
              alt="Meal Planning"
            />
            <div class="image-label">Meal Planner</div>
          </div>

          <div class="image-wrapper" data-speed="1.1">
            <img 
              src="https://images.unsplash.com/photo-1543362906-acfc16c67564?w=400&q=80" 
              alt="Shopping List"
            />
            <div class="image-label">Shopping List</div>
          </div>

          <div class="image-wrapper" data-speed="0.9">
            <img 
              src="https://images.unsplash.com/photo-1505935428862-770b6f24f629?w=400&q=80" 
              alt="Community Forum"
            />
            <div class="image-label">Meal Sharing</div>
          </div>

          <div class="image-wrapper" data-speed="1.2">
            <img 
              src="https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=400&q=80" 
              alt="Recipe Ingredients"
            />
            <div class="image-label">Ingredients</div>
          </div>

          <div class="image-wrapper" data-speed="0.8">
            <img 
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" 
              alt="Healthy Meals"
            />
            <div class="image-label">Healthy Eating</div>
          </div>

          <div class="image-wrapper" data-speed="1">
            <img 
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80" 
              alt="Save Money"
            />
            <div class="image-label">Save Money</div>
          </div>
        </section>
      </section>
    </div>

    <!-- Overlay to capture all scroll events within section -->
    <div class="scroll-capture-overlay"></div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

const featuresSection = ref(null);
const isHovering = ref(false);
const scrollProgress = ref(0);
const accumulatedScroll = ref(0);
const isInViewport = ref(false);
const sectionBounds = ref({ top: 0, bottom: 0, height: 0 });

// Smooth animation targets
const targetProgress = ref(0);
const animationState = ref({
  contentOffset: 0,
  imageOffsets: [],
  titleOffsets: [],
  skewValues: []
});

let animationFrameId = null;
let skewSetter = null;
let intersectionObserver = ref(null);
let smoothAnimationLoop = null;

// Animation settings
const SCROLL_DISTANCE = 2000;
const SKEW_INTENSITY = 50;
const SMOOTH_FACTOR = 0.15; // Lower = smoother, higher = more responsive

// Show indicator only when hovering and in viewport
const showIndicator = computed(() => {
  return isHovering.value && isInViewport.value;
});

onMounted(() => {
  // Initialize GSAP skew animation
  skewSetter = gsap.quickTo(".scrolly-section img", "skewY");
  
  // Set up scroll listener
  window.addEventListener('wheel', handleScroll, { passive: false });
  window.addEventListener('touchmove', handleTouchScroll, { passive: false });
  
  // Start smooth animation loop
  startSmoothAnimationLoop();
  
  // Set up intersection observer with detailed threshold
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isInViewport.value = entry.isIntersecting;
        
        // Update section bounds
        if (featuresSection.value) {
          const rect = featuresSection.value.getBoundingClientRect();
          sectionBounds.value = {
            top: rect.top + window.scrollY,
            bottom: rect.bottom + window.scrollY,
            height: rect.height
          };
        }
        
        // Reset progress if completely out of view
        if (!entry.isIntersecting) {
          const rect = entry.boundingClientRect;
          // If scrolled past section (section is above viewport)
          if (rect.bottom < 0) {
            if (scrollProgress.value < 0.5) {
              // Was scrolling down, reset to end
              accumulatedScroll.value = SCROLL_DISTANCE;
              targetProgress.value = 1;
              scrollProgress.value = 1;
            }
          }
          // If section is below viewport
          else if (rect.top > window.innerHeight) {
            if (scrollProgress.value > 0.5) {
              // Was scrolling up, reset to start
              accumulatedScroll.value = 0;
              targetProgress.value = 0;
              scrollProgress.value = 0;
            }
          }
        }
      });
    },
    { 
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1],
      rootMargin: '0px'
    }
  );

  if (featuresSection.value) {
    intersectionObserver.observe(featuresSection.value);
    
    // Initial bounds calculation
    const rect = featuresSection.value.getBoundingClientRect();
    sectionBounds.value = {
      top: rect.top + window.scrollY,
      bottom: rect.bottom + window.scrollY,
      height: rect.height
    };
  }
});

onUnmounted(() => {
  window.removeEventListener('wheel', handleScroll);
  window.removeEventListener('touchmove', handleTouchScroll);
  
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  
  if (smoothAnimationLoop) {
    cancelAnimationFrame(smoothAnimationLoop);
  }
  
  if (intersectionObserver) {
    intersectionObserver.disconnect();
  }
});

const handleMouseEnter = () => {
  isHovering.value = true;
};

const handleMouseLeave = () => {
  isHovering.value = false;
};

// Check if we should respond to scroll
const shouldHandleScroll = () => {
  if (!featuresSection.value) return false;
  
  const rect = featuresSection.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  
  // Section must be in viewport
  const inView = rect.top < viewportHeight && rect.bottom > 0;
  
  // Must be hovering over section
  const hovering = isHovering.value;
  
  return inView && hovering;
};

const handleScroll = (e) => {
  // First check: Should we even handle this scroll?
  if (!shouldHandleScroll()) {
    // Allow normal page scrolling
    return;
  }

  const rect = featuresSection.value.getBoundingClientRect();
  const delta = e.deltaY;
  const scrollingDown = delta > 0;
  const scrollingUp = delta < 0;

  // Check extremes
  const atStart = scrollProgress.value <= 0.01;
  const atEnd = scrollProgress.value >= 0.99;

  // Allow scroll to pass through at extremes
  if ((atStart && scrollingUp) || (atEnd && scrollingDown)) {
    // Unlock temporarily and allow normal scroll
    isHovering.value = false;
    setTimeout(() => {
      // Check if still in section after scroll
      if (featuresSection.value) {
        const newRect = featuresSection.value.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        if (newRect.top < viewportHeight && newRect.bottom > 0) {
          isHovering.value = true;
        }
      }
    }, 100);
    return;
  }

  // Prevent default and handle scroll
  e.preventDefault();
  e.stopPropagation();
  
  // Update accumulated scroll with damping
  const dampedDelta = delta * 0.8; // Slightly reduce sensitivity for smoother feel
  accumulatedScroll.value = Math.max(0, Math.min(SCROLL_DISTANCE, accumulatedScroll.value + dampedDelta));
  
  // Update target progress (smooth animation will interpolate to this)
  targetProgress.value = accumulatedScroll.value / SCROLL_DISTANCE;
  
  // Apply immediate skew for responsiveness
  applySkewEffect(delta);
};

const handleTouchScroll = (e) => {
  if (shouldHandleScroll()) {
    e.preventDefault();
  }
};

// Smooth animation loop using requestAnimationFrame
const startSmoothAnimationLoop = () => {
  const animate = () => {
    // Smoothly interpolate current progress towards target
    const diff = targetProgress.value - scrollProgress.value;
    scrollProgress.value += diff * SMOOTH_FACTOR;
    
    // Update animations with smooth progress
    updateAnimations();
    
    smoothAnimationLoop = requestAnimationFrame(animate);
  };
  
  animate();
};

const applySkewEffect = (delta) => {
  const images = document.querySelectorAll('.scrolly-section img');
  const skewAmount = Math.max(-20, Math.min(20, delta / SKEW_INTENSITY));
  
  images.forEach(img => {
    gsap.to(img, {
      skewY: skewAmount,
      duration: 0.1,
      ease: 'power2.out'
    });
  });

  // Reset skew smoothly
  setTimeout(() => {
    images.forEach(img => {
      gsap.to(img, {
        skewY: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    });
  }, 150);
};

const updateAnimations = () => {
  // Only animate if we should be handling scroll
  if (!shouldHandleScroll() && Math.abs(targetProgress.value - scrollProgress.value) < 0.001) {
    return;
  }

  // Smooth content offset
  const targetContentOffset = -scrollProgress.value * 1500;
  animationState.value.contentOffset += (targetContentOffset - animationState.value.contentOffset) * SMOOTH_FACTOR;

  // Update image parallax with smooth easing
  const images = document.querySelectorAll('.image-wrapper');
  images.forEach((wrapper, index) => {
    const img = wrapper.querySelector('img');
    const speed = parseFloat(wrapper.getAttribute('data-speed')) || 1;
    
    // Target parallax offset
    const targetOffset = scrollProgress.value * 800 * (speed - 1);
    
    // Initialize offset array if needed
    if (!animationState.value.imageOffsets[index]) {
      animationState.value.imageOffsets[index] = 0;
    }
    
    // Smooth interpolation
    animationState.value.imageOffsets[index] += 
      (targetOffset - animationState.value.imageOffsets[index]) * SMOOTH_FACTOR;
    
    // Apply transform
    gsap.to(wrapper, {
      y: animationState.value.imageOffsets[index],
      duration: 0.1,
      ease: 'power2.out'
    });

    // Scale and opacity based on proximity
    const distanceFromCenter = Math.abs((index / images.length) - scrollProgress.value);
    const targetScale = 1 - (distanceFromCenter * 0.15);
    const targetOpacity = 1 - (distanceFromCenter * 0.3);
    
    gsap.to(wrapper, {
      scale: Math.max(0.85, Math.min(1, targetScale)),
      opacity: Math.max(0.4, Math.min(1, targetOpacity)),
      duration: 0.5,
      ease: 'power2.out'
    });

    // Subtle image zoom
    if (img) {
      const zoom = 1 + (1 - distanceFromCenter) * 0.05;
      gsap.to(img, {
        scale: zoom,
        duration: 0.6,
        ease: 'power2.out'
      });
    }

    // Show/hide overlay
    const overlay = wrapper.querySelector('.image-overlay');
    if (overlay) {
      const showOverlay = distanceFromCenter < 0.15;
      gsap.to(overlay, {
        opacity: showOverlay ? 1 : 0,
        duration: 0.5,
        ease: 'power2.inOut'
      });
    }
  });

  // Animate title layers with smooth parallax
  const titles = document.querySelectorAll('.text');
  titles.forEach((title, index) => {
    const targetOffset = scrollProgress.value * 100 * (index + 1) * 0.5;
    
    if (!animationState.value.titleOffsets[index]) {
      animationState.value.titleOffsets[index] = 0;
    }
    
    animationState.value.titleOffsets[index] += 
      (targetOffset - animationState.value.titleOffsets[index]) * SMOOTH_FACTOR;
    
    gsap.to(title, {
      y: animationState.value.titleOffsets[index],
      opacity: 1 - scrollProgress.value * 0.3,
      duration: 0.1,
      ease: 'power2.out'
    });
  });
};
</script>

<style scoped>
.scrolly-section {
  position: relative;
  background-color: #b3e6ff;
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
  cursor: grab;
}

.scrolly-section:active {
  cursor: grabbing;
}

/* Invisible overlay to capture scroll events anywhere in the section */
.scroll-capture-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  pointer-events: none;
}

.scrolly-section:hover .scroll-capture-overlay {
  pointer-events: all;
}

/* Scroll progress indicator */
.scroll-indicator {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1001;
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem 2rem;
  border-radius: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  animation: fadeInUp 0.3s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.indicator-bar {
  width: 250px;
  height: 6px;
  background: rgba(28, 20, 86, 0.15);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.75rem;
  position: relative;
}

.indicator-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(255, 255, 255, 0.3) 50%, 
    transparent 100%);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.indicator-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  transition: width 0.2s ease-out;
  border-radius: 3px;
  position: relative;
  z-index: 1;
}

.indicator-text {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary);
  margin: 0;
  min-height: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

#wrapper {
  overflow: hidden;
  position: relative;
  height: 100vh;
  width: 100%;
  z-index: 1;
}

#content {
  overflow: visible;
  width: 100%;
  will-change: transform;
}

/* Title styling with multiple layers */
.text {
  position: fixed;
  top: 50vh;
  font-family: var(--font-heading);
  font-weight: 900;
  font-style: normal;
  font-size: clamp(3rem, 8vw, 8rem);
  text-align: center;
  width: 100%;
  transform: translateY(-100%);
  z-index: 2;
  color: var(--color-primary);
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: var(--color-primary);
  pointer-events: none;
  letter-spacing: 0.05em;
  will-change: transform, opacity;
}

.outline-text {
  color: transparent;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: var(--color-primary);
  z-index: 3;
}

.filter-text {
  mix-blend-mode: screen;
  color: var(--color-secondary);
  z-index: 4;
}

/* Images grid layout */
.images {
  padding-top: 20vh;
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 150vh;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(20, 5%);
  grid-template-rows: repeat(30, 3%);
  justify-content: center;
  justify-items: center;
  align-items: center;
  z-index: 6;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  will-change: transform, opacity;
  pointer-events: all;
}

.image-wrapper:hover {
  box-shadow: 0 15px 60px rgba(28, 20, 86, 0.25);
  z-index: 100;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  will-change: transform;
  pointer-events: none;
}

/* Image labels */
.image-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(28, 20, 86, 0.9), transparent);
  color: white;
  padding: 1rem;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  text-align: center;
  opacity: 0;
  transform: translateY(100%);
  transition: all 0.3s ease;
  pointer-events: none;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(28, 20, 86, 0.95), rgba(28, 20, 86, 0.3));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
}

.image-wrapper:hover .image-label,
.image-wrapper:hover .image-overlay {
  opacity: 1;
  transform: translateY(0);
}

/* Grid positioning for each image */
.image-wrapper:nth-child(1) {
  grid-area: 1/1/6/8;
}

.image-wrapper:nth-child(2) {
  grid-area: 3/12/8/20;
}

.image-wrapper:nth-child(3) {
  grid-area: 9/5/13/15;
}

.image-wrapper:nth-child(4) {
  grid-area: 14/1/18/8;
}

.image-wrapper:nth-child(5) {
  grid-area: 16/12/20/19;
}

.image-wrapper:nth-child(6) {
  grid-area: 20/2/25/9;
}

.image-wrapper:nth-child(7) {
  grid-area: 22/11/24/20;
}

.image-wrapper:nth-child(8) {
  grid-area: 26/5/30/15;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .images {
    grid-template-columns: repeat(20, 5%);
    max-width: 900px;
  }
  
  .text {
    font-size: clamp(2.5rem, 7vw, 6rem);
  }
  
  .indicator-bar {
    width: 200px;
  }
}

@media (max-width: 768px) {
  .images {
    padding-top: 30vh;
    grid-template-columns: repeat(12, 8.33%);
    grid-template-rows: repeat(40, 2.5%);
    max-width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .text {
    font-size: clamp(2rem, 6vw, 5rem);
  }

  .scroll-indicator {
    bottom: 1rem;
    padding: 0.75rem 1.5rem;
  }

  .indicator-bar {
    width: 150px;
  }

  .indicator-text {
    font-size: 0.75rem;
  }

  /* Adjust grid areas for mobile */
  .image-wrapper:nth-child(1) {
    grid-area: 1/1/7/7;
  }

  .image-wrapper:nth-child(2) {
    grid-area: 3/7/9/13;
  }

  .image-wrapper:nth-child(3) {
    grid-area: 10/2/16/10;
  }

  .image-wrapper:nth-child(4) {
    grid-area: 17/1/23/7;
  }

  .image-wrapper:nth-child(5) {
    grid-area: 19/7/25/13;
  }

  .image-wrapper:nth-child(6) {
    grid-area: 26/2/32/8;
  }

  .image-wrapper:nth-child(7) {
    grid-area: 28/8/34/13;
  }

  .image-wrapper:nth-child(8) {
    grid-area: 35/3/41/11;
  }
}

/* Prevent text selection on animated elements */
.text,
.image-wrapper {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Performance optimizations */
.image-wrapper,
.image-wrapper img,
.text {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000px;
  perspective: 1000px;
}
</style>