<script setup>
import ProjectCard from "../components/UI/ProjectCard.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

//ref unwraps automatically unlike js where we access with .value
// {
//             "id": 715415,
//             "title": "Red Lentil Soup with Chicken and Turnips",
//             "image": "https://img.spoonacular.com/recipes/715415-312x231.jpg",
//             "imageType": "jpg"
//         }
const recipes = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
    try {
        const response = await axios.get("http://localhost:4000/api/v1/recipe/random");
        recipes.value = response.data;
    } catch (err) {
        error.value = "Failed to load recipes.";
        console.error(err);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div>
        <h1>Random Recipes</h1>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else class="card-grid">
            <ProjectCard v-for="recipe in recipes" :key="recipe.id" :title="recipe.title" :image="recipe.image"
                :tags="recipe.dishTypes" :codeLink="recipe.sourceUrl" />
        </div>
    </div>
</template>

<style scoped>
</style>