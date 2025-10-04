<template>
  <!--
    Benefits section for the food waste application.  This section outlines
    some of the key advantages of using the app.  Each benefit is presented
    as a card in a responsive grid layout.
  -->
  <section id="benefits" class="cards-section">
    <h2 class="section-title">Benefits</h2>
    <div class="cards-container">
      <div v-for="benefit in benefits" :key="benefit.title" class="card">
        <h3 class="card-title">{{ benefit.title }}</h3>
        <p class="card-desc">{{ benefit.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
// List of benefits that the app provides.  Feel free to adjust or expand
// these descriptions to better reflect your project's value proposition.
const benefits = [
  {
    title: 'Reduce Waste',
    description: 'Minimize food waste at home by keeping track of what you have and need.',
  },
  {
    title: 'Save Money',
    description: 'Plan your grocery shopping and meals to avoid overbuying and overspending.',
  },
  {
    title: 'Healthy Meals',
    description: 'Ensure balanced nutrition by planning meals with dietary preferences in mind.',
  },
  {
    title: 'Community Support',
    description:
      'Connect with others, share your recipes and tips, and get inspired by the community.',
  },
];
</script>