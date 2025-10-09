<template>
  <section id="call_to_action" class="call-to-action-section" ref="sectionRef">
    <!-- Background Images Container -->
    <div class="background-container" ref="bgContainer">
      <!-- Before Image (Base layer) -->
      <div class="background-image before-bg">
        <img src="/images/call_to_action_before.png" alt="Before state">
      </div>
      
      <!-- After Image (Reveal layer) -->
      <div class="background-image after-bg" ref="afterBg">
        <img src="/images/call_to_action_after.png" alt="After state">
      </div>
    </div>

    <!-- Content Overlay -->
    <div class="content-overlay">
      <div class="content-wrapper">
        <!-- Main Title -->
        <div class="hero-content" ref="heroContent">
          <h1 class="main-title">
            <span class="title-line">Transform</span>
            <span class="title-line">Your Impact</span>
          </h1>
          
          <p class="subtitle">
            Scroll to witness the journey from waste to sustainability
          </p>
        </div>

        <!-- Transformation Labels -->
        <div class="transformation-labels">
          <div class="label label-before" ref="labelBefore">
            <span>BEFORE</span>
          </div>
          <div class="label label-after" ref="labelAfter">
            <span>AFTER</span>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="cta-content" ref="ctaContent">
          <h2>The Future We're Building Together</h2>
          <p>Join thousands who are already making a difference—one meal, one choice, one day at a time.</p>
          
          <button @click="handleStartJourney" class="cta-button">
            Start Your Journey
          </button>
        </div>

        <!-- Scroll Progress Indicator -->
        <div class="scroll-progress">
          <div class="progress-bar" ref="progressBar"></div>
        </div>
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

    <!-- Spacer for scroll -->
    <div class="scroll-spacer"></div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const router = useRouter();

// Refs
const sectionRef = ref(null);
const bgContainer = ref(null);
const afterBg = ref(null);
const heroContent = ref(null);
const labelBefore = ref(null);
const labelAfter = ref(null);
const ctaContent = ref(null);
const progressBar = ref(null);
const showBackToTop = ref(false);

// Handle scroll for back to top button
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
  router.push('/login');
};

// Initialize animations
const initAnimations = () => {
  // Make sure DOM is ready
  if (!sectionRef.value || !afterBg.value) return;

  // Kill any existing ScrollTriggers to prevent conflicts
  ScrollTrigger.getAll().forEach(st => st.kill());
  
  // Refresh ScrollTrigger to recalculate positions
  ScrollTrigger.refresh();

  // Create a simple timeline for the wipe effect
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: bgContainer.value,
      start: "top top",
      end: "+=200%", // Scroll for 2x the viewport height
      scrub: 0.5, // Smooth scrubbing
      pin: bgContainer.value, // Pin the background container
      pinSpacing: false,
      invalidateOnRefresh: true, // Recalculate on window resize
    }
  });

  // Simple wipe from right to left
  tl.to(afterBg.value, {
    clipPath: "inset(0% 0% 0% 0%)", // Reveal from right to left
    ease: "none",
    duration: 1
  });

  // Progress bar
  if (progressBar.value) {
    gsap.to(progressBar.value, {
      scaleX: 1,
      scrollTrigger: {
        trigger: bgContainer.value,
        start: "top top",
        end: "+=200%",
        scrub: 0.5,
      },
      transformOrigin: "left center",
      ease: "none"
    });
  }

  // Labels animation
  if (labelBefore.value && labelAfter.value) {
    gsap.to(labelBefore.value, {
      opacity: 0,
      x: -50,
      scrollTrigger: {
        trigger: bgContainer.value,
        start: "top top",
        end: "+=100%",
        scrub: 0.5,
      }
    });

    gsap.fromTo(labelAfter.value, 
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: bgContainer.value,
          start: "+=50%",
          end: "+=150%",
          scrub: 0.5,
        }
      }
    );
  }

  // Content animations
  if (heroContent.value) {
    gsap.from(heroContent.value.children, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: heroContent.value,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }

  if (ctaContent.value) {
    gsap.from(ctaContent.value.children, {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ctaContent.value,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  
  // Wait for next tick and images to load
  nextTick(() => {
    // Give time for everything to render
    setTimeout(() => {
      initAnimations();
    }, 300);
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});
</script>

<style scoped>
.call-to-action-section {
  position: relative;
  width: 100%;
  background: #000;
}

/* Scroll spacer to create scrollable area */
.scroll-spacer {
  height: 200vh;
  position: relative;
  z-index: 1;
}

/* Background Container */
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 2;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.background-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6);
}

/* After image with clip-path for reveal */
.after-bg {
  clip-path: inset(0% 0% 0% 100%); /* Initially hidden (clipped from left) */
  z-index: 2;
}

/* Content Overlay */
.content-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.4) 100%
  );
  pointer-events: none;
}

.content-wrapper {
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  text-align: center;
  pointer-events: auto;
}

/* Hero Content */
.hero-content {
  margin-bottom: 4rem;
}

.main-title {
  font-family: var(--font-heading);
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
}

.subtitle {
  font-family: var(--font-body);
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  letter-spacing: 0.05em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

/* Transformation Labels */
.transformation-labels {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 3rem;
  pointer-events: none;
}

.label {
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
}

.label span {
  font-family: var(--font-heading);
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: white;
}

.label-after {
  opacity: 0;
}

/* CTA Content */
.cta-content {
  position: relative;
  margin-top: 4rem;
}

.cta-content h2 {
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.cta-content p {
  font-family: var(--font-body);
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
}

.cta-button {
  padding: 1.25rem 3.5rem;
  font-family: var(--font-body);
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: white;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(242, 56, 90, 0.4);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(242, 56, 90, 0.5);
  background: linear-gradient(135deg, var(--color-secondary), var(--color-accent));
}

/* Scroll Progress */
.scroll-progress {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  z-index: 10;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  transform-origin: left;
  transform: scaleX(0);
}

/* Back to Top Button */
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
  color: var(--color-primary);
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

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* Responsive Design */
@media (max-width: 768px) {
  .scroll-spacer {
    height: 150vh;
  }

  .content-wrapper {
    padding: 1.5rem;
  }

  .hero-content {
    margin-bottom: 3rem;
  }

  .transformation-labels {
    padding: 0 1.5rem;
  }

  .label {
    padding: 0.75rem 1.5rem;
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

  .transformation-labels {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .cta-content {
    margin-top: 3rem;
  }

  .cta-button {
    padding: 1rem 2rem;
    font-size: 0.95rem;
  }
}
</style>