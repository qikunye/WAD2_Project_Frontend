<template>
  <div class="menu-overlay" :class="{ open: isOpen }" v-show="isOpen" @click="handleOverlayClick">
    <!-- Close button -->
    <button class="menu-close" @click="$emit('close')">
      <span class="close-line"></span>
      <span class="close-line"></span>
    </button>

    <!-- Bubble links -->
    <div class="overlay-content">
      <a
        v-for="(item, index) in items"
        :key="item.name"
        :href="item.href"
        class="menu-circle"
        :class="item.class"
        :style="{ transitionDelay: isOpen ? `${index * 0.08}s` : '0s' }"
        @click.stop
      >
        <span class="circle-text">{{ item.name }}</span>
        <div class="circle-ripple"></div>
      </a>
    </div>

    <div class="overlay-decoration"></div>
  </div>
</template>


<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['close']);

const handleOverlayClick = (e) => {
  if (e.target.classList.contains('menu-overlay')) {
    emit('close');
  }
};
</script>

<style scoped>
.menu-overlay {
  position: fixed;
  inset: 0;
  background: radial-gradient(
    circle at center,
    rgba(229, 228, 226, 0.98) 0%,
    rgba(244, 182, 194, 0.95) 100%
  );
  opacity: 0;
  pointer-events: none;
  transition: opacity 500ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.menu-overlay.open {
  opacity: 1;
  pointer-events: all;
}

/* Close button with animated X */
.menu-close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: var(--color-primary);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 15px rgba(28, 20, 86, 0.3);
}

.menu-close:hover {
  transform: rotate(90deg) scale(1.1);
  background: var(--color-secondary);
  box-shadow: 0 8px 25px rgba(244, 182, 194, 0.5);
}

.close-line {
  position: absolute;
  width: 24px;
  height: 3px;
  background: var(--color-secondary);
  border-radius: 2px;
  transition: background 0.3s ease;
}

.menu-close:hover .close-line {
  background: var(--color-primary);
}

.close-line:first-child {
  transform: rotate(45deg);
}

.close-line:last-child {
  transform: rotate(-45deg);
}

.overlay-content {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Base bubble styling with enhanced effects */
.menu-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-secondary), #f9d4dd);
  color: var(--color-primary);
  font-family: var(--font-heading);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  text-align: center;
  padding: 1rem;
  font-size: 1.05em;
  font-weight: bold;
  line-height: 1.2;
  opacity: 0;
  --tx: 0;
  --ty: 0;
  transform: translateX(var(--tx)) translateY(var(--ty)) scale(0.3);
  transition:
    transform 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55),
    opacity 400ms ease-in-out,
    box-shadow 300ms ease;
  transform-origin: center center;
  overflow: hidden;
  z-index: 1;
  box-shadow: 
    0 10px 40px rgba(244, 182, 194, 0.3),
    inset 0 -5px 20px rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

/* Ripple effect inside bubbles */
.circle-ripple {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
  opacity: 0;
  transform: scale(0);
  transition: all 0.6s ease;
}

.menu-circle:hover .circle-ripple {
  opacity: 1;
  transform: scale(1.5);
}

.circle-text {
  position: relative;
  z-index: 2;
}

/* Open state animations */
.menu-overlay.open .menu-circle {
  opacity: 1;
  transform: translateX(var(--tx)) translateY(var(--ty)) scale(1);
}

/* Enhanced hover effects */
.menu-overlay.open .menu-circle:hover {
  transform: translateX(var(--tx)) translateY(var(--ty)) scale(1.15);
  z-index: 100;
  box-shadow: 
    0 20px 60px rgba(244, 182, 194, 0.6),
    0 0 40px rgba(28, 20, 86, 0.3),
    inset 0 -5px 30px rgba(255, 255, 255, 0.7);
  animation: bubblePulse 1s ease infinite;
}

@keyframes bubblePulse {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.2);
  }
}

/* Active/click effect */
.menu-circle:active {
  transform: translateX(var(--tx)) translateY(var(--ty)) scale(0.95);
}

/* Prevent hover on closed overlay */
.menu-overlay:not(.open) .menu-circle {
  pointer-events: none;
}

/* Individual bubble positioning with enhanced layout */
.bubble-home {
  --tx: 0;
  --ty: 0;
  width: 16rem;
  height: 16rem;
  top: 15%;
  left: 12%;
  background: linear-gradient(135deg, #f4b6c2, #fcd5e0);
}

.bubble-recipes {
  --tx: 0;
  --ty: 0;
  width: 19rem;
  height: 19rem;
  top: 10%;
  right: 10%;
  background: linear-gradient(135deg, #f9d4dd, #f4b6c2);
}

.bubble-tracker {
  --tx: 0;
  --ty: 0;
  width: 17rem;
  height: 17rem;
  top: 42%;
  left: 50%;
  background: linear-gradient(135deg, #f4b6c2, #e8a5b5);
}

.bubble-planner {
  --tx: 0;
  --ty: 0;
  width: 21rem;
  height: 21rem;
  bottom: 10%;
  left: 8%;
  background: linear-gradient(135deg, #fcd5e0, #f4b6c2);
}

.bubble-forum {
  --tx: 0;
  --ty: 0;
  width: 16rem;
  height: 16rem;
  bottom: 15%;
  right: 10%;
  background: linear-gradient(135deg, #f9d4dd, #fcd5e0);
}

/* Floating animation when overlay opens */
@keyframes float {
  0%, 100% {
    transform: translateX(var(--tx)) translateY(calc(var(--ty) + 0px)) scale(1);
  }
  50% {
    transform: translateX(var(--tx)) translateY(calc(var(--ty) - 10px)) scale(1);
  }
}

.menu-overlay.open .menu-circle {
  animation: float 4s ease-in-out infinite;
}

.bubble-home { animation-delay: 0s; }
.bubble-recipes { animation-delay: 0.5s; }
.bubble-tracker { animation-delay: 1s; }
.bubble-planner { animation-delay: 1.5s; }
.bubble-forum { animation-delay: 2s; }

/* Decorative background elements */
.overlay-decoration {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.menu-overlay.open .overlay-decoration {
  opacity: 1;
}

.overlay-decoration::before,
.overlay-decoration::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(28, 20, 86, 0.05) 0%, transparent 70%);
}

.overlay-decoration::before {
  width: 300px;
  height: 300px;
  top: 10%;
  right: 5%;
  animation: decorationFloat 8s ease-in-out infinite;
}

.overlay-decoration::after {
  width: 400px;
  height: 400px;
  bottom: 5%;
  left: 10%;
  animation: decorationFloat 10s ease-in-out infinite reverse;
}

@keyframes decorationFloat {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(20px, -20px) rotate(180deg);
  }
}

/* Icon overlay effect */
.menu-circle::after {
  content: "";
  position: absolute;
  inset: 15%;
  background: url("/images/40865-ffffff.svg") no-repeat center/contain;
  opacity: 0;
  transition: opacity 300ms ease-in-out;
  z-index: 1;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.menu-circle:hover::after {
  opacity: 0.15;
  animation: rotateIcon 2s linear infinite;
}

@keyframes rotateIcon {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive adjustments */
@media (min-width: 1200px) {
  .bubble-tracker {
    width: 18rem;
    height: 18rem;
  }
}

@media (min-width: 1000px) and (max-width: 1200px) {
  .bubble-tracker {
    width: 15rem;
    height: 15rem;
    top: 40%;
  }
  
  .bubble-planner {
    left: 6%;
    bottom: 12%;
  }
  
  .bubble-recipes {
    right: 8%;
    top: 12%;
  }
}

@media (max-width: 720px) {
  .menu-close {
    width: 45px;
    height: 45px;
    top: 1.5rem;
    right: 1.5rem;
  }
  
  .bubble-home { 
    width: 13rem; 
    height: 13rem; 
    top: 8%; 
    left: 5%; 
    font-size: 0.95em;
  }
  
  .bubble-recipes { 
    width: 15rem; 
    height: 15rem; 
    top: 8%; 
    right: 5%; 
    font-size: 0.95em;
  }
  
  .bubble-tracker { 
    width: 14rem; 
    height: 14rem; 
    top: 45%; 
    font-size: 0.95em;
  }
  
  .bubble-planner { 
    width: 16rem; 
    height: 16rem; 
    bottom: 8%; 
    left: 8%; 
    font-size: 0.95em;
  }
  
  .bubble-forum { 
    width: 13rem; 
    height: 13rem; 
    bottom: 8%; 
    right: 8%; 
    font-size: 0.95em;
  }
}

/* Focus states for accessibility */
.menu-circle:focus,
.menu-circle:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 5px;
}

.menu-close:focus,
.menu-close:focus-visible {
  outline: 3px solid var(--color-secondary);
  outline-offset: 3px;
}
</style>
  