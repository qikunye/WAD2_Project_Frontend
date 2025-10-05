<template>
  <div class="menu-overlay" :class="{ open: isOpen }" v-show="isOpen">
    <!-- Close button (X) -->
    <button class="menu-close" @click="$emit('close')">×</button>
    <!-- Bubble links -->
    <a
      v-for="(item, index) in items"
      :key="item.name"
      :href="item.href"
      class="menu-circle"
      :class="item.class"
      :style="{ transitionDelay: isOpen ? `${index * 0.18}s` : '0s' }"
    >
      {{ item.name }}
    </a>
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
</script>

<style scoped>
/* Overlay container */
.menu-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(229, 228, 226, 0.95);
  opacity: 0;
  pointer-events: none;
  transition: opacity 400ms ease-in-out;
  z-index: 1000;
  overflow: hidden;
}
.menu-overlay.open {
  opacity: 1;
  pointer-events: all;
}

/* Close button styling */
.menu-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 2rem;
  color: var(--color-primary);
  cursor: pointer;
}

/* Base bubble appearance */
.menu-circle {
  position: absolute;
  border-radius: 50%;
  background-color: var(--color-secondary);
  color: var(--color-primary);
  font-family: var(--font-heading);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  text-align: center;
  padding: 1rem;
  pointer-events: all;
  font-size: 1.05em;
  font-weight: bold;
  line-height: 1.2;
  opacity: 0;
  --tx: 0;
  --ty: 0;
  transform: translateX(var(--tx)) translateY(var(--ty)) scale(0.9);
  transition:
    transform 360ms cubic-bezier(.2,.9,.2,1),
    opacity 360ms ease-in-out,
    top 360ms cubic-bezier(.2,.9,.2,1);
  transform-origin: center center;
  overflow: hidden;
  z-index: 0;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
}

/* When overlay is open, fade in and reset size */
.menu-overlay.open .menu-circle {
  opacity: 1;
  transform: translateX(var(--tx)) translateY(var(--ty)) scale(1);
}

/* Reduce max grow (less overlap) and preserve offsets */
.menu-overlay.open .menu-circle:hover {
  transform: translateX(var(--tx)) translateY(var(--ty)) scale(1.18);
  z-index: 50;
}

/* ensure no pointer events when closed */
.menu-overlay:not(.open) .menu-circle {
  pointer-events: none;
}

.menu-overlay.open .bubble-tracker {
  --ty: -4vh; /* lift tracker when open */
  transform: translateX(var(--tx)) translateY(var(--ty)) scale(1);
}

/* Large screens */
@media (min-width: 1200px) {
  .menu-overlay.open .bubble-tracker {
    --ty: -6vh;
  }
}

/* Mid-desktop tweaks */
@media (min-width: 1000px) and (max-width: 1200px) {
  .bubble-tracker {
    width: 14.5rem;
    height: 14.5rem;
    top: 38%;
  }
  .menu-overlay.open .bubble-tracker {
    --ty: -8vh;
    z-index: 40;
  }
  .bubble-planner {
    left: 8%;
    bottom: 10%;
  }
  .bubble-recipes {
    right: 6%;
    top: 10%;
  }
  .menu-overlay.open .menu-circle:hover {
    transform: translateX(var(--tx)) translateY(var(--ty)) scale(1.12);
  }
}

/* Inner image highlight */
.menu-circle::after {
  content: "";
  position: absolute;
  inset: 12%;
  background: url("/images/40865-ffffff.svg") no-repeat center/contain;
  opacity: 0;
  transition: opacity 200ms ease-in-out;
  z-index: -1;
}
.menu-circle:hover::after {
  opacity: 1;
}

/* Positioning classes */
.bubble-home {
  --tx: 8%;
  --ty: 0;
  width: 15rem;
  height: 15rem;
  top: 12%;
  left: 14%;
}
.bubble-recipes {
  --tx: 0;
  --ty: 0;
  width: 18rem;
  height: 18rem;
  top: 12%;
  right: 13%;
}
.bubble-tracker {
  --tx: -50%;
  --ty: 0;
  width: 16rem;
  height: 16rem;
  top: 40%;
  left: 50%;
  transform: translateX(var(--tx)) translateY(var(--ty)) scale(0.9);
}
.bubble-planner {
  --tx: 0;
  --ty: 0;
  width: 20rem;
  height: 20rem;
  bottom: 12%;
  left: 12%;
}
.bubble-forum {
  --tx: 0;
  --ty: 0;
  width: 15rem;   /* increased from 10rem */
  height: 15rem;  /* increased from 10rem */
  bottom: 12%;
  right: 12%;
}

/* Responsive: narrow screens */
@media (max-width: 720px) {
  .bubble-home { width: 12rem; height: 12rem; top: 10%; left: 6%; }
  .bubble-recipes { width: 14rem; height: 14rem; top: 10%; right: 6%; }
  .bubble-tracker { width: 12rem; height: 12rem; top: 45%; left: 50%; }
  .bubble-planner { width: 14rem; height: 14rem; bottom: 10%; left: 10%; }
  .bubble-forum { width: 12rem; height: 12rem; bottom: 10%; right: 10%; }

  .menu-overlay.open .bubble-tracker {
    --ty: -6vh;
  }
  .menu-overlay.open .menu-circle:hover {
    transform: translateX(var(--tx)) translateY(var(--ty)) scale(1.1);
  }
}

/* Optional: subtle ring on hover */
.menu-circle:focus,
.menu-circle:hover {
  outline: none;
  box-shadow: 0 10px 30px rgba(0,0,0,0.12);
}
</style>
