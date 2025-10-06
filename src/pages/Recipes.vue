<script setup>
import ProjectCard from "../components/UI/ProjectCard.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

//If you have HTML that needs to update depending on a variable value you can use a "reactive reference" with ref(initialValue)
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
    <div class="container py-4">
        <h1 class="text-center mb-4">Random Recipes</h1>

        <div v-if="loading" class="text-center">Loading...</div>
        <div v-else-if="error" class="text-danger text-center">{{ error }}</div>

        <div v-else class="row g-4">
            <div class="col-12 col-md-6 col-xl-4" v-for="recipe in recipes" :key="recipe.id">
                <ProjectCard :title="recipe.title" :image="recipe.image" 
                    @click="$router.push({ name: 'SpecificRecipe', query: { id: recipe.id } })" class="h-100" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>