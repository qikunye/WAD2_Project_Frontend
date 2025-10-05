<template>
  <div class="menu-overlay" :class="{ open: isOpen }">
    <!-- Close button (X) -->
    <button class="menu-close" @click="$emit('close')">×</button>
    <!-- Bubble links -->
    <a
      v-for="(item, index) in items"
      :key="item.name"
      :href="item.href"
      class="menu-circle"
      :class="item.class"
      :style="{ transitionDelay: isOpen ? `${index * 0.3}s` : '0s' }"
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
  transition: opacity 1s ease-in-out;
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

  /* Text scales with bubble size */
  font-size: 1.2em;
  font-weight: bold;
  line-height: 1.2;

  /* Start hidden */
  opacity: 0;
  transform: scale(0.9);
  transition: transform 0.6s ease-in-out, opacity 1.5s ease-in-out;
  overflow: hidden;
  z-index: 0;
}

/* When overlay is open, fade in and reset size */
.menu-overlay.open .menu-circle {
  opacity: 1;
  transform: scale(1);
}

/* Hover effect: bubble grows smoothly */
.menu-overlay.open .menu-circle:hover {
  transform: scale(1.3); /* grow on hover */
}

/* Inner image highlight (scales with bubble because inset is %) */
.menu-circle::after {
  content: "";
  position: absolute;
  inset: 12%;
  background: url("/images/40865-ffffff.svg") no-repeat center/contain;
  opacity: 0;
  transition: opacity 1.5s ease-in-out;
  z-index: -1;
}
.menu-circle:hover::after {
  opacity: 1;
}

/* Positioning classes */
.bubble-home {
  width: 14rem;
  height: 14rem;
  top: 15%;
  left: 10%;
}
.bubble-recipes {
  width: 18rem;
  height: 18rem;
  top: 15%;
  right: 10%;
}
.bubble-tracker {
  width: 16rem;
  height: 16rem;
  top: 40%;
  left: 50%;
  transform: translateX(-50%) scale(0.9);
}
.bubble-planner {
  width: 20rem;
  height: 20rem;
  bottom: 15%;
  left: 15%;
}
.bubble-forum {
  width: 10rem;
  height: 10rem;
  bottom: 15%;
  right: 15%;
}
</style>
