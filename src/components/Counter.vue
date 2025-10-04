<template>
  <!--
    Statistics section for the food waste application.  This replaces the original
    Tailwind-based counter component with a simpler design.  The section
    displays a few key numbers about the app using custom CSS classes
    defined in styles.css.
  -->
  <section id="stats" class="stats-section">
    <div class="stats-container">
      <div v-for="item in numbers" :key="item.id" class="stat">
        <h2 class="stat-number">{{ item.number }}+</h2>
        <p class="stat-title">{{ item.title }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
// An array of statistic objects.  You can replace these values with
// real metrics (e.g. number of recipes, number of ingredients tracked, etc.)
const numbers = [
  { id: 1, number: 30, title: 'Recipes' },
  { id: 2, number: 15, title: 'Ingredients' },
  { id: 3, number: 5, title: 'Meal Plans' },
];
</script>