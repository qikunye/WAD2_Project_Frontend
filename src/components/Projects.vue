<template>
  <!--
    Features section for the food waste application.  This replaces the original
    project carousel with a simple grid of feature cards.  Each feature
    describes one of the core functionalities of the app.
  -->
  <section id="features" class="cards-section">
    <h2 class="section-title">Features</h2>
    <div class="cards-container">
      <div v-for="feature in features" :key="feature.title" class="card">
        <h3 class="card-title">{{ feature.title }}</h3>
        <p class="card-desc">{{ feature.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
// Define the list of application features.  Each object contains a title
// and a short description.  You can expand this list as the project grows.
const features = [
  {
    title: 'Recipes Finder',
    description:
      'Find recipes based on the ingredients you have and filter them by dietary restrictions.',
  },
  {
    title: 'Food Tracker',
    description:
      'Keep track of your ingredients and monitor their expiration dates to reduce waste.',
  },
  {
    title: 'Meal Planner & Shopping List',
    description:
      'Plan meals for the week, generate shopping lists and manage your grocery budget.',
  },
  {
    title: 'Meal Sharing Forum',
    description:
      'Share your meals with the community, get inspired and exchange cooking tips.',
  },
];
</script>