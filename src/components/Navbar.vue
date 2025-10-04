<template>
  <!--
    Navbar component rewritten without Tailwind CSS.  The navigation bar
    displays a set of links defined in the Menu array.  A separate
    "Menu" button toggles a full‑screen bubble menu overlay.  The
    overlay component (MenuOverlay) receives its own list of items and
    emits a close event to hide itself.  The scrollToSection method
    ensures that only anchor links beginning with "#" trigger smooth
    scrolling within the current page.
  -->
  <header class="navbar">
    <div class="navbar-brand">Food Waste App</div>
    <nav class="navbar-menu">
      <!-- iterate over Menu to render each link -->
      <a
        v-for="item in Menu"
        :key="item.name"
        :href="item.href"
        @click="item.href.startsWith('#') && scrollToSection(item.href)"
        class="navbar-link"
      >
        {{ item.name }}
      </a>
    </nav>
    <!-- Menu button to open the bubble menu overlay -->
    <button class="menu-button" @click="menuOpen = true">Menu</button>
    <!-- Bubble menu overlay component -->
    <MenuOverlay
      :isOpen="menuOpen"
      :items="overlayItems"
      @close="menuOpen = false"
    />
  </header>
</template>

<script setup>
import { ref } from 'vue';
import MenuOverlay from './MenuOverlay.vue';

// Navigation items for the standard navbar.  The Home link scrolls within
// the SPA, while the other links point to standalone pages located in
// the public directory.


// Reactive state controlling the visibility of the bubble menu overlay.
const menuOpen = ref(false);

// Items to display inside the bubble menu overlay.  Each item defines
// a name, a destination and a CSS class used to position and size its
// circle.  You can adjust the class names to match definitions in
// MenuOverlay.vue or styles.css.
const overlayItems = [
  { name: 'Home', href: '#home', class: 'bubble-home' },
  { name: 'Recipes Finder', href: '/recipes.html', class: 'bubble-recipes' },
  { name: 'Food Tracker', href: '/food-tracker.html', class: 'bubble-tracker' },
  { name: 'Meal Planner & Shopping List', href: '/meal-planner.html', class: 'bubble-planner' },
  { name: 'Meal Sharing Forum', href: '/meal-sharing.html', class: 'bubble-forum' },
];

// Only scroll if the link is an in-page anchor.  External pages
// (e.g. /recipes.html) will navigate normally without calling this.
const scrollToSection = (href) => {
  if (href.startsWith('#')) {
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
</script>
  