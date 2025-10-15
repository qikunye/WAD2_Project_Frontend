import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import ProfilePage from '../pages/ProfilePage.vue';
import RecipesPage from '../pages/Recipes.vue';
import SpecificRecipePage from '../pages/SpecificRecipe.vue';
import ForumPage from '../pages/Forum.vue'
import { useUserStore } from '../stores/userStore';
import Forum from '../pages/Forum.vue';

const routes = [
    { path: "/", name: "Home", component: HomePage },
    { path: "/register", name: "Register", component: RegisterPage },
    { path: "/login", name: "Login", component: LoginPage },
    { path: "/profile", name: "Profile", component: ProfilePage, meta: { requiresAuth: true } }, //protected route
    // { path: '/posts/:id', name: 'Forum', component: () => ForumPage},
    { path: "/posts", name: "Forum", component: ForumPage },       // all posts

    //recipes
    { path: "/recipes", name: "Recipes", component: RecipesPage },
    { path: "/recipe", name: "SpecificRecipe", component: SpecificRecipePage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// global route guard
router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();

    if (userStore.user === null && typeof userStore.fetchUser === 'function') {
        try {
            await userStore.fetchUser();
        } catch (err) {
            userStore.user = null;
            userStore.isLoggedIn = false;
        }
    }

    // if route requires auth and user is not logged in -> redirect to login
    if (to.meta.requiresAuth && !userStore.isLoggedIn) {
        return next({ name: 'Login' });
    }

    // if visiting login while already logged in -> redirect to home
    if (to.name === 'Login' && userStore.isLoggedIn) {
        return next({ name: 'Home' });
    }

    return next();
});

export default router;