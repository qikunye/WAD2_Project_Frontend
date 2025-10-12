<template>
  <!--
      A card component that displays an optional image, title, description,
      tags and an optional link to the project’s source code.  It uses
      classes from main.css for the main card layout and defines scoped
      styles for the tags and link.
    -->
 
<div class="card">
    <!-- Image with fallback -->
    <img
      :src="currentImage"
      :alt="title"
      class="card-image"
      @error="handleImageError"
    />

    <div class="card-gradient"></div>

    <!-- Title -->
    <h3 class="card-title">{{ title }}</h3>

    <!-- Hover overlay -->
    <div class="card-overlay">
      <p class="info prep-time">Time Needed: {{ prepTime }} mins</p>
      <!-- class="info health-score"-> these are static classes — they’re always applied.
      :class="healthScoreColor" → this is a dynamic class that Vue adds on top, based on the computed value. -->
      <p class="info serving-time">Serving(s): {{ servings }}</p>
      <p  v-if="healthScore !== '' && healthScore !== null && healthScore !== undefined" class="info health-score" 
      :class="healthScoreColor" >Health Score: {{ healthScore }} / 100</p>

      <ul v-if="tags && tags.length" class="tags">
        <li v-for="(tag, index) in tags" :key="index" :style="{ transitionDelay: `${0.4 + index * 0.15}s` }">
          #{{ tag }}
        </li>
      </ul>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, computed, defineProps } from "vue";
  // Props for the ProjectCard.  Default values allow it to be used without
  // specifying every field.
  const props =defineProps({
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    healthScore: {
      type: String,
      default: '',
    },
    prepTime: {
      type: String,
      default: '',
    },
    servings: {
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

const fallbackImage = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

//ref to track the actual image being displayed
const currentImage = ref(props.image || fallbackImage);

//runs if image fails to load
const handleImageError = () => {
  currentImage.value = fallbackImage;
};

// Compute dynamic class for color
const healthScoreColor = computed(() => {
  const score = Number(props.healthScore);
  if (isNaN(score)) return '';
  if (score < 50) return 'red-score';
  if (score < 75) return 'yellow-score';
  return 'green-score';
});
  </script>
  

<style scoped>
.card {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.4s ease;
  background: #000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-width: 0px;
}

.card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

/* Image */
.card-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease;
  border-radius: 20px;
  border-width: 0px;
}

/* Darken on hover */
.card:hover .card-image {
  opacity: 0.2;
  border-radius: 20px;
  border-width: 0px;
}

/* Gradient overlay */
.card-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 60%) !important; 
  z-index: 1;
  pointer-events: none;
  border-radius: 20px;
  border-width: 0px;
}

/* Title (always visible) */
.card-title {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  z-index: 2;
  font-size: 1.3rem;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
  transition: opacity 0.4s ease;
}

/* Overlay container (hidden by default) */
.card-overlay {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  opacity: 0;
  transition: opacity 0.5s ease;
  border-radius: 20px;
  border-width: 0px;
}

/* Show overlay on hover */
.card:hover .card-overlay {
  opacity: 1;
  border-radius: 20px;
  border-width: 0px;
}

/* Info items (prep time & health score) */
.info {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.card:hover .prep-time {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.2s;
}

.card:hover .serving-time {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.3s;
}

.card:hover .health-score {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.4s;
}

/* Tags fade in one by one */
.tags {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.tags li {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.3rem 0.7rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

/* Show each tag sequentially */
.card:hover .tags li {
  opacity: 1;
  transform: translateY(0);
}

/* Dynamic color classes for health score */
/* Red for scores below 50 */
.red-score {
  color: #ff4d4d; 
}
/* Yellow for 50–74 */
.yellow-score {
  color: #ffcc00; 
}

/* Green for 75–100 */
.green-score {
  color: #4caf50; 
}
</style>