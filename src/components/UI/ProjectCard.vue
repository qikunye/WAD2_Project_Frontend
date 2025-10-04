<template>
    <!--
      A card component that displays an optional image, title, description,
      tags and an optional link to the project’s source code.  It uses
      classes from styles.css for the main card layout and defines scoped
      styles for the tags and link.
    -->
    <div class="card">
      <!-- Image slot -->
      <img
        v-if="image"
        :src="image"
        :alt="title"
        class="card-image"
      />
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-desc">{{ description }}</p>
      <!-- Tags -->
      <ul v-if="tags && tags.length" class="card-tags">
        <li v-for="(tag, index) in tags" :key="index">#{{ tag }}</li>
      </ul>
      <!-- Optional link -->
      <div v-if="codeLink" class="card-actions">
        <a :href="codeLink" class="card-link" target="_blank" rel="noopener">View Code</a>
      </div>
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
  /* Image on top of the card */
  .card-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 0.5rem 0.5rem 0 0;
  }
  
  /* Tags list */
  .card-tags {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }
  
  /* Individual tag badge */
  .card-tags li {
    background-color: var(--color-primary);
    color: var(--color-secondary);
    padding: 0.25rem 0.75rem;
    border-radius: 0.5rem;
    font-size: 0.75rem;
  }
  
  /* Container for the optional action */
  .card-actions {
    margin-top: 1rem;
    text-align: center;
  }
  
  /* Link styling */
  .card-link {
    color: var(--color-secondary);
    font-family: var(--font-body);
    text-decoration: underline;
  }
  
  .card-link:hover {
    color: var(--color-primary);
  }
  </style>
  