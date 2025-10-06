<script setup>
import ProjectCard from "../components/UI/ProjectCard.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const recipeId = route.query.id; //read ?id= from URL
var recipeInfo = ref({});

const API_KEY = import.meta.env.SPOON_APIKEY;

onMounted(async () => {
    //if there is no id, then redirect to recipes page
    if (!recipeId) {
        router.push({ name: 'Recipes' });
        
    }

    try {
        const response = await axios.get(`http://localhost:4000/api/v1/recipe/specificRecipe`, {
            params: {
                apiKey: API_KEY,
                id: recipeId
            }
        });
        // console.log("Fetched recipe:", response.data);
        recipeInfo.value = response.data;
        console.log("Fetched recipe from recipeInfo:", recipeInfo);
    } catch (err) {
        console.error("Failed to load recipe:", err);
    }
});
</script>

<template>
    <div class="container py-4">
        <h1>Recipe ID: {{ recipeId }}</h1>

            {{ recipeInfo.title }}
    </div>
</template>

<style scoped></style>