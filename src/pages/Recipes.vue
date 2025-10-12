<script setup>
import ProjectCard from "../components/UI/ProjectCard.vue";
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import Slider from '@vueform/slider'


//If you have HTML that needs to update depending on a variable value you can use a "reactive reference" with ref(initialValue)
const recipes = ref([]);
const loading = ref(true);
const error = ref(null);

//for the single sliders
const carbRange = ref([0, 400]);
const proteinRange = ref([0, 200]);
const caloriesRange = ref([0, 3000]);
const fatRange = ref([0, 200]);

// form fields
const searchQuery = ref("");
const selectedCuisine = ref("");
const selectedIntolerances = ref([]);
const selectedDiets = ref([]);
const selectedIncludedIngredients = ref(""); // must be comma separated 
const selectedExcludedIngredients = ref(""); // must be comma separated 
const selectedSortingOption = ref("");
const selectedSortingDir = ref("");
// single slider for selectedMinCarbs & selectedmaxCarbs
const selectedMinCarbs = computed(() => carbRange.value[0]);
const selectedmaxCarbs = computed(() => carbRange.value[1]);
const selectedminProtein = computed(() => proteinRange.value[0]);
const selectedmaxProtein = computed(() => proteinRange.value[1]);
const selectedminCalories = computed(() => caloriesRange.value[0]);
const selectedmaxCalories = computed(() => caloriesRange.value[1]);
const selectedminFat = computed(() => fatRange.value[0]);
const selectedmaxFat = computed(() => fatRange.value[1]);

const cuisines = [
    "African", "Asian", "American", "British", "Cajun", "Caribbean", "Chinese", "Eastern European", "European", "French", "German",
    "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American", "Mediterranean", "Mexican", "Middle Eastern",
    "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"
];

const intolerances = [
    "Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"
];

const diets = [
    "Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal", "Low FODMAP", "Whole30"
];

const sortOptions = [
    "healthiness", "calories", "total-fat", "carbs", "protein"
]

//Pagination part
const currentPage = ref(1);
const cardsPerPage = 9;

//Getting the total number of pages
//computed() helps track any reactive values inside (e.g. recipes.value), when recipes.value changes due to data fetched from backend, 
// vue automatically recalculates totalPages
const totalPages = computed(() => {
    return Math.ceil(recipes.value.length / cardsPerPage);
});

//Slice recipes for the current page
const paginatedRecipes = computed(() => {
    const start = (currentPage.value - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    return recipes.value.slice(start, end);
});

//Navigate pages
const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll back to top
    }
};


//Calls backend api to produce random recipes
onMounted(async () => {
    try {
        const response = await axios.get("http://localhost:4000/api/v1/recipe/random");
        recipes.value = response.data;
        console.log(response.data);
    } catch (err) {
        error.value = "Failed to load recipes.";
        console.error(err);
    } finally {
        loading.value = false;
    }
});

//Calls backend api to filter based on search and filters
const handleSearch = async () => {
    loading.value = true;
    error.value = null;

    try {

        var params = {
            name: searchQuery.value,
            cuisine: selectedCuisine.value,
            intolerances: selectedIntolerances.value.join(","),
            diet: selectedDiets.value.join(","),
            includedIngredients: selectedIncludedIngredients.value,
            excludedIngredients: selectedExcludedIngredients.value,
            sortBy: selectedSortingOption.value,
            sortDirection: selectedSortingDir.value,
            minCarbs: selectedMinCarbs.value,
            maxCarbs: selectedmaxCarbs.value,
            minProtein: selectedminProtein.value,
            maxProtein: selectedmaxProtein.value,
            minCalories: selectedminCalories.value,
            maxCalories: selectedmaxCalories.value,
            minFat: selectedminFat.value,
            maxFat: selectedmaxFat.value,
        };

        //filtering out those that are empty
        for (let p in params) {
            if (params[p] === "" || params[p] === null || params[p] === undefined) {
                delete params[p];
            }
        }

        const response = await axios.get("http://localhost:4000/api/v1/recipe/search", {
            params,
        });

        recipes.value = response.data.results;
        console.log(response.data.results);
        // console.log(response.data.results);
    } catch (err) {
        error.value = "Failed to fetch filtered recipes.";
        console.error(err);
    } finally {
        loading.value = false;
    }
};

//reset filters values
const resetFilters = () => {
    selectedCuisine.value = "";
    selectedDiets.value = [];
    selectedIntolerances.value = [];
    selectedIncludedIngredients.value = "";
    selectedExcludedIngredients.value = "";
    selectedSortingOption.value = "";
    selectedSortingDir.value = "";
    selectedMinCarbs.value = "";
    selectedmaxCarbs.value = "";
    selectedminProtein.value = "";
    selectedmaxProtein.value = "";
    selectedminCalories.value = "";
    selectedmaxCalories.value = "";
    selectedminFat.value = "";
    selectedmaxFat.value = "";
    handleSearch();
}
</script>

<template>
    <div class="container-fluid py-4">
        <h1 class="text-center mb-4">Recipe Finder</h1>

        <!-- Top Search Bar + Search Button -->
        <div class="row mb-4 align-items-center g-2">
            <div class="col-12 col-md-10">
                <div class="card p-2 shadow-sm">
                    <input v-model="searchQuery" type="text" id="searchQuery"
                        placeholder="Search by name e.g. chicken pasta" class="form-control border-0" />
                </div>
            </div>
            <div class="col-12 col-md-2">
                <button class="btn btn-primary w-100 h-100" @click="handleSearch">
                    Search
                </button>
            </div>
        </div>

        <!-- Advanced Filters (Left) + Recipe Cards (Right) -->
        <div class="row g-4">
            <!-- LEFT: Advanced Filters -->
            <div class="col-12 col-lg-4 col-xl-3 col-xxl-3">
                <div class="card p-3 shadow-sm">
                    <h3 class="text-start">Advanced Filter</h3>
                    <!-- Cuisine dropdown -->
                    <div class="mb-3 text-start">
                        <label for="cuisine" class="form-label fw-bold">Cuisine</label>
                        <select v-model="selectedCuisine" id="cuisine" class="form-select">
                            <option value="">All Cuisines</option>
                            <option v-for="cuisine in cuisines" :key="cuisine" :value="cuisine">
                                {{ cuisine }}
                            </option>
                        </select>
                    </div>

                    <!-- Diet checkboxes in 2 columns -->
                    <div class="mb-3 text-start">
                        <label class="form-label fw-bold">Diet</label>
                        <div class="row">
                            <div class="col-6" v-for="diet in diets" :key="diet">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" :id="diet" :value="diet"
                                        v-model="selectedDiets" />
                                    <label class="form-check-label" :for="diet">{{ diet }}</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Intolerances checkboxes in 2 columns -->
                    <div class="mb-3 text-start">
                        <label class="form-label fw-bold">Intolerances</label>
                        <div class="row">
                            <div class="col-6" v-for="item in intolerances" :key="item">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" :id="item" :value="item"
                                        v-model="selectedIntolerances" />
                                    <label class="form-check-label" :for="item">{{ item }}</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Include ingredients -->
                    <div class="mb-3 text-start">
                        <label for="includeIng" class="form-label fw-bold">Include Ingredients</label>
                        <input v-model="selectedIncludedIngredients" type="text" id="includeIng"
                            placeholder="e.g. chicken, garlic, tomato" class="form-control" />
                        <small class="text-muted">Separate ingredients with commas.</small>
                    </div>

                    <!-- Exclude ingredients -->
                    <div class="mb-3 text-start">
                        <label for="excludeIng" class="form-label fw-bold">Exclude Ingredients</label>
                        <input v-model="selectedExcludedIngredients" type="text" id="excludeIng"
                            placeholder="e.g. nuts, shrimp" class="form-control" />
                        <small class="text-muted">Separate ingredients with commas.</small>
                    </div>

                    <!-- Sorting options -->
                    <div class="mb-3 text-start">
                        <label class="form-label fw-bold">Sort By</label>
                        <div class="d-flex gap-2">
                            <select v-model="selectedSortingOption" class="form-select">
                                <option value="">None</option>
                                <option v-for="opt in sortOptions" :key="opt" :value="opt">
                                    {{ opt }}
                                </option>
                            </select>
                            <select v-model="selectedSortingDir" class="form-select">
                                <option value="">Direction</option>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                    </div>

                    <!-- Nutrient sliders -->
                    <div class="mb-3 text-start">
                        <label class="form-label fw-bold" style="padding-bottom: 35px;">Carbs (g)</label>
                        <Slider v-model="carbRange" :min="0" :max="400" />
                        <div class="d-flex justify-content-between small text-muted mt-2">
                            <span>Min: {{ carbRange[0] }}</span>
                            <span>Max: {{ carbRange[1] }}</span>
                        </div>
                    </div>

                    <div class="mb-3 text-start">
                        <label class="form-label fw-bold" style="padding-bottom: 35px;">Protein (g)</label>
                        <Slider v-model="proteinRange" :min="0" :max="200" />
                        <div class="d-flex justify-content-between small text-muted">
                            <span>Min: {{ proteinRange[0] }}</span>
                            <span>Max: {{ proteinRange[1] }}</span>
                        </div>
                    </div>

                    <div class="mb-3 text-start">
                        <label class="form-label fw-bold" style="padding-bottom: 35px;">Calories (kcal)</label>
                        <Slider v-model="caloriesRange" :min="0" :max="3000" />
                        <div class="d-flex justify-content-between small text-muted">
                            <span>Min: {{ caloriesRange[0] }}</span>
                            <span>Max: {{ caloriesRange[1] }}</span>
                        </div>
                    </div>

                    <div class="mb-3 text-start">
                        <label class="form-label fw-bold" style="padding-bottom: 35px;">Fat (g)</label>
                        <Slider v-model="fatRange" :min="0" :max="200" />
                        <div class="d-flex justify-content-between small text-muted">
                            <span>Min: {{ fatRange[0] }}</span>
                            <span>Max: {{ fatRange[1] }}</span>
                        </div>
                    </div>

                    <!-- Buttons -->
                    <div class="d-flex gap-2 mt-4">
                        <button class="btn btn-success flex-fill" @click="handleSearch">
                            Apply Filters
                        </button>
                        <button class="btn btn-outline-secondary flex-fill" @click="resetFilters">
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            <!-- RIGHT: Recipe Cards -->
            <div class="col-12 col-lg-8 col-xl-9 col-xxl-9">
                <div v-if="loading" class="text-center">Loading...</div>
                <div v-else-if="error" class="text-danger text-center">{{ error }}</div>

                <div v-else class="row g-4">
                    <div class="col-12 col-sm-6 col-md-4 col-lg-6 col-xl-4" v-for="recipe in paginatedRecipes"
                        :key="recipe.id">
                        <ProjectCard :title="recipe.title" :image="recipe.image" :tags="recipe.dishTypes"
                            :prepTime="recipe.readyInMinutes" :servings="recipe.servings" :healthScore="recipe.healthScore"
                            @click="$router.push({ name: 'SpecificRecipe', query: { id: recipe.id } })" />
                    </div>
                </div>
                <!-- Pagination Controls -->
            <div v-if="totalPages > 1" class="d-flex justify-content-center align-items-center mt-4">
                <nav>
                    <ul class="pagination mb-0">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <button class="page-link" @click="goToPage(currentPage - 1)">Previous</button>
                        </li>

                        <li v-for="page in totalPages" :key="page" class="page-item"
                            :class="{ active: page === currentPage }">
                            <button class="page-link" @click="goToPage(page)">{{ page }}</button>
                        </li>

                        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                            <button class="page-link" @click="goToPage(currentPage + 1)">Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
            </div>
            
        </div>
    </div>
</template>

<style>
/* In Vue, as in standard CSS, !important is a rule that gives a specific CSS property the highest priority, overriding any other conflicting styles regardless of their specificity, position, or origin */

body {
    background-color: white !important;
}

/* Keep dropdown menu properly positioned */
.dropdown-menu.show {
    position: absolute !important;
    top: 100% !important;
    left: 0 !important;
    transform: none !important;
    margin-top: 4px;
    z-index: 20 !important;
}

/* Prevent clipping of dropdown */
.container,
.row,
.col,
.card {
    overflow: visible !important;
}

.card {
    overflow-y: auto;
}

.form-label {
    font-size: 0.9rem;
}

input[type="range"] {
    cursor: pointer;
}

/* Ensure everything is left-aligned */
.card .form-label,
.card .form-check-label {
    text-align: left;
}

/* Make checkboxes line up nicely */
.form-check {
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.form-check-input {
    margin-top: 0;
}

.pagination {
    gap: 4px;
}

.page-link {
    border-radius: 8px !important;
    color: #333;
}

.page-item.active .page-link {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
}
</style>