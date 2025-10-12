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
      <!-- Splash background with custom image -->
      <div class="splash-background" ref="splashBackground">
        <img src="/images/splash.png" alt="Splash background" />
      </div>

      <!-- Text bubbles -->
      <div class="text-bubble bubble-top-right" ref="bubbleTopRight">
        <p>Discover amazing features to reduce food waste</p>
      </div>
      
      <div class="text-bubble bubble-bottom-left" ref="bubbleBottomLeft">
        <p>Join our community of sustainable food lovers</p>
      </div>

      <!-- Title content wrapper -->
      <div class="title-content">
        <!-- SVG Title with animated stroke effect -->
        <div class="title-svg-wrapper" ref="titleSvgWrapper">
          <svg viewBox="0 0 1200 200" xmlns="http://www.w3.org/2000/svg" class="title-svg">
            <symbol id="s-text">
              <text text-anchor="middle" x="50%" y="50%" dy=".35em" class="svg-text">
                Our Features
              </text>
            </symbol>
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

    <!-- Six feature images positioned around the title -->
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
let titleHoverTimeline = null;
let isHovering = ref(false);

// Feature data with corner positions for animation
const features = [
  {
    title: 'Reduce Waste',
    description: 'Track what you have and only buy what you need.',
    image: '/images/featurespic1.jpg',
    icon: '♻️',
    corner: 'top-left'
  },
  {
    title: 'Community Support',
    description: 'Get Inspired by the community',
    image: '/images/featurespic3.jpg',
    icon: '🤝',
    corner: 'bottom-right'
  },
  {
    title: 'Meal Planner',
    description: 'Plan meals that fit your budget and cut food waste.',
    image: '/images/hoverpic2.jpg',
    icon: '📅',
    corner: 'left'
  },
  {
    title: 'Healthy Meals',
    description: 'Plan balanced meals that suit dietary preferences.',
    image: '/images/hoverpic5.jpg',
    icon: '🥗',
    corner: 'right'
  },
  {
    title: 'Recipe Sharing',
    description: 'Share your recipes and discover new favorites.',
    image: '/images/hoverpic4.jpg',
    icon: '💬',
    corner: 'bottom-left'
  },
  {
    title: 'Save Money',
    description: 'Plan your grocery shopping and meals to avoid overbuying and overspending.',
    image: '/images/featurespic2.jpg',
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

  gsap.set(titleSvgWrapper.value, {
    opacity: 1
  });
};

const handleTitleHover = (hovering) => {
  isHovering.value = hovering;
  
  if (titleHoverTimeline) {
    titleHoverTimeline.kill();
  }

  titleHoverTimeline = gsap.timeline();

  if (hovering) {
    titleHoverTimeline
      .to(splashBackground.value, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, 0)
      .add(() => {
        titleSvgWrapper.value?.classList.add('animating');
      }, 0)
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
    titleHoverTimeline
      .add(() => {
        titleSvgWrapper.value?.classList.remove('animating');
      }, 0)
      .to([bubbleTopRight.value, bubbleBottomLeft.value], {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)'
      }, 0)
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

  gsap.set(imageRefs.value, {
    opacity: 0,
    scale: 0.3,
  });

  imageRefs.value.forEach((img, index) => {
    const corner = features[index].corner;
    const startPosition = getStartPosition(corner);
    gsap.set(img, startPosition);
  });

  gsap.set(titleContainer.value, {
    opacity: 0,
    scale: 0.8,
    y: 20
  });

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

  tl.to(titleContainer.value, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.8,
    ease: 'back.out(1.7)'
  });

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

  imageRefs.value.forEach(img => {
    gsap.killTweensOf(img);
  });

  const tl = gsap.timeline();

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

.title-container {
  position: relative;
  z-index: 10;
  text-align: center;
  cursor: pointer;
  padding: 2rem 3rem;
  max-width: 1400px;
  margin: 0 auto;
}

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
  z-index: 20;
  pointer-events: all;
  will-change: transform, opacity;
  line-height: 1.4;
}

.text-bubble p {
  margin: 0;
}

.bubble-top-right {
  top: -90px;
  right: -100px;
  background-color: #ffc1c2;
  color: #1c1456;
  transform-origin: center center;
  transform: rotate(3deg) translateY(-3%);
}

.bubble-bottom-left {
  bottom: -90px;
  left: -100px;
  background-color: #f7e273;
  color: #1c1456;
  transform-origin: center center;
  transform: rotate(-3deg) translateY(3%);
}

.title-content {
  position: relative;
  z-index: 2;
}

.title-svg-wrapper {
  position: relative;
  z-index: 2;
  will-change: transform;
  margin-bottom: 0.75rem;
}

.title-svg {
  width: 100%;
  height: auto;
  max-width: 1400px;
  display: block;
  margin: 0 auto;
}

.svg-text {
  font-family: 'Anton', var(--font-heading), sans-serif;
  font-size: 130px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.title-subheading {
  font-family: var(--font-body);
  font-size: clamp(0.85rem, 2vw, 1rem);
  line-height: 1.5;
  color: #1c1456;
  max-width: min(580px, 90%);
  margin: 0 auto;
  font-weight: 400;
  opacity: 0.85;
}

.text-stroke {
  fill: none;
  stroke: #1c1456;
  stroke-width: 5;
  stroke-linejoin: round;
  stroke-dasharray: 70 330;
  stroke-dashoffset: 0;
  animation: none;
}

.text-stroke:nth-child(1) { stroke: #F2385A; }
.text-stroke:nth-child(2) { stroke: #F5A503; }
.text-stroke:nth-child(3) { stroke: #1c1456; }
.text-stroke:nth-child(4) { stroke: #56D9CD; }
.text-stroke:nth-child(5) { stroke: #f4b6c2; }

.title-svg-wrapper.animating .text-stroke {
  animation: stroke 6s infinite linear;
}

.title-svg-wrapper.animating .text-stroke:nth-child(1) { animation-delay: -1.2s; }
.title-svg-wrapper.animating .text-stroke:nth-child(2) { animation-delay: -2.4s; }
.title-svg-wrapper.animating .text-stroke:nth-child(3) { animation-delay: -3.6s; }
.title-svg-wrapper.animating .text-stroke:nth-child(4) { animation-delay: -4.8s; }
.title-svg-wrapper.animating .text-stroke:nth-child(5) { animation-delay: -6s; }

@keyframes stroke {
  100% { stroke-dashoffset: -400; }
}

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

/* Consistent sizing and positioning for all feature images */
.feature-image-1 { 
  top: 10%; 
  left: 8%; 
  width: 300px; 
  height: 220px; 
}

.feature-image-2 { 
  top: 10%; 
  right: 8%; 
  width: 300px; 
  height: 220px; 
}

.feature-image-3 { 
  top: 50%; 
  left: 5%; 
  transform: translateY(-50%); 
  width: 300px; 
  height: 220px; 
}

.feature-image-4 { 
  top: 50%; 
  right: 5%; 
  transform: translateY(-50%); 
  width: 300px; 
  height: 220px; 
}

.feature-image-5 { 
  bottom: 10%; 
  left: 8%; 
  width: 300px; 
  height: 220px; 
}

.feature-image-6 { 
  bottom: 10%; 
  right: 8%; 
  width: 300px; 
  height: 220px; 
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}

.image-wrapper:hover {
  transform: scale(1.05) translateY(-5px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25), 0 0 0 2px var(--color-primary);
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

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(28, 20, 86, 0.95) 0%, rgba(28, 20, 86, 0.7) 50%, transparent 100%);
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

.overlay-content h3 {
  color: #ffffff !important;
  font-family: var(--font-heading2);
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  display: block;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.overlay-content p {
  font-family: var(--font-body);
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.95;
  line-height: 1.4;
}



/* Responsive Design - Mobile and Tablet (7-row layout) */
@media (max-width: 1024px) {
  .features-section {
    padding: 3rem 1rem;
    min-height: auto;
    display: grid;
    grid-template-rows: repeat(7, auto);
    gap: 1.5rem;
    align-items: center;
    justify-items: center;
  }

  .title-container {
    position: relative;
    grid-row: 4;
    margin: 0;
    padding: 1.5rem 1rem;
    width: 100%;
    max-width: 600px;
  }

  .splash-background {
    width: clamp(500px, 110vw, 1100px);
    height: clamp(350px, 75vw, 750px);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .svg-text {
    font-size: clamp(45px, 10vw, 80px);
  }

  .text-bubble {
    font-size: clamp(0.75rem, 1.8vw, 0.88rem);
    padding: clamp(0.7rem, 1.8vw, 1.1rem) clamp(1rem, 2.2vw, 1.5rem);
    max-width: clamp(180px, 35vw, 240px);
  }

  .bubble-top-right {
    top: clamp(-50px, -8.5vw, -75px);
    right: clamp(-40px, -7.5vw, -80px);
  }

  .bubble-bottom-left {
    bottom: clamp(-50px, -8.5vw, -75px);
    left: clamp(-40px, -7.5vw, -80px);
  }

  .background-shapes {
    display: none;
  }

  .images-container {
    position: static;
    display: contents;
    pointer-events: all;
  }

  .feature-image {
    position: relative !important;
    width: 100% !important;
    max-width: min(400px, 90vw);
    height: clamp(180px, 25vw, 220px) !important;
    margin: 0 auto;
    left: auto !important;
    right: auto !important;
    top: auto !important;
    bottom: auto !important;
    transform: none !important;
  }

  /* Assign specific grid rows for the 7-row layout */
  .feature-image-1 { 
    grid-row: 1;
  }

  .feature-image-2 { 
    grid-row: 2;
  }

  .feature-image-3 { 
    grid-row: 3;
  }

  .feature-image-4 { 
    grid-row: 5;
  }

  .feature-image-5 { 
    grid-row: 6;
  }

  .feature-image-6 { 
    grid-row: 7;
  }
}

/* Small mobile specific adjustments */
@media (max-width: 640px) {
  .splash-background {
    width: clamp(400px, 95vw, 600px);
    height: clamp(300px, 70vw, 450px);
  }

  .svg-text {
    font-size: clamp(40px, 12vw, 60px);
  }

  .text-bubble {
    font-size: clamp(0.7rem, 2vw, 0.8rem);
    padding: clamp(0.6rem, 1.5vw, 0.9rem) clamp(0.8rem, 2vw, 1.2rem);
    max-width: clamp(160px, 40vw, 200px);
  }

  .bubble-top-right {
    top: clamp(-35px, -7vw, -50px);
    right: clamp(-30px, -6vw, -45px);
  }

  .bubble-bottom-left {
    bottom: clamp(-35px, -7vw, -50px);
    left: clamp(-30px, -6vw, -45px);
  }

  .feature-image {
    max-width: min(350px, 90vw);
    height: 180px !important;
  }
}
</style>