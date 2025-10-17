<script setup>
import ProjectCard from "../components/UI/ProjectCard.vue";
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
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
const cardsPerPage = ref(20);

//updating cardsPerPage based on page size 
const updateCardsPerPage = () => {
    const width = window.innerWidth;

    if (width >= 1700) {
        // 4 cards per row × 5 rows
        cardsPerPage.value = 20;
    } else if (width >= 1200) {
        // 3 cards per row × 5 rows
        cardsPerPage.value = 15;
    } else if (width >= 990) {
        // 3 cards per row × 5 rows
        cardsPerPage.value = 15;
    } else {
        // Below 990px: show everything (no pagination)
        cardsPerPage.value = recipes.value.length;
    }
};

//Getting the total number of pages
//computed() helps track any reactive values inside (e.g. recipes.value), when recipes.value changes due to data fetched from backend, 
// vue automatically recalculates totalPages
const totalPages = computed(() => {
    return Math.ceil(recipes.value.length / cardsPerPage.value);
});

//Slice recipes for the current page
const paginatedRecipes = computed(() => {
    const start = (currentPage.value - 1) * cardsPerPage.value;
    const end = start + cardsPerPage.value;
    return recipes.value.slice(start, end);
});

//Navigate pages
const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll back to top
    }
};

//onMounted is like on page load
//Calls backend api to produce random recipes
onMounted(async () => {
    try {
        const response = await axios.get("http://localhost:4000/api/v1/recipe/random");
        recipes.value = response.data;
        console.log(response.data);
        updateCardsPerPage();
        window.addEventListener('resize', updateCardsPerPage);
        //every 50ms it will run the updateCardsPerPage for pagination 
        setTimeout(updateCardsPerPage, 50);
    } catch (err) {
        error.value = "Failed to load recipes.";
        console.error(err);
    } finally {
        loading.value = false;
    }
});

onUnmounted(() => {
    window.removeEventListener('resize', updateCardsPerPage);
});

//check if theres any results
watch(recipes, (newVal) => {
    if (newVal.length === 0) {
        error.value = "No results available.";
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
    <div class="container-fluid">
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="hero-content">
                <h1 class="hero-title">DISCOVER</h1>
                <h2 class="hero-subtitle">RECIPES</h2>
            </div>

            <!-- Floating Icons -->
            <div class="floating-icons">
                <div class="icon icon1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1c1456"
                        stroke-linecap="round" stroke-linejoin="round" id="Chef-Hat--Streamline-Tabler" height="24"
                        width="24">
                        <desc>
                            Chef Hat Streamline Icon: https://streamlinehq.com
                        </desc>
                        <path
                            d="M12 3c1.918 0 3.52 1.35 3.91 3.151A4 4 0 0 1 18 13.874L18 21H6v-7.126a4 4 0 1 1 2.092 -7.723A4 4 0 0 1 12 3z"
                            stroke-width="2"></path>
                        <path d="M6.161 17.009 18 17" stroke-width="2"></path>
                    </svg>
                </div>
                <div class="icon icon2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ffffff"
                        stroke-linecap="round" stroke-linejoin="round" id="Apple--Streamline-Lucide" height="24"
                        width="24">
                        <desc>
                            Apple Streamline Icon: https://streamlinehq.com
                        </desc>
                        <path
                            d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6 -8 6 -12.22A4.91 4.91 0 0 0 17 5c-2.22 0 -4 1.44 -5 2 -1 -0.56 -2.78 -2 -5 -2a4.9 4.9 0 0 0 -5 4.78C2 14 5 22 8 22c1.25 0 2.5 -1.06 4 -1.06Z"
                            stroke-width="2"></path>
                        <path d="M10 2c1 0.5 2 2 2 5" stroke-width="2"></path>
                    </svg>
                </div>
                <div class="icon icon3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        id="Food-Delivery-Find-Restuarant--Streamline-Ultimate" height="24" width="24">
                        <desc>
                            Food Delivery Find Restuarant Streamline Icon: https://streamlinehq.com
                        </desc>
                        <g>
                            <path
                                d="m23.66 22.24 -5 -5a10.52 10.52 0 1 0 -1.41 1.41l5 5a1 1 0 0 0 1.42 0 1 1 0 0 0 -0.01 -1.41ZM2.05 10.57a8.52 8.52 0 1 1 8.52 8.52 8.53 8.53 0 0 1 -8.52 -8.52Z"
                                fill="#ffffff" stroke-width="1"></path>
                            <path
                                d="M7.27 5.22a3 3 0 0 0 -2.67 3.2 3.18 3.18 0 0 0 1.92 3.07v3.61a0.75 0.75 0 0 0 1.5 0v-3.61A3.17 3.17 0 0 0 10 8.42a3 3 0 0 0 -2.73 -3.2Z"
                                fill="#ffffff" stroke-width="1"></path>
                            <path
                                d="M15.72 5.22A0.74 0.74 0 0 0 15 6v3.4c0 0.18 -0.22 0.41 -0.58 0.55V6a0.75 0.75 0 1 0 -1.5 0v4c-0.37 -0.14 -0.59 -0.37 -0.59 -0.55V6a0.75 0.75 0 1 0 -1.5 0v3.4a2.34 2.34 0 0 0 2.09 2.11v3.59a0.75 0.75 0 1 0 1.5 0v-3.59a2.34 2.34 0 0 0 2.05 -2.11V6a0.75 0.75 0 0 0 -0.75 -0.78Z"
                                fill="#ffffff" stroke-width="1"></path>
                        </g>
                    </svg>
                </div>
                <div class="icon icon4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000"
                        stroke-linecap="round" stroke-linejoin="round" id="Book--Streamline-Tabler" height="24"
                        width="24">
                        <desc>
                            Book Streamline Icon: https://streamlinehq.com
                        </desc>
                        <path d="M3 19a9 9 0 0 1 9 0 9 9 0 0 1 9 0" stroke-width="2"></path>
                        <path d="M3 6a9 9 0 0 1 9 0 9 9 0 0 1 9 0" stroke-width="2"></path>
                        <path d="m3 6 0 13" stroke-width="2"></path>
                        <path d="m12 6 0 13" stroke-width="2"></path>
                        <path d="m21 6 0 13" stroke-width="2"></path>
                    </svg>
                </div>
            </div>

            <!-- Curved White Background -->
            <div class="hero-curve"></div>
        </section>

        <!-- if page is loading show this  -->
        <div v-if="loading" class="content-section container-fluid">
            <div class="spinner"></div>
            <h5 class="text-center">Loading... Please wait.</h5>
            <div v-if="error" class="text-danger text-center">{{ error }}</div>
        </div>
        <!-- if page is done loading recipes  -->
        <div v-else class="content-section container-fluid">
            <!-- Top Search Bar + Search Button -->
            <div class="search-bar-box">
                <div class="search-box">

                    <input v-model="searchQuery" type="text" id="searchQuery"
                        placeholder="Search recipes by name (e.g. pasta)" class="search-input" />
                    <button class="search-btn" @click="handleSearch">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
                            <g id="Search">
                                <path id="Union" fill="#ffffff"
                                    d="M11 2c4.9706 0 9 4.02944 9 9 0 2.125 -0.7381 4.0766 -1.9697 5.6162l4.1767 4.1768 -1.414 1.414 -4.1768 -4.1767C15.0766 19.2619 13.125 20 11 20c-4.97056 0 -9 -4.0294 -9 -9 0 -4.97056 4.02944 -9 9 -9m0 2c-3.86599 0 -7 3.13401 -7 7 0 3.866 3.13401 7 7 7 3.866 0 7 -3.134 7 -7 0 -3.86599 -3.134 -7 -7 -7"
                                    stroke-width="1"></path>
                            </g>
                        </svg>
                        <span style="font-size: 15px;"> Search</span>
                    </button>
                </div>
            </div>

            <!-- Advanced Filters (Left) + Recipe Cards (Right) -->
            <div class="row g-4">
                <!-- LEFT: Advanced Filters -->
                <div class="col-12 col-lg-4 col-xl-3 col-xxl-3">
                    <div class="advanced-filter-card shadow-sm p-4">
                        <h5 class="filter-heading">Advanced Filters</h5>
                        <hr class="filter-divider" />

                        <!-- Cuisine dropdown -->
                        <div class="filter-group">
                            <label for="cuisine" class="filter-label">Cuisine</label>
                            <select v-model="selectedCuisine" id="cuisine" class="filter-select">
                                <option value="">All</option>
                                <option v-for="cuisine in cuisines" :key="cuisine" :value="cuisine">
                                    {{ cuisine }}
                                </option>
                            </select>
                        </div>

                        <!-- Diet checkboxes in 2 columns -->
                        <div class="filter-group">
                            <label class="filter-label">Diet Preferences</label>
                            <div class="filter-box">
                                <div class="" v-for="diet in diets" :key="diet">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" :id="diet" :value="diet"
                                            v-model="selectedDiets" />
                                        <label class="form-check-label" :for="diet">{{ diet }}</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Intolerances checkboxes in 2 columns -->
                        <div class="filter-group">
                            <label class="filter-label">Intolerances</label>
                            <div class="filter-box">
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
                        </div>

                        <!-- Include ingredients -->
                        <div class="filter-group">
                            <label for="includeIng" class="filter-label">Include Ingredients</label>
                            <input v-model="selectedIncludedIngredients" type="text" id="includeIng"
                                placeholder="(e.g. beef,chicken)" class="filter-input" />
                        </div>

                        <!-- Exclude ingredients -->
                        <div class="filter-group">
                            <label for="excludeIng" class="filter-label">Exclude Ingredients</label>
                            <input v-model="selectedExcludedIngredients" type="text" id="excludeIng"
                                placeholder="(e.g. peanut,almonds)" class="filter-input" />
                        </div>

                        <!-- Sorting options -->
                        <div class="filter-group">
                            <label class="filter-label">Sort By</label>
                            <div class="d-flex gap-2">
                                <select v-model="selectedSortingOption" class="filter-select">
                                    <option value="">None</option>
                                    <option v-for="opt in sortOptions" :key="opt" :value="opt">
                                        {{ opt }}
                                    </option>
                                </select>
                                <select v-model="selectedSortingDir" class="filter-select">
                                    <option value="">Direction</option>
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                            </div>
                        </div>

                        <!-- Nutrient sliders -->
                        <div class="filter-group">
                            <label class="filter-label">Nutrition Filters</label>
                            <hr class="filter-sub-divider" />

                            <label class="filter-label-small pb-5">Carbs (g)</label>
                            <Slider v-model="carbRange" :min="0" :max="400" />
                            <div class="d-flex justify-content-between small text-muted mt-1">
                                <span>{{ carbRange[0] }}g</span>
                                <span>{{ carbRange[1] }}g</span>
                            </div>

                            <label class="filter-label-small mt-3 pb-5">Protein (g)</label>
                            <Slider v-model="proteinRange" :min="0" :max="200" />
                            <div class="d-flex justify-content-between small text-muted mt-1">
                                <span>{{ proteinRange[0] }}g</span>
                                <span>{{ proteinRange[1] }}g</span>
                            </div>

                            <label class="filter-label-small mt-3 pb-5">Calories (kcal)</label>
                            <Slider v-model="caloriesRange" :min="0" :max="3000" />
                            <div class="d-flex justify-content-between small text-muted mt-1">
                                <span>{{ caloriesRange[0] }}</span>
                                <span>{{ caloriesRange[1] }}</span>
                            </div>

                            <label class="filter-label-small mt-3 pb-5">Fat (g)</label>
                            <Slider v-model="fatRange" :min="0" :max="200" />
                            <div class="d-flex justify-content-between small text-muted mt-1">
                                <span>{{ fatRange[0] }}g</span>
                                <span>{{ fatRange[1] }}g</span>
                            </div>
                        </div>

                        <!-- Buttons -->
                        <div class="d-flex flex-column gap-2 mt-4">
                            <button class="btn apply-btn" @click="handleSearch">✔ Apply Filters</button>
                            <button class="btn reset-btn" @click="resetFilters">↺ Reset Filters</button>
                        </div>
                    </div>
                </div>

                <!-- RIGHT: Recipe Cards -->
                <div class="col-12 col-lg-8 col-xl-9 col-xxl-9" style="margin-top:50px">
                    <div v-if="loading" class="text-center">Loading...</div>
                    <div v-else-if="error" class="text-danger text-center">{{ error }}</div>

                    <div v-else class="row g-4">
                        <div class="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 recipe-col"
                            v-for="recipe in paginatedRecipes" :key="recipe.id">
                            <ProjectCard :title="recipe.title" :image="recipe.image" :tags="recipe.dishTypes"
                                :prepTime="recipe.readyInMinutes" :servings="recipe.servings"
                                :healthScore="recipe.healthScore"
                                @click="$router.push({ name: 'SpecificRecipe', query: { id: recipe.id } })" />
                        </div>
                    </div>
                    <!-- Pagination Controls -->
                    <div v-if="totalPages > 1 && cardsPerPage < recipes.length"
                        class="d-flex justify-content-center align-items-center mt-4">
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
    </div>

</template>

<style>
/* In Vue, as in standard CSS, !important is a rule that gives a specific CSS property the highest priority, overriding any other conflicting styles regardless of their specificity, position, or origin */

/* adjust the number of ProjectCards per row  */
@media (min-width: 1700px) {
    .recipe-col {
        flex: 0 0 25%;
        max-width: 25%;
    }
}

@media (max-width: 767px) {
    .recipe-col {
        flex: 0 0 100%;
        max-width: 100%;
    }
}

body {
    background-color: white !important;
}

/* ===== Hero Section ===== */
.hero-section {
    position: relative;
    background: #e7e7e7;
    text-align: center;
    margin-top: 0;
    /* remove spacing above */
    padding-top: 6rem;
    /* control spacing with padding instead */
    padding-bottom: 140px;
    overflow: hidden;
    width: 99.5vw;
    /* full viewport width */
    margin-left: calc(50% - 50vw);
    /* remove container margins */
}

/* Title */
.hero-title {
    color: #1c1456;
    font-weight: 900;
    font-size: 6rem;
    letter-spacing: 2px;
    margin: 0;
    top: 65px;
    z-index: 2;
    position: relative;
}

/* Subtitle with gradient */
.hero-subtitle {
    font-weight: 900;
    font-size: 5rem;
    background: linear-gradient(to right, #ea5b2f, #f4b6c2, #e64a19);
    /* standard */
    background-clip: text;
    /* Safari / Chrome fallback */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 0.2rem;
    position: relative;
    top: 65px;
    z-index: 2;
}

/* Floating icons */
.floating-icons {
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    width: 100%;
    height: 100px;
    pointer-events: none;
}

.icon {
    position: absolute;
    background: #f4b6c2;
    border-radius: 50%;
    padding: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.icon svg {
    width: 28px;
    height: 28px;
}

/* Individual icon positions */
.icon1 {
    left: 10%;
    top: 90%;
}

.icon2 {
    left: 30%;
    top: 40%;
    background: #e64a19;
}

.icon3 {
    right: 12%;
    top: 65%;
    background: #e64a19;
}

.icon4 {
    right: 30%;
    top: 40%;
    background: #f4b6c2;
    font-size: 24px;
    color: #1c1456;
    font-weight: bold;
}

/* Curve at the bottom */
.hero-curve {
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100vw;
    height: 180px;
    background: white;
    border-top-left-radius: 100% 50px;
    border-top-right-radius: 100% 50px;
    z-index: 1;
    left: 0;
    margin: 0;
}

@keyframes floaty {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-10px);
    }

    100% {
        transform: translateY(0px);
    }
}

.icon {
    animation: floaty 4s ease-in-out infinite;
}

.icon2 {
    animation-delay: 0.5s;
}

.icon3 {
    animation-delay: 1s;
}

.icon4 {
    animation-delay: 1.5s;
}

/* loading portion */
.content-section {
  width: 100%;           /* full viewport width */
  padding-left: 2rem;
  padding-right: 2rem;
  box-sizing: border-box;
}

.spinner {
    width: 48px;
    height: 48px;
    border: 5px solid #e0e0e0;
    border-top-color: #3490dc;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.error {
    color: #dc2626;
    margin-top: 0.5rem;
    text-align: center;
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

/* ===== Advanced Filter Panel ===== */
.advanced-filter-card {
    background: #fafafa !important;
    border: none !important;
    box-shadow: none !important;
    padding: 1.5rem;
    font-family: "Poppins", sans-serif;
}

/* Section Heading */
.advanced-filter-card h3,
.filter-heading {
    font-weight: 600;
    color: #1c1456;
    text-align: left;
    font-family: var(--font-heading2);
    margin-bottom: 0.5rem;
}

.filter-divider {
    border: none;
    height: 1px;
    background: #dcdcdc;
    margin: 0.5rem 0 1.5rem;
}

/* ===== Group Containers ===== */
.filter-group {
    background: #f6f6f6;
    border: 1px solid #e5e5e5;
    border-radius: 12px;
    padding: 1rem 1.25rem;
    margin-bottom: 1rem;
    text-align: left;
}

/* ===== Labels ===== */
.filter-label,
.form-label {
    display: block;
    font-family: var(--font-heading2);
    font-weight: 600;
    color: #1c1456;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    text-align: left;
}

/* ===== Inputs & Selects ===== */
.filter-input,
.filter-select,
.form-control,
.form-select {
    width: 100%;
    border: 1px solid #d4d4d4;
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
    color: #1c1456;
    background: #fff;
    transition: all 0.2s ease;
}

.filter-input::placeholder,
.form-control::placeholder {
    color: #a0a0b0;
}

.filter-input:focus,
.form-control:focus,
.filter-select:focus,
.form-select:focus {
    border-color: #f4b6c2;
    box-shadow: 0 0 0 3px rgba(244, 182, 194, 0.3);
    outline: none;
}

/* ===== Checkboxes ===== */
.form-check {
    text-align: left;
}

.form-check-input {
    border-color: #bcbcd2;
    cursor: pointer;
}

.form-check-input:checked {
    background-color: #1c1456;
    border-color: #1c1456;
}

.form-check-label {
    color: #1c1456;
    font-weight: 500;
}

/* ===== Sliders Section ===== */
.filter-sub-divider {
    border: none;
    height: 1px;
    background: #ddd;
    margin: 0.75rem 0;
}

.filter-label-small {
    font-weight: 600;
    font-size: 0.85rem;
    color: #1c1456;
    margin-top: 0.5rem;
    display: block;
    text-align: left;
}

/* ===== Buttons ===== */
.btn {
    border-radius: 10px;
    font-weight: 600;
    padding: 0.6rem 0;
}

.apply-btn,
.btn-success {
    background: #1c1456 !important;
    color: #fff !important;
    border: none;
    transition: background 0.2s ease;
}

.apply-btn:hover,
.btn-success:hover {
    background: #2a1e7d !important;
}

.reset-btn,
.btn-outline-secondary {
    background: #f7f7f7;
    color: #1c1456 !important;
    border: 1px solid #dcdbe2;
}

.reset-btn:hover,
.btn-outline-secondary:hover {
    background: #ebe9f1;
}

/* ===== Text Alignment Consistency ===== */
.filter-group * {
    text-align: left !important;
}


/* ===== Pagination ===== */
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    border-radius: 16px;
    padding: 0.4rem 0.6rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    gap: 4px;
    border: 1px solid #eee;
}

/* Each page item (numbers + arrows) */
.page-item {
    list-style: none;
}

/* The clickable button */
.page-link {
    background: transparent;
    border: none;
    color: #999;
    font-weight: 600;
    font-size: 1rem;
    border-radius: 10px;
    padding: 0.5rem 0.9rem;
    transition: all 0.2s ease;
}

/* Hover: light grey highlight */
.page-link:hover {
    background-color: #f6f6f6;
    color: #555;
}

/* Active page */
.page-item.active .page-link {
    background: transparent;
    color: #e64a19;
    font-weight: 700;
}

/* Disabled arrows */
.page-item.disabled .page-link {
    opacity: 0.4;
    cursor: not-allowed;
}

/* Arrows (Previous/Next) styling */
.page-link svg,
.page-link i {
    font-size: 1.2rem;
    vertical-align: middle;
}

/* Optional: remove blue focus outline on click */
.page-link:focus {
    outline: none;
    box-shadow: none;
}

/* === Search box === */
.search-bar-box {
    width: 100% !important;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    padding: 1rem 0;
    background-color: #fafafa;
}

.search-box {
    display: flex;
    align-items: center;
    background: #fff;
    border: 1.5px solid #ddd;
    border-radius: 14px;
    padding: 0.5rem 0.75rem;
    max-width: 98%;
    margin: 1rem auto;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
    transition: all 0.25s ease;
}

/* Focus glow when clicking input */
.search-box:focus-within {
    border-color: #f4b6c2;
    box-shadow: 0 0 0 4px rgba(244, 182, 194, 0.4);
}

/* === Icon === */
.search-icon {
    font-size: 1.2rem;
    color: #1c1456;
    margin-right: 0.75rem;
    flex-shrink: 0;
}

/* === Input === */
.search-input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    color: #333;
    font-family: var(--font-body, "Poppins", sans-serif);
}

.search-input::placeholder {
    color: #aaa;
    font-weight: 400;
}

/* === Button === */
.search-btn {
    background-color: #1c1456;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 0.4rem 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-left: 0.75rem;
    transition: background 0.2s ease, transform 0.2s ease;
    white-space: nowrap;
}

.search-btn:hover {
    background-color: #2a1e7d;
    transform: translateY(-1px);
}

.search-btn i {
    font-size: 0.95rem;
}
</style>