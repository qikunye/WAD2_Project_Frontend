<template>
  <section 
    id="features" 
    class="features-section" 
    ref="featuresSection"
  >
    <!-- Background decorative shapes -->
    <div class="background-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>

    <!-- Centered title with hover effects -->
    <div 
      class="title-container" 
      ref="titleContainer"
      @mouseenter="handleTitleHover(true)"
      @mouseleave="handleTitleHover(false)"
    >
      <!-- Splash background with custom image - ENLARGED -->
      <div class="splash-background" ref="splashBackground">
        <img src="/images/splash.png" alt="Splash background" />
        
        <!-- Text bubbles - repositioned inside splash -->
        <div class="text-bubble bubble-top-right" ref="bubbleTopRight">
          <p>Discover amazing features to reduce food waste</p>
        </div>
        
        <div class="text-bubble bubble-bottom-left" ref="bubbleBottomLeft">
          <p>Join our community of sustainable food lovers</p>
        </div>
      </div>

      <!-- Title content wrapper -->
      <div class="title-content">
        <!-- SVG Title with animated stroke effect -->
        <div class="title-svg-wrapper" ref="titleSvgWrapper">
          <svg viewBox="0 0 1200 200" xmlns="http://www.w3.org/2000/svg" class="title-svg">
            <!-- Define the text as a symbol -->
            <symbol id="s-text">
              <text text-anchor="middle" x="50%" y="50%" dy=".35em" class="svg-text">
                Our Features
              </text>
            </symbol>
            <!-- Duplicate symbols for the stroke animation effect -->
            <use class="text-stroke" href="#s-text"></use>
            <use class="text-stroke" href="#s-text"></use>
            <use class="text-stroke" href="#s-text"></use>
            <use class="text-stroke" href="#s-text"></use>
            <use class="text-stroke" href="#s-text"></use>
          </svg>
        </div>

        <!-- Subheading -->
        <p class="title-subheading" ref="titleSubheading">
          Minimize food waste and maximize sustainability in your kitchen
        </p>
      </div>
    </div>

    <!-- Six feature images positioned around the title - SPREAD TO CORNERS -->
    <div class="images-container" ref="imagesContainer">
      <div 
        v-for="(feature, index) in features" 
        :key="index"
        class="feature-image"
        :class="`feature-image-${index + 1}`"
        :ref="el => { if (el) imageRefs[index] = el }"
        :data-corner="feature.corner"
      >
        <div class="image-wrapper">
          <img :src="feature.image" :alt="feature.title" />
          <div class="image-overlay">
            <div class="overlay-content">
              <div class="icon">{{ feature.icon }}</div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const featuresSection = ref(null);
const titleContainer = ref(null);
const titleSvgWrapper = ref(null);
const titleSubheading = ref(null);
const splashBackground = ref(null);
const bubbleTopRight = ref(null);
const bubbleBottomLeft = ref(null);
const imagesContainer = ref(null);
const imageRefs = ref([]);

let scrollTriggerInstance = null;
let hasAnimatedIn = ref(false);
let titleHoverTimeline = null;
let isHovering = ref(false);

// Feature data with corner positions for animation
const features = [
  {
    title: 'Reduce Waste',
    description: 'Keep track of what you have and need.',
    image: 'public/images/2e245a8ba50e4d6f2722ede5844cb232.jpg',
    icon: '♻️',
    corner: 'top-left'
  },
  {
    title: 'Community Support',
    description: 'Get Inspired by the community',
    image: 'public/images/486561da858e98fdb5007d7e85095ffc.jpg',
    icon: '🤝',
    corner: 'bottom-right'
  },
  {
    title: 'Personalized Meal Planner',
    description: 'Plan weekly meals that fit your budget, save time, and cut food waste.',
    image: 'public/images/5b9268747f3cdf55cbda63a22312fc0a.jpg',
    icon: '📅',
    corner: 'left'
  },
  {
    title: 'Healthy Meals',
    description: 'Plan balanced meals that suit dietary preferences.',
    image: 'public/images/829fb22e4984a91ee658156830a481bc.jpg',
    icon: '🥗',
    corner: 'right'
  },
  {
    title: 'Community Support',
    description: 'Connect with others, share and discover recipes',
    image: 'public/images/6edaf1d6d2de1c0bf1c1888642a289c7.jpg',
    icon: '💬',
    corner: 'bottom-left'
  },
  {
    title: 'Save Money',
    description: 'Plan your grocery shopping and meals to avoid overbuying and overspending.',
    image: 'public/images/82fda315cd1e0e444bad996f4a367624.jpg',
    icon: '💰',
    corner: 'top-right'
  }
];

onMounted(() => {
  initAnimation();
  initTitleHoverAnimation();
});

onUnmounted(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
  }
  if (titleHoverTimeline) {
    titleHoverTimeline.kill();
  }
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});

const initTitleHoverAnimation = () => {
  // Set initial states for hover elements
  gsap.set(splashBackground.value, {
    scale: 0,
    opacity: 0,
    transformOrigin: 'center center'
  });

  gsap.set([bubbleTopRight.value, bubbleBottomLeft.value], {
    scale: 0,
    opacity: 0,
    transformOrigin: 'center center'
  });

  gsap.set(titleSubheading.value, {
    opacity: 1
  });

  // Initially show outline only
  gsap.set(titleSvgWrapper.value, {
    opacity: 1
  });
};

const handleTitleHover = (hovering) => {
  isHovering.value = hovering;
  
  // Kill existing timeline if any
  if (titleHoverTimeline) {
    titleHoverTimeline.kill();
  }

  titleHoverTimeline = gsap.timeline();

  if (hovering) {
    // Hover IN animation
    titleHoverTimeline
      // Splash background expands
      .to(splashBackground.value, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, 0)
      // Start SVG stroke animation by adding class
      .add(() => {
        titleSvgWrapper.value?.classList.add('animating');
      }, 0)
      // Text bubbles pop in
      .to(bubbleTopRight.value, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      }, 0.3)
      .to(bubbleBottomLeft.value, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      }, 0.4);
  } else {
    // Hover OUT animation (reverse)
    titleHoverTimeline
      // Stop SVG animation by removing class
      .add(() => {
        titleSvgWrapper.value?.classList.remove('animating');
      }, 0)
      // Bubbles disappear first
      .to([bubbleTopRight.value, bubbleBottomLeft.value], {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)'
      }, 0)
      // Splash shrinks
      .to(splashBackground.value, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'back.in(1.7)'
      }, 0.2);
  }
};

const initAnimation = () => {
  if (!featuresSection.value) return;

  // Set initial state - images off-screen at their corners
  gsap.set(imageRefs.value, {
    opacity: 0,
    scale: 0.3,
  });

  // Set initial positions based on corner
  imageRefs.value.forEach((img, index) => {
    const corner = features[index].corner;
    const startPosition = getStartPosition(corner);
    gsap.set(img, startPosition);
  });

  // Set title initial state
  gsap.set(titleContainer.value, {
    opacity: 0,
    scale: 0.8,
    y: 20
  });

  // Create ScrollTrigger
  scrollTriggerInstance = ScrollTrigger.create({
    trigger: featuresSection.value,
    start: 'top 70%',
    end: 'bottom 30%',
    onEnter: () => animateIn(),
    onLeave: () => animateOut(),
    onEnterBack: () => animateIn(),
    onLeaveBack: () => animateOut(),
  });
};

const getStartPosition = (corner) => {
  const distance = 150;
  
  const positions = {
    'top-left': { x: -distance, y: -distance },
    'top-right': { x: distance, y: -distance },
    'left': { x: -distance, y: 0 },
    'right': { x: distance, y: 0 },
    'bottom-left': { x: -distance, y: distance },
    'bottom-right': { x: distance, y: distance }
  };
  
  return positions[corner] || { x: 0, y: -distance };
};

const animateIn = () => {
  if (!titleContainer.value || imageRefs.value.length === 0) return;

  const tl = gsap.timeline();

  // Animate title first
  tl.to(titleContainer.value, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.8,
    ease: 'back.out(1.7)'
  });

  // Animate images with stagger and random delays
  imageRefs.value.forEach((img, index) => {
    const randomDelay = Math.random() * 0.3;
    const randomRotation = (Math.random() - 0.5) * 10;
    
    tl.to(img, {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: randomRotation,
      duration: 0.9,
      ease: 'back.out(1.7)',
      onComplete: () => {
        gsap.to(img, {
          rotation: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    }, 0.3 + (index * 0.08) + randomDelay);
  });

  // Add floating animation after they've landed
  tl.add(() => {
    imageRefs.value.forEach((img, index) => {
      gsap.to(img, {
        y: '+=10',
        duration: 2 + (index * 0.2),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  });
};

const animateOut = () => {
  if (!titleContainer.value || imageRefs.value.length === 0) return;

  // Kill any floating animations
  imageRefs.value.forEach(img => {
    gsap.killTweensOf(img);
  });

  const tl = gsap.timeline();

  // Animate images out first
  imageRefs.value.forEach((img, index) => {
    const corner = features[index].corner;
    const endPosition = getStartPosition(corner);
    const randomDelay = Math.random() * 0.2;
    
    tl.to(img, {
      ...endPosition,
      opacity: 0,
      scale: 0.3,
      rotation: (Math.random() - 0.5) * 20,
      duration: 0.6,
      ease: 'back.in(1.7)'
    }, index * 0.05 + randomDelay);
  });

  // Animate title out last
  tl.to(titleContainer.value, {
    opacity: 0,
    scale: 0.8,
    y: -20,
    duration: 0.5,
    ease: 'power2.in'
  }, '-=0.3');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton:wght@400&display=swap');

.features-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fbfaf9;
  overflow: hidden;
  padding: 6rem 2rem;
}

/* Background decorative shapes */
.background-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.05;
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: var(--color-primary);
  top: -100px;
  left: -100px;
}

.shape-2 {
  width: 300px;
  height: 300px;
  background: var(--color-secondary);
  bottom: -80px;
  right: -80px;
}

.shape-3 {
  width: 250px;
  height: 250px;
  background: var(--color-accent);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Title container with hover effects */
.title-container {
  position: relative;
  z-index: 10;
  text-align: center;
  cursor: pointer;
  padding: 2rem 3rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* Splash background - MASSIVE SIZE for full coverage */
.splash-background {
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 900%;
  height: 600%;
  z-index: 1;
  pointer-events: none;
  will-change: transform, opacity;
}

.splash-background img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 10px 30px rgba(179, 230, 255, 0.3));
}

/* Text bubbles - positioned at edges of splash */
.text-bubble {
  position: absolute;
  padding: 1.25rem 1.75rem;
  border-radius: 2rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  font-style: italic;
  max-width: 270px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  z-index: 2;
  pointer-events: all;
  will-change: transform, opacity;
  line-height: 1.4;
}

.text-bubble p {
  margin: 0;
}

/* Top-right bubble - positioned at TOP-RIGHT corner of splash image */
.bubble-top-right {
  top: 8%;
  right: 8%;
  background-color: #ffc1c2;
  color: #1c1456;
  transform: rotate(3deg);
}

/* Bottom-left bubble - positioned at BOTTOM-LEFT corner of splash image */
.bubble-bottom-left {
  bottom: 8%;
  left: 8%;
  background-color: #f7e273;
  color: #1c1456;
  transform: rotate(-3deg);
}

/* Title content wrapper */
.title-content {
  position: relative;
  z-index: 2;
}

/* SVG Title Wrapper */
.title-svg-wrapper {
  position: relative;
  z-index: 2;
  will-change: transform;
  margin-bottom: 1.5rem;
}

.title-svg {
  width: 100%;
  height: auto;
  max-width: 1400px;
  display: block;
  margin: 0 auto;
}

/* SVG Text Styling */
.svg-text {
  font-family: 'Anton', var(--font-heading), sans-serif;
  font-size: 130px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

/* Subheading - reduced max-width */
.title-subheading {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.5;
  color: #1c1456;
  max-width: 580px;
  margin: 0 auto;
  font-weight: 400;
  opacity: 0.85;
}

/* Animated stroke effect - default state (outline only) */
.text-stroke {
  fill:none ;
  stroke: none;
  stroke-width: 5;
  stroke-linejoin: round;
  stroke-dasharray: 70 330;
  stroke-dashoffset: 0;
  animation: none;
}

/* Individual stroke colors and delays */
.text-stroke:nth-child(1) {
  stroke: #F2385A;
}

.text-stroke:nth-child(2) {
  stroke: #F5A503;
}

.text-stroke:nth-child(3) {
  stroke: #1c1456;
}

.text-stroke:nth-child(4) {
  stroke: #56D9CD;
}

.text-stroke:nth-child(5) {
  stroke: #f4b6c2;
}

/* Animate strokes when hovering */
.title-svg-wrapper.animating .text-stroke {
  animation: stroke 6s infinite linear;
}

.title-svg-wrapper.animating .text-stroke:nth-child(1) {
  animation-delay: -1.2s;
}

.title-svg-wrapper.animating .text-stroke:nth-child(2) {
  animation-delay: -2.4s;
}

.title-svg-wrapper.animating .text-stroke:nth-child(3) {
  animation-delay: -3.6s;
}

.title-svg-wrapper.animating .text-stroke:nth-child(4) {
  animation-delay: -4.8s;
}

.title-svg-wrapper.animating .text-stroke:nth-child(5) {
  animation-delay: -6s;
}

/* Keyframes for stroke animation */
@keyframes stroke {
  100% {
    stroke-dashoffset: -400;
  }
}

/* Images container */
.images-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.feature-image {
  position: absolute;
  pointer-events: all;
  will-change: transform, opacity;
}

/* Positioning for 6 images - SPREAD TO CORNERS for better balance */
.feature-image-1 {
  top: 8%;
  left: 4%;
  width: 280px;
  height: 200px;
}

.feature-image-2 {
  top: 8%;
  right: 4%;
  width: 280px;
  height: 200px;
}

.feature-image-3 {
  top: 50%;
  left: 1%;
  transform: translateY(-50%);
  width: 260px;
  height: 180px;
}

.feature-image-4 {
  top: 50%;
  right: 1%;
  transform: translateY(-50%);
  width: 260px;
  height: 180px;
}

.feature-image-5 {
  bottom: 8%;
  left: 4%;
  width: 280px;
  height: 200px;
}

.feature-image-6 {
  bottom: 8%;
  right: 4%;
  width: 280px;
  height: 200px;
}

/* Image wrapper styling */
.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}

.image-wrapper:hover {
  transform: scale(1.05) translateY(-5px);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.25),
    0 0 0 2px var(--color-primary);
}

.feature-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}

.image-wrapper:hover img {
  transform: scale(1.1);
}

/* Image overlay */
.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(28, 20, 86, 0.95) 0%,
    rgba(28, 20, 86, 0.7) 50%,
    transparent 100%
  );
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.image-wrapper:hover .image-overlay {
  opacity: 1;
}

.overlay-content {
  color: white;
  text-align: left;
}

.icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  display: block;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.overlay-content h3 {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.overlay-content p {
  font-family: var(--font-body);
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.95;
  line-height: 1.4;
}

/* Responsive adjustments - PROPERLY SCALED */
@media (max-width: 1400px) {
  .splash-background {
    width: 800%;
    height: 550%;
    top: 70%;
  }

  .bubble-top-right {
    top: 7%;
    right: 7%;
  }

  .bubble-bottom-left {
    bottom: 7%;
    left: 7%;
  }

  .title-subheading {
    max-width: 550px;
  }

  .feature-image-1,
  .feature-image-2 {
    top: 10%;
  }

  .feature-image-5,
  .feature-image-6 {
    bottom: 10%;
  }
}

@media (max-width: 1200px) {
  .splash-background {
    width: 700%;
    height: 500%;
    top: 65%;
  }

  .feature-image-1,
  .feature-image-2,
  .feature-image-5,
  .feature-image-6 {
    width: 240px;
    height: 170px;
  }

  .feature-image-3,
  .feature-image-4 {
    width: 220px;
    height: 160px;
  }

  .text-bubble {
    font-size: 0.85rem;
    padding: 1rem 1.5rem;
    max-width: 240px;
  }

  .svg-text {
    font-size: 100px;
  }

  .title-subheading {
    font-size: 0.95rem;
    max-width: 520px;
  }

  .bubble-top-right {
    top: 6%;
    right: 6%;
  }

  .bubble-bottom-left {
    bottom: 6%;
    left: 6%;
  }
}

@media (max-width: 1024px) {
  .splash-background {
    width: 600%;
    height: 450%;
    top: 60%;
  }

  .svg-text {
    font-size: 80px;
  }

  .title-subheading {
    font-size: 0.9rem;
    max-width: 480px;
  }

  .title-container {
    padding: 2rem;
  }

  .text-bubble {
    font-size: 0.8rem;
    padding: 0.9rem 1.3rem;
    max-width: 220px;
  }

  .bubble-top-right {
    top: 5%;
    right: 5%;
  }

  .bubble-bottom-left {
    bottom: 5%;
    left: 5%;
  }

  .feature-image-1,
  .feature-image-2 {
    top: 12%;
  }

  .feature-image-5,
  .feature-image-6 {
    bottom: 12%;
  }
}

@media (max-width: 768px) {
  .features-section {
    padding: 3rem 1rem;
    min-height: auto;
    padding-bottom: 8rem;
  }

  .splash-background {
    width: 500%;
    height: 400%;
    top: 55%;
    position: relative;
    transform: none;
    left: auto;
    margin: 0 auto;
  }

  .svg-text {
    font-size: 60px;
  }

  .title-subheading {
    font-size: 0.85rem;
    max-width: 90%;
    line-height: 1.4;
  }

  .text-bubble {
    font-size: 0.8rem;
    padding: 1rem 1.5rem;
    max-width: 200px;
    position: relative;
    margin: 1rem auto;
    top: auto;
    right: auto;
    bottom: auto;
    left: auto;
  }

  .bubble-top-right {
    transform: rotate(0deg);
    order: 1;
  }

  .bubble-bottom-left {
    transform: rotate(0deg);
    order: 3;
  }

  .splash-background img {
    order: 2;
  }

  /* Stack images vertically on mobile */
  .feature-image {
    position: relative !important;
    width: 100% !important;
    max-width: 350px;
    height: 200px !important;
    margin: 1rem auto;
    left: 50% !important;
    right: auto !important;
    top: auto !important;
    bottom: auto !important;
    transform: translateX(-50%) !important;
  }

  .images-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3rem;
    pointer-events: all;
  }

  .title-container {
    position: relative;
    margin-bottom: 2rem;
    padding: 2rem 1rem;
  }

  .overlay-content h3 {
    font-size: 1.1rem;
  }

  .overlay-content p {
    font-size: 0.85rem;
  }

  .icon {
    font-size: 2rem;
  }
}

/* Prevent layout shift during animation */
.feature-image,
.splash-background,
.text-bubble,
.title-svg-wrapper {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000px;
  perspective: 1000px;
}

/* Accessibility */
.feature-image:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 4px;
}

.title-container:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 8px;
  border-radius: 1rem;
}
</style>