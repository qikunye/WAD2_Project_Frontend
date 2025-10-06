<script setup>
import ProjectCard from "../components/UI/ProjectCard.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
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

function addToMealPlan() {
    if (!userStore.isLoggedIn) {
        // Not logged in, then redirect to login
        router.push({ name: "Login" });
    }
    else{
        //call api backend to add to meal plan and redirect to meal plan vue (Chin Hui Part)
    }
}
</script>

<template>
    <div class="container py-4">
        <h1>{{ recipeInfo.title }}</h1>
        <img :src="recipeInfo.image" alt="Recipe Image" class="img-fluid mb-3" />

        <!-- Add to Meal Plan Button -->
        <button class="btn btn-primary" @click="addToMealPlan">
            Add to Meal Plan
        </button>
    </div>
</template>

<style scoped></style>