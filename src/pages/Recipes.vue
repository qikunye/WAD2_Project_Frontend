<script setup>
import ProjectCard from "../components/UI/ProjectCard.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

//If you have HTML that needs to update depending on a variable value you can use a "reactive reference" with ref(initialValue)
const recipes = ref([]);
const loading = ref(true);
const error = ref(null);

// form fields
const searchQuery = ref("");
const selectedCuisine = ref("");
const selectedIntolerances = ref([]);

const cuisines = [
    "African", "Asian", "American", "British", "Cajun", "Caribbean", "Chinese", "Eastern European", "European", "French", "German",
    "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American", "Mediterranean", "Mexican", "Middle Eastern",
    "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"
];

const intolerances = [
    "Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"
];

// Calls backend api to produce random recipes
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

// Calls backend api to filter based on search and filters
const handleSearch = async () => {
    loading.value = true;
    error.value = null;

    try {
        const response = await axios.get("http://localhost:4000/api/v1/recipe/search", {
            params: {
                name: searchQuery.value,
                cuisine: selectedCuisine.value,
                intolerances: selectedIntolerances.value.join(","),
            },
        });

        recipes.value = response.data.results;
        // console.log(response.data.results);
    } catch (err) {
        error.value = "Failed to fetch filtered recipes.";
        console.error(err);
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="container py-4">
        <h1 class="text-center mb-4">Recipe Finder</h1>

        <div class="search-bar-wrapper position-relative z-3 mb-4">
        <!-- Search Filters -->
        <div class="card p-3 mb-4 shadow-sm">
            <div class="row g-3 align-items-end">
                <!-- Search bar -->
                <div class="col-md-4">
                    <label for="searchQuery" class="form-label fw-bold">Search by Name</label>
                    <input v-model="searchQuery" type="text" id="searchQuery" placeholder="e.g. chicken pasta"
                        class="form-control" />
                </div>

                <!-- Cuisine dropdown -->
                <div class="col-md-4">
                    <label for="cuisine" class="form-label fw-bold">Cuisine</label>
                    <select v-model="selectedCuisine" id="cuisine" class="form-select">
                        <option value="">All Cuisines</option>
                        <option v-for="cuisine in cuisines" :key="cuisine" :value="cuisine">{{ cuisine }}</option>
                    </select>
                </div>

                <!-- Intolerances multi-select dropdown -->
                <div class="col-md-4">
                    <label class="form-label fw-bold">Intolerances</label>
                    <div class="dropdown">
                        <button class="btn btn-outline-secondary dropdown-toggle w-100" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            {{ selectedIntolerances.length > 0 ? selectedIntolerances.join(", ") : "Select intolerances "
                            }}
                        </button>
                        <ul class="dropdown-menu p-2" style="max-height: 250px; overflow-y: auto;">
                            <li v-for="item in intolerances" :key="item" class="form-check">
                                <input class="form-check-input" type="checkbox" :id="item" :value="item"
                                    v-model="selectedIntolerances" />
                                <label class="form-check-label" :for="item">{{ item }}</label>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Search button -->
                <div class="col-12 text-end mt-3">
                    <button class="btn btn-primary px-4" @click="handleSearch">
                        Search
                    </button>
                </div>
            </div>
        </div>
        </div>

        <!-- Loading / Error / Results -->
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-else-if="error" class="text-danger text-center">{{ error }}</div>

        <div v-else class="row g-4">
            <div class="col-12 col-md-6 col-xl-4" v-for="recipe in recipes" :key="recipe.id">
                <ProjectCard :title="recipe.title" :image="recipe.image" :tags="recipe.dishTypes"
                    @click="$router.push({ name: 'SpecificRecipe', query: { id: recipe.id } })" class="h-100" />
            </div>
        </div>
    </div>
</template>

<style>
/* In Vue, as in standard CSS, !important is a rule that gives a specific CSS property the highest priority, overriding any other conflicting styles regardless of their specificity, position, or origin */

/* Ensure dropdown opens below the button */
.dropdown-menu.show {
    position: absolute !important;
    top: 100% !important; /* places it right below the button */
    left: 0 !important;
    transform: none !important; /* prevent Bootstrap’s auto positioning */
    margin-top: 4px; /* small spacing */
    z-index: 20 !important; /* ensure above other elements */
}

/* Keep search bar above cards */
.search-bar-wrapper {
    position: relative;
    z-index: 10;
}

/* Prevent clipping of dropdown */
.container,
.row,
.col,
.card {
    overflow: visible !important;
}
</style>