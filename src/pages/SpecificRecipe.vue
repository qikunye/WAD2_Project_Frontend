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

//get specific recipe details
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
    else {
        //call api backend to add to meal plan and redirect to meal plan vue (Chin Hui Part)
    }
}
</script>

<template>
    <div class="page-bg">
        <div class="center-fade"></div>
        <div class="container py-4" v-if="recipeInfo.id">
            <!-- Top Section -->
            <div class="row g-4 mb-4">
                <!-- Image -->
                <div class="col-12 col-lg-7">
                    <div class="border-0 shadow-sm overflow-hidden rounded-4">
                        <img :src="recipeInfo.image" :alt="recipeInfo.title"
                            class="img-fluid w-100 h-100 object-fit-cover" />
                    </div>
                </div>

                <!-- Info -->
                <div class="col-12 col-lg-5 d-flex flex-column justify-content-between">
                    <div>
                        <h2 class="fw-bold mb-2 title">{{ recipeInfo.title }}</h2>

                        <!-- Diet & DishType Tags -->
                        <div class="mb-3 d-flex flex-wrap gap-2">
                            <span v-for="diet in recipeInfo.diets" :key="diet" class="badge rounded-pill diet-tag">
                                {{ diet }}
                            </span>
                            <span v-for="dish in recipeInfo.dishTypes" :key="dish" class="badge rounded-pill dish-tag">
                                {{ dish }}
                            </span>
                        </div>

                        <!-- Ready Time & Servings -->
                        <div class="d-flex flex-wrap gap-3 mb-4">
                            <!-- Ready In -->
                            <div class="info-box glass purple-box">
                                <div class="icon-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-clock">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                </div>
                                <div class="info-text">
                                    <small>Ready In</small>
                                    <div class="info-value">{{ recipeInfo.readyInMinutes }} mins</div>
                                </div>
                            </div>

                            <!-- Servings -->
                            <div class="info-box glass pink-box">
                                <div class="icon-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-users">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>
                                <div class="info-text">
                                    <small>Servings</small>
                                    <div class="info-value">{{ recipeInfo.servings }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Add to Meal Plan Button -->
                    <button class="btn btn-lg rounded-3 w-100 btn-mealplan" @click="addToMealPlan">
                        <svg style="" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                            viewBox="0 0 16 16">
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 
                        2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 
                        5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5H1z" />
                        </svg>
                        Add to Meal Plan
                    </button>
                </div>
            </div>

            <!-- Summary -->
            <div class="recipe-summary-card p-4 mb-4">
                <div class="summary-header d-flex align-items-center mb-3">
                    <div class="icon-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" class="chef-hat-icon" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            id="Chef-Hat--Streamline-Tabler" height="24" width="24">
                            <desc>
                                Chef Hat Streamline Icon: https://streamlinehq.com
                            </desc>
                            <path
                                d="M12 3c1.918 0 3.52 1.35 3.91 3.151A4 4 0 0 1 18 13.874L18 21H6v-7.126a4 4 0 1 1 2.092 -7.723A4 4 0 0 1 12 3z"
                                stroke-width="2"></path>
                            <path d="M6.161 17.009 18 17" stroke-width="2"></path>
                        </svg>
                    </div>
                    <h5 class="summary-title mb-0 ms-3">About This Recipe</h5>
                </div>

                <p v-html="recipeInfo.summary" class="summary-text mb-0 px-4 pb-4"></p>
            </div>

            <!-- Ingredients & Instructions -->
            <div class="row g-4">
                <!-- Ingredients -->
                <div class="col-12 col-lg-5">
                    <div class="card ingredients-card border-0 shadow-sm p-3 h-100">
                        <div class="card-header-custom mb-3">
                            <div class="icon-circle-ingredient">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000"
                                    stroke-linecap="round" stroke-linejoin="round" id="Salad--Streamline-Tabler"
                                    height="24" width="24">
                                    <desc>
                                        Salad Streamline Icon: https://streamlinehq.com
                                    </desc>
                                    <path
                                        d="M4 11h16a1 1 0 0 1 1 1v0.5c0 1.5 -2.517 5.573 -4 6.5v1a1 1 0 0 1 -1 1H8a1 1 0 0 1 -1 -1v-1c-1.687 -1.054 -4 -5 -4 -6.5V12a1 1 0 0 1 1 -1z"
                                        stroke-width="2"></path>
                                    <path
                                        d="M18.5 11c0.351 -1.017 0.426 -2.236 0.5 -3.714V6h-2.256c-2.83 0 -4.616 0.804 -5.64 2.076"
                                        stroke-width="2"></path>
                                    <path
                                        d="M5.255 11.008A12.204 12.204 0 0 1 5 9V8h1.755c0.98 0 1.801 0.124 2.479 0.35"
                                        stroke-width="2"></path>
                                    <path d="m8 8 1 -4 4 2.5" stroke-width="2"></path>
                                    <path d="M13 11v-0.5a2.5 2.5 0 1 0 -5 0v0.5" stroke-width="2"></path>
                                </svg>
                            </div>
                            <h5 class="fw-bold mb-0 ms-3" style="font-family: var(--font-body);">Ingredients</h5>
                        </div>

                        <ul class="ingredients-list">
                            <li v-for="(ingredient, index) in recipeInfo.extendedIngredients" :key="index"
                                class="border-0 px-0 py-2">
                                <span>{{ ingredient.original }}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Instructions -->
                <div class="col-12 col-lg-7">
                    <div class="card instructions-card border-0 shadow-sm p-3 h-100">
                        <div class="card-header-custom mb-3">
                            <div class="icon-circle-instruction">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000"
                                    stroke-linecap="round" stroke-linejoin="round" id="Book--Streamline-Tabler"
                                    height="24" width="24">
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
                            <h5 class="fw-bold mb-0 ms-3 text-left"  style="font-family: var(--font-body);">Instructions</h5>
                        </div>

                        <ol class="ps-3 instructions-list">
                            <li v-for="(step, index) in recipeInfo.analyzedInstructions[0].steps" :key="index"
                                class="instruction-step mb-3 ">
                                <span class="step-number">{{ index + 1 }}</span>
                                <span>{{ step.step }}</span>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>

            <!-- Original Source -->
            <div class="card source-card p-3 mt-4 d-flex flex-row align-items-center justify-content-between">

                <!-- Left: Icon + Text -->
                <div class="d-flex align-items-center flex-grow-1">
                    <div class="icon-circle-source me-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" height="24" width="24">
                            <path d="M4 4h16v16H4z" />
                            <path d="M4 9h16" />
                            <path d="M9 4v16" />
                        </svg>
                    </div>
                    <div class="source-text text-start" style="padding-left:10px;">
                        <small class="text-muted d-block">Recipe from</small>
                        <div class="fw-bold fs-4">{{ recipeInfo.sourceName }}</div>
                        <div>{{ recipeInfo.creditsText }}</div>
                    </div>
                </div>

                <!-- Right: Button -->
                <a :href="recipeInfo.sourceUrl" target="_blank" class="btn btn-source redirect">
                    View Original Recipe
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" version="1.1">
                        <path
                            d="M14.736 3.034344C14.562408000000001 3.0826559999999996 14.433048 3.159984 14.295024 3.2980080000000003C13.841016 3.7520400000000005 13.925111999999999 4.497072 14.469864 4.8466320000000005C14.696807999999999 4.992264 14.687184 4.991448 16.199664 4.991736L17.579328 4.992 13.880664 8.694C9.633552000000002 12.944927999999999 10.02 12.514368000000001 10.02 12.995424C10.02 13.243176 10.024872 13.270296 10.096632 13.421784C10.195824 13.631160000000001 10.36884 13.804176 10.578216000000001 13.903368C10.729704000000002 13.975128000000002 10.756824 13.98 11.004576 13.98C11.485632 13.98 11.055072 14.366448 15.306000000000001 10.119336L19.008 6.420672000000001 19.008264 7.800336000000001C19.008552 9.312816 19.007736 9.303192 19.153368 9.530136C19.430568 9.962136000000001 19.987032 10.120704000000002 20.44296 9.897648C20.596632 9.822456 20.810015999999997 9.617088 20.883216 9.473928C21.001944 9.24168 20.999424 9.306576 20.999448 6.48C20.999472 4.2126719999999995 20.99436 3.811104 20.96412 3.711456C20.870904 3.404232 20.594568 3.12876 20.28552 3.034968C20.128656 2.9873760000000003 14.906927999999999 2.986776 14.736 3.034344M5.667288 5.01936C4.53036 5.13828 3.5333040000000002 5.938944 3.160968 7.032C3.001344 7.500648 3.014352 7.012752 3.005088 12.876C2.9989440000000003 16.757952000000003 3.004032 18.234696 3.024096 18.384C3.205848 19.737288 4.2627120000000005 20.794152 5.6160000000000005 20.975904C5.765304 20.995968 7.2420480000000005 21.001056 11.124 20.994912C16.127208 20.987016 16.4382 20.984088 16.608 20.943432C17.568624 20.71344 18.321504 20.116152 18.718392 19.269192C18.812952000000003 19.067424 18.91224 18.759168 18.963984 18.506664C19.002408000000003 18.319104000000003 19.02096 12.083736 18.983808 11.844192C18.950328 11.628504000000001 18.861264 11.454672 18.703295999999998 11.296704C18.547128 11.140512 18.372864 11.05044 18.162 11.016864C17.835288 10.964856000000001 17.52972 11.063688 17.296704000000002 11.296704C17.142072000000002 11.451312 17.050728 11.626488 17.017536 11.832C17.000928 11.93496 16.992216 13.036488 16.991927999999998 15.072000000000001C16.991448 18.37212 16.996128000000002 18.236688 16.874304000000002 18.475512C16.797984000000003 18.62508 16.594632 18.813552 16.422743999999998 18.893976000000002C16.326576 18.938976 16.202304 18.973368 16.085256 18.98736C15.975792 19.000439999999998 13.83816 19.006512 10.86 19.002216C6.15432 18.995448 5.812176 18.992208 5.702016 18.953424000000002C5.3781360000000005 18.839424 5.126232 18.573648000000002 5.037216 18.252C4.986456 18.068616000000002 4.987752 7.915992000000001 5.03856 7.740864C5.1360719999999995 7.404648 5.394144 7.1450640000000005 5.733144 7.042152000000001C5.825736 7.014072 6.352368 7.008456000000001 8.928 7.008071999999999C10.963512 7.007784 12.06504 6.999072 12.168000000000001 6.982463999999999C12.373512 6.949272 12.548688 6.857928 12.703296 6.703296C12.859488 6.547128000000001 12.949560000000002 6.372864 12.983136000000002 6.162C13.035143999999999 5.835288 12.936312000000001 5.52972 12.703296 5.296704C12.548688 5.142072 12.373512 5.050728 12.168000000000001 5.017536C11.975544 4.98648 5.96568 4.988160000000001 5.667288 5.01936"
                            stroke="none" fill="#ffffff" fill-rule="evenodd" stroke-width="0.024"></path>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.title {
    font-family: var(--font-body);
}

.page-bg {
    min-height: 100vh;
    position: relative;
    background: linear-gradient(135deg,
            var(--color-background) 0%,
            #e5e4e2 50%,
            var(--color-background) 100%);
    overflow: hidden;
}

/* Top-left blur */
.page-bg::before {
    content: "";
    position: absolute;
    top: -100px;
    left: -100px;
    width: 300px;
    height: 300px;
    background: var(--color-secondary);
    filter: blur(120px);
    opacity: 0.35;
    border-radius: 50%;
    z-index: 0;
}

/* Bottom-right blur */
.page-bg::after {
    content: "";
    position: absolute;
    bottom: -120px;
    right: -120px;
    width: 350px;
    height: 350px;
    background: var(--color-secondary);
    filter: blur(140px);
    opacity: 0.35;
    border-radius: 50%;
    z-index: 0;
}

/* Middle fade blur (as a separate element) */
.page-bg .center-fade {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 900px;
    height: 250px;
    background: var(--color-secondary);
    filter: blur(160px);
    opacity: 0.25;
    border-radius: 50%;
    z-index: 0;
}

.container {
    position: relative;
    z-index: 1;
    /* keep content above fades */
}

.card {
    background-color: white;
    border-radius: 1rem;
}

ol {
    padding-left: 1.25rem;
}

ol li {
    margin-bottom: 0.75rem;
    padding: 5px;
    text-align: left;
}


.info-box {
    flex: 1;
    min-width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    border-radius: 1rem;
    text-align: center;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: transform 0.2s ease;
}

.info-box:hover {
    transform: scale(1.05);
}

.glass {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

/* Gradient styles */
.purple-box {
    background: linear-gradient(135deg, rgba(128, 113, 178, 0.3), rgba(255, 255, 255, 0.05));
}

.pink-box {
    background: linear-gradient(135deg, rgba(244, 182, 194, 0.35), rgba(255, 255, 255, 0.05));
}

/* Icon styles */
.icon-circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.75rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.icon-circle svg {
    stroke: var(--color-primary);
}

/* Text styling */
.info-text small {
    color: #444;
    font-weight: 500;
}

.info-value {
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--color-primary);
}

.badge {
    font-size: 0.9rem;
    padding: 0.5em 0.75em;
}

/* Image outline */
img {
    object-fit: cover;
    height: 100%;
    border: 1px solid white;
    /* thinner white outline */
    border-radius: 0.75rem;
    /* matches card rounding */
}

/* Diet tags */
.badge.diet-tag {
    background-color: var(--color-secondary);
    color: var(--color-primary);
    font-weight: normal;
    padding: 15px;
}

/* Dish type tags */
.badge.dish-tag {
    background-color: var(--color-accent);
    color: #fff;
    font-weight: normal;
    padding: 15px;
}

/* Add to Meal Plan button */
.btn-mealplan {
    background-color: var(--color-accent);
    color: white;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.25s ease;
    border: none;
}

.btn-mealplan svg {
    transition: transform 0.25s ease;
}

.btn-mealplan:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 18px rgba(230, 74, 25, 0.4);
}

.btn-mealplan:hover svg {
    animation: shake 0.4s ease;
}

/* Small shake animation */
@keyframes shake {
    0% {
        transform: rotate(0deg);
    }

    25% {
        transform: rotate(-10deg);
    }

    50% {
        transform: rotate(10deg);
    }

    75% {
        transform: rotate(-5deg);
    }

    100% {
        transform: rotate(0deg);
    }
}

/* === Summary Card Styling === */
.recipe-summary-card {
    background: linear-gradient(
        135deg, 
        rgba(255, 255, 255, 0.95) 0%,     /* strong white */
        rgba(var(--color-accent), 0.15) 40%, 
        rgba(var(--color-accent), 0.25) 100%
    );
    border: 1.5px solid rgba(230, 74, 25, 0.25);
    /* lighter outline */
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(230, 74, 25, 0.1);
    /* subtle pop */
    transition: all 0.3s ease;
    padding: 1.5rem;
}

.recipe-summary-card:hover {
    box-shadow: 0 6px 16px rgba(230, 74, 25, 0.18);
    transform: translateY(-2px);
}

/* Header: icon + title */
.summary-header {
    display: flex;
    align-items: center;
}

/* Icon circle background */
.icon-circle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: rgba(230, 74, 25, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
}

.chef-hat-icon {
    color: var(--color-accent) !important;
}

.summary-title {
    color: var(--color-accent);
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 1.2rem;
}

.summary-text {
    color: #7d7d7d;
    line-height: 1.6;
}

.summary-text :deep(a) {
    color: var(--color-accent);
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s ease;
}

.summary-text :deep(a:hover) {
    color: #ff7b47;
}

/* INGREDIENTS CARD STYLE */
.ingredients-card {
    border: 2px solid #f7b6a1;
    /* lighter #e64a19 */
    background: linear-gradient(135deg, rgba(230, 74, 25, 0.08), rgba(255, 255, 255, 0.6));
}

.icon-circle-ingredient {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: rgba(230, 74, 25, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
}

.ingredients-card .card-header-custom {
    display: flex;
    align-items: center;
}

.ingredients-list {
    text-align: left;
    list-style-type: disc;
    /* normal bullet */
    padding-left: 1.5rem;
    /* keep natural indentation */
    margin: 0;

}

.ingredients-list li {
    font-size: 1rem;
    color: #333;
    margin-bottom: 0.6rem;
}

/* customize the bullet color and size */
.ingredients-list li::marker {
    color: #e64a19;
    /* orange bullet */
    font-size: 1.4em;
    /* make it bigger */
}

.ingredients-list li span {
    font-size: 1rem;
    color: #333;
}

/* INSTRUCTIONS CARD STYLE */
.instructions-card {
    border: 2px solid #d3d0ea;
    /* lighter #1c1456 */
    background: linear-gradient(135deg, rgba(28, 20, 86, 0.07), rgba(255, 255, 255, 0.6));
}

.icon-circle-instruction {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: rgba(220, 220, 220, 0.5);
    /* light grey circle */
    display: flex;
    align-items: center;
    justify-content: center;
}

.instructions-card .card-header-custom {
    display: flex;
    align-items: center;
}

.instructions-list {
    list-style: none;
    padding-left: 0;
}

.instruction-step {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
}

.step-number {
    width: 30px;
    height: 30px;
    background-color: #1c1456;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    flex-shrink: 0;
}

/* === Source Card Styling === */
.source-card {
    border: 1.5px solid #f4b6c2;
    background: linear-gradient(135deg, rgba(244, 182, 194, 0.2), #fff);
    border-radius: 1rem;
    box-shadow: 0 4px 10px rgba(244, 182, 194, 0.2);
}

.icon-circle-source {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #d98fa1;
    /* darker shade of #f4b6c2 */
    display: flex;
    align-items: center;
    justify-content: center;
}

.source-text small {
    font-size: 0.8rem;
    color: #666 !important;
}

.source-text .fw-bold {
    font-size: 1rem;
    color: #333;
}

.btn-source {
    border: none;
    background-color: #1c1456;
    color: white;
    padding: 0.6rem 1.2rem;
    font-weight: 600;
    border-radius: 0.75rem;
    transition: all 0.2s ease;
}

.btn-source:hover {
    background-color: #2d2375;
    transform: translateY(-2px);
}

.redirect:hover svg {
    animation: shake 0.4s ease;
}

</style>