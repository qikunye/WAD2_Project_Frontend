<template>
  <header class="navbar-container">
    <div class="navbar-inner">
      <!-- Brand -->
      <div class="navbar-brand-section">
        <img src="/images/zerobites_logo.png" alt="ZeroBites Logo" class="navbar-logo" />
        <div class="navbar-brand-text">ZeroBites</div>
      </div>

      <!-- Main Navigation -->
      <nav class="navbar-main">
        <!-- Home with dropdown -->
        <div class="nav-item-wrapper" 
             @mouseenter="openDropdown('home')" 
             @mouseleave="startCloseTimer"
             @mouseenter.capture="cancelCloseTimer">
          <button class="nav-link" :class="{ active: activeDropdown === 'home' }">
            Home
            <span class="dropdown-arrow">▼</span>
          </button>
          <div v-if="activeDropdown === 'home'" 
               class="dropdown-panel compact"
               @mouseenter="cancelCloseTimer"
               @mouseleave="startCloseTimer">
            <a v-for="section in navigation.home.sections" :key="section.href" 
               :href="section.href" class="dropdown-item-compact" @click="closeDropdown">
              <div class="item-icon">📍</div>
              <div class="item-content">
                <div class="item-title">{{ section.title }}</div>
                <div class="item-description">{{ section.description }}</div>
              </div>
            </a>
          </div>
        </div>

        <!-- Recipe Finder (no dropdown) -->
        <div class="nav-item-wrapper">
          <a href="/recipes" class="nav-link">Recipe Finder</a>
        </div>

        <!-- Meal Sharing Forum with dropdown -->
        <div class="nav-item-wrapper" 
             @mouseenter="openDropdown('mealSharing')" 
             @mouseleave="startCloseTimer"
             @mouseenter.capture="cancelCloseTimer">
          <button class="nav-link" :class="{ active: activeDropdown === 'mealSharing' }">
            Meal Sharing Forum
            <span class="dropdown-arrow">▼</span>
          </button>
          <div v-if="activeDropdown === 'mealSharing'" 
               class="dropdown-panel visual"
               @mouseenter="cancelCloseTimer"
               @mouseleave="startCloseTimer">
            <div class="dropdown-grid">
              <a v-for="section in navigation.mealSharing.sections" :key="section.href"
                 :href="section.href" class="dropdown-card" @click="closeDropdown">
                <div class="card-image-wrapper">
                  <img :src="section.image" :alt="section.title" class="card-image" />
                  <div class="card-overlay"></div>
                </div>
                <div class="card-content">
                  <h3 class="card-title">{{ section.title }}</h3>
                  <p class="card-description">{{ section.description }}</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- Meal Planner & Shopping List with dropdown -->
        <div class="nav-item-wrapper" 
             @mouseenter="openDropdown('mealPlanner')" 
             @mouseleave="startCloseTimer"
             @mouseenter.capture="cancelCloseTimer">
          <button class="nav-link" :class="{ active: activeDropdown === 'mealPlanner' }">
            Meal Planner & Shopping List
            <span class="dropdown-arrow">▼</span>
          </button>
          <div v-if="activeDropdown === 'mealPlanner'" 
               class="dropdown-panel visual"
               @mouseenter="cancelCloseTimer"
               @mouseleave="startCloseTimer">
            <div class="dropdown-grid">
              <a v-for="section in navigation.mealPlanner.sections" :key="section.href"
                 :href="section.href" class="dropdown-card" @click="closeDropdown">
                <div class="card-image-wrapper">
                  <img :src="section.image" :alt="section.title" class="card-image" />
                  <div class="card-overlay"></div>
                </div>
                <div class="card-content">
                  <h3 class="card-title">{{ section.title }}</h3>
                  <p class="card-description">{{ section.description }}</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- Food Tracker (no dropdown) -->
        <div class="nav-item-wrapper">
          <a href="/food-tracker.html" class="nav-link">Food Tracker</a>
        </div>
      </nav>

      <!-- Auth Buttons -->
      <div class="navbar-actions">
        <router-link v-if="!userStore.isLoggedIn" to="/login" class="auth-button">Login</router-link>
        <router-link v-else to="/profile" class="auth-button">Profile</router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();
const activeDropdown = ref(null);
let closeTimer = null;

const navigation = {
  home: {
    sections: [
      { title: 'Problems', description: 'Understanding food waste challenges', href: '/#problems' },
      { title: 'Features', description: 'Explore our solutions', href: '/#features' },
      { title: 'Call to Action', description: 'Join the movement', href: '/#cta' }
    ]
  },
  mealSharing: {
    sections: [
      { 
        title: 'Community Posts', 
        description: 'Browse and share meals',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=250&fit=crop',
        href: '/meal-sharing.html#community'
      },
      { 
        title: 'Sharing Recipes', 
        description: 'Share your favorite recipes',
        image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&h=250&fit=crop',
        href: '/meal-sharing.html#recipes'
      }
    ]
  },
  mealPlanner: {
    sections: [
      { 
        title: 'Meal Planner', 
        description: 'Plan your weekly meals',
        image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=250&fit=crop',
        href: '/meal-planner.html#planner'
      },
      { 
        title: 'Shopping List', 
        description: 'Generate smart shopping lists',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=250&fit=crop',
        href: '/meal-planner.html#shopping'
      }
    ]
  }
};

const openDropdown = (name) => {
  cancelCloseTimer();
  activeDropdown.value = name;
};

const closeDropdown = () => {
  cancelCloseTimer();
  activeDropdown.value = null;
};

const startCloseTimer = () => {
  closeTimer = setTimeout(() => {
    activeDropdown.value = null;
  }, 200);
};

const cancelCloseTimer = () => {
  if (closeTimer) {
    clearTimeout(closeTimer);
    closeTimer = null;
  }
};

onMounted(async () => {
  if (userStore.user === null) {
    await userStore.fetchUser();
  }
});
</script>

<style scoped>
.navbar-container {
  background-color: var(--color-background);
  border-bottom: 1px solid rgba(28, 20, 86, 0.1);
  position: static;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.navbar-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  gap: 2rem;
}

.navbar-brand-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.navbar-logo {
  height: 40px;
  width: auto;
}

.navbar-brand-text {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  color: var(--color-primary);
  font-weight: bold;
}

.navbar-main {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  justify-content: center;
}

.nav-item-wrapper {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.75rem 1rem;
  color: var(--color-primary);
  text-decoration: none;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.95rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  background: none;
  border: none;
  cursor: pointer;
}

.nav-link:hover,
.nav-link.active {
  background-color: rgba(244, 182, 194, 0.2);
  color: var(--color-primary);
}

.dropdown-arrow {
  font-size: 0.7rem;
  transition: transform 0.3s ease;
}

.nav-link.active .dropdown-arrow {
  transform: rotate(180deg);
}

.navbar-actions {
  display: flex;
  gap: 1rem;
}

.auth-button {
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  background-color: var(--color-primary);
  color: var(--color-secondary);
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
}

.auth-button:hover {
  background-color: var(--color-secondary);
  color: var(--color-primary);
  transform: translateY(-2px);
}

/* Dropdown Panels */
.dropdown-panel {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: slideDown 0.3s ease;
  z-index: 1000;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* Compact Layout (for Home) */
.dropdown-panel.compact {
  width: 320px;
  padding: 0.5rem;
}

.dropdown-item-compact {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.75rem;
  text-decoration: none;
  color: var(--color-primary);
  transition: all 0.3s ease;
}

.dropdown-item-compact:hover {
  background-color: rgba(244, 182, 194, 0.15);
  transform: translateX(5px);
}

.item-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.item-content {
  flex: 1;
}

.item-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: var(--color-primary);
}

.item-description {
  font-size: 0.85rem;
  color: #666;
  line-height: 1.4;
}

/* Visual Card Layout (for Meal Sharing & Meal Planner) */
.dropdown-panel.visual {
  width: 540px;
  padding: 0.75rem;
  background-color: white;
}

.dropdown-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.dropdown-card {
  position: relative;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.3s ease;
  aspect-ratio: 4/3;
  border-radius: 0.75rem;
  background-color: white;
}

.dropdown-card:hover {
  transform: scale(1.05);
  z-index: 10;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3) 50%, transparent);
}

.card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.25rem;
  color: white;
  z-index: 5;
}

.card-title {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  margin-bottom: 0.4rem;
  color: white;
}

.card-description {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.3;
}

.dropdown-card:hover .card-overlay {
  background: linear-gradient(to top, rgba(244, 182, 194, 0.8), rgba(244, 182, 194, 0.4) 50%, transparent);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .navbar-main {
    gap: 0.25rem;
  }
  
  .nav-link {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }
  
  .dropdown-panel.visual {
    width: 480px;
  }
}

@media (max-width: 992px) {
  .navbar-inner {
    flex-wrap: wrap;
  }
  
  .navbar-main {
    order: 3;
    width: 100%;
    justify-content: flex-start;
    overflow-x: auto;
    padding: 0.5rem 0;
  }
  
  .dropdown-panel {
    left: 0;
    transform: none;
  }
  
  .dropdown-panel.visual {
    width: 420px;
  }
}

@media (max-width: 768px) {
  .navbar-brand-text {
    font-size: 1.5rem;
  }
  
  .nav-link {
    font-size: 0.85rem;
    padding: 0.5rem 0.7rem;
  }
  
  .dropdown-panel.compact {
    width: 280px;
  }
  
  .dropdown-panel.visual {
    width: 100%;
    max-width: 360px;
    padding: 0.5rem;
  }
  
  .dropdown-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}
</style>