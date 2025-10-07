<template>
  <!--
      A card component that displays an optional image, title, description,
      tags and an optional link to the project’s source code.  It uses
      classes from main.css for the main card layout and defines scoped
      styles for the tags and link.
    -->
 
  <div class="card">
    <!-- Image slot -->
    <img v-if="image" :src="image" :alt="title" class="card-image" />
    <h3 class="card-title">{{ title }}</h3>
    <!-- <p class="card-desc">{{ description }}</p> -->
    <!-- Tags -->
    <ul v-if="tags && tags.length" class="card-tags">
      <li v-for="(tag, index) in tags" :key="index">#{{ tag }}</li>
    </ul>
    <!-- Optional link -->
    <!-- <div v-if="codeLink" class="card-actions"> -->
      <!-- <a :href="codeLink" class="card-link" target="_blank" rel="noopener">View Code</a> -->
    <!-- </div> -->
  </div>

</template>
  
  <script setup>
  // Props for the ProjectCard.  Default values allow it to be used without
  // specifying every field.
  defineProps({
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    tags: {
      type: Array,
      default: () => [],
    },
    codeLink: {
      type: String,
      default: '',
    },
  });
  </script>
  
<style scoped>
.card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.4s ease;
  transform: scale(1);
  cursor: pointer;
  height: 100%;
}

/* Hover animation — grow slightly */
.card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Image reveal effect */
.card-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 0.5rem 0.5rem 0 0;
  transition: transform 0.5s ease, opacity 0.5s ease;
  opacity: 0.9;
}

.card:hover .card-image {
  transform: scale(1.08);
  opacity: 1;
}

/* Title styling */
.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  padding: 1rem;
  margin-top: 10px;
  color: #1a1a1a;
}

/* Tags list */
.card-tags {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.card-tags li {
  background-color: var(--color-primary);
  color: var(--color-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
}

/* Container for cards grid */
.cards-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  padding: 2rem;
}

/* Medium screens — 2 cards */
@media (min-width: 768px) {
  .cards-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Extra-large screens — 3 cards */
@media (min-width: 1280px) {
  .cards-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Optional link styling */
.card-actions {
  margin-top: 1rem;
  text-align: center;
}

.card-link {
  text-decoration: none;
  /* color: var(--color-secondary);
  font-family: var(--font-body); */
  /* text-decoration: underline; */
}

.card-link:hover {
  color: var(--color-primary);
}
</style>
  