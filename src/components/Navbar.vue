<template>
  <header class="navbar">
    <div class="navbar-brand">Food Waste App</div>
    <nav class="navbar-menu">
      <!-- iterate over Menu to render each link -->
      <a v-for="item in Menu" :key="item.name" :href="item.href"
        @click="item.href.startsWith('#') && scrollToSection(item.href)" class="nav-link">
        {{ item.name }}
      </a>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';

// Define your menu items
const Menu = ref([
  { name: 'Home', href: '#home' },
  { name: 'Recipes Finder', href: '/recipes.html' },
  { name: 'Food Tracker', href: '/food-tracker.html' },
  { name: 'Meal Planner & Shopping List', href: '/meal-planner.html' },
  { name: 'Meal Sharing Forum', href: '/meal-sharing.html' },
]);

// Only scroll if the link is an in-page anchor
const scrollToSection = href => {
  if (href.startsWith('#')) {
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
</script>