<template>
  <div class="profile-page">
    <!-- Profile Header Section -->
    <section class="profile-header">
      <div class="profile-container">
        <!-- Left: Avatar Card -->
        <div class="avatar-card">
          <h1 class="user-name">{{ user.firstName }} {{ user.lastName }}</h1>
          <div class="status-badge">Joined {{ user.joinedDate }}</div>
          
          <div class="avatar-wrapper">
            <img 
              :src="user.avatar" 
              alt="User Avatar" 
              class="avatar-image"
            />
          </div>

          <button class="logout-button" @click="handleLogout">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <path d="M7 13L2 8L7 3V6H12V10H7V13ZM14 2H10V0H14C15.1 0 16 0.9 16 2V14C16 15.1 15.1 16 14 16H10V14H14V2Z"/>
            </svg>
            Logout
          </button>
        </div>

        <!-- Right: Bio & Details Card -->
        <div class="bio-card">
          <div class="card-header">
            <h2 class="card-title">Bio & other details</h2>
            <div class="availability-indicator online"></div>
          </div>

          <div class="bio-grid">
            <div class="bio-row">
              <div class="bio-item">
                <span class="bio-label">My Age</span>
                <span class="bio-value">{{ user.age }}</span>
              </div>
              <div class="bio-item">
                <span class="bio-label">My Experience Level</span>
                <span class="bio-value">{{ user.experienceLevel }}</span>
              </div>
            </div>

            <div class="bio-row">
              <div class="bio-item">
                <span class="bio-label">My Profession</span>
                <span class="bio-value">{{ user.profession }}</span>
              </div>
              <div class="bio-item">
                <span class="bio-label">My Favourite Cuisine</span>
                <span class="bio-value">{{ user.favouriteCuisine }}</span>
              </div>
            </div>

            <div class="bio-row">
              <div class="bio-item">
                <span class="bio-label">My Allergies</span>
                <span class="bio-value">{{ user.allergies }}</span>
              </div>
              <div class="bio-item">
                <span class="bio-label">My Preferred Cooking Style</span>
                <span class="bio-value">{{ user.cookingStyle }}</span>
              </div>
            </div>

            <div class="bio-row">
              <div class="bio-item full-width">
                <span class="bio-label">My Region</span>
                <span class="bio-value">{{ user.region }}</span>
              </div>
            </div>
          </div>

          <div class="additional-info">
            <div class="info-section">
              <span class="info-label">Availability</span>
              <div class="availability-badge">
                <span class="status-dot"></span>
                {{ user.availability }}
              </div>
            </div>

            <div class="info-section">
              <span class="info-label">Badges</span>
              <div class="badges-container">
                <div class="badge" v-for="badge in user.badges" :key="badge.id">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0L10.2451 5.52786H16L11.1121 8.94427L13.3574 14.4721L8 11.0557L2.64262 14.4721L4.88786 8.94427L0 5.52786H5.75486L8 0Z"/>
                  </svg>
                  {{ badge.name }}
                </div>
              </div>
            </div>

            <div class="info-section">
              <span class="info-label">Tags</span>
              <div class="tags-section">
                <span class="tag" v-for="tag in user.tags" :key="tag">#{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- My Posts Section -->
    <section class="content-section">
      <div class="section-header">
        <h2 class="section-title">My Posts</h2>
        <span class="item-count">{{ userPosts.length }}</span>
      </div>

      <div class="table-container">
        <table class="posts-table">
          <thead>
            <tr>
              <th class="col-title">Title</th>
              <th class="col-timing">Timing</th>
              <th class="col-listenings">No. of listenings</th>
              <th class="col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr class="post-row" v-for="post in userPosts" :key="post.id">
              <td class="post-title-cell">
                <div class="title-content">
                  <div class="post-thumbnail" :style="{ background: post.thumbnailColor }">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                      <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm-2 14.5v-9l6 4.5-6 4.5z"/>
                    </svg>
                  </div>
                  <div class="title-text">
                    <div class="post-title">{{ post.title }}</div>
                    <div class="post-author">{{ post.author }}</div>
                  </div>
                </div>
              </td>
              <td class="post-timing">{{ post.timing }}</td>
              <td class="post-listenings">{{ post.listenings.toLocaleString() }}</td>
              <td class="post-actions">
                <button class="action-btn" title="Like">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                    <path d="M9 15.5L7.7 14.3C3.6 10.6 1 8.3 1 5.5C1 3.4 2.6 1.8 4.7 1.8C6 1.8 7.2 2.4 8 3.3C8.8 2.4 10 1.8 11.3 1.8C13.4 1.8 15 3.4 15 5.5C15 8.3 12.4 10.6 8.3 14.3L7 15.5H9Z"/>
                  </svg>
                </button>
                <button class="action-btn" title="Repost">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                    <path d="M14 6L10 2V5C5.58 5 2 8.58 2 13C2 14.17 2.29 15.28 2.81 16.26C4.22 13.84 6.85 12.25 10 12.25V15.25L14 11.25V6Z"/>
                  </svg>
                </button>
                <button class="action-btn" title="Comment">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                    <path d="M16 0H2C0.9 0 0 0.9 0 2V12C0 13.1 0.9 14 2 14H14L18 18V2C18 0.9 17.1 0 16 0Z"/>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- My Collections Section -->
    <section class="content-section">
      <div class="section-header">
        <h2 class="section-title">My Collections</h2>
        <span class="item-count">{{ userCollections.length }}</span>
      </div>

      <div class="collections-grid">
        <article 
          class="collection-card" 
          v-for="item in userCollections" 
          :key="item.id"
        >
          <div class="collection-header">
            <div class="collection-icon" :style="{ background: item.iconColor }">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"/>
              </svg>
            </div>
            <div class="collection-meta">
              <span class="collection-date">{{ item.date }}</span>
              <span class="collection-category">{{ item.category }}</span>
            </div>
          </div>
          
          <div class="collection-content">
            <h3 class="collection-title">{{ item.title }}</h3>
            <p class="collection-excerpt">{{ item.excerpt }}</p>
          </div>
          
          <div class="collection-footer">
            <div class="collection-stats">
              <span class="stat-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 14.5L7 13.6C3.2 10.2 1 8.2 1 5.8C1 3.9 2.4 2.5 4.3 2.5C5.4 2.5 6.4 3 7 3.8C7.6 3 8.6 2.5 9.7 2.5C11.6 2.5 13 3.9 13 5.8C13 8.2 10.8 10.2 7 13.6L6 14.5H8Z"/>
                </svg>
                {{ item.likes }}
              </span>
              <span class="stat-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M14 0H2C0.9 0 0 0.9 0 2V10C0 11.1 0.9 12 2 12H12L16 16V2C16 0.9 15.1 0 14 0Z"/>
                </svg>
                {{ item.comments }}
              </span>
            </div>
            <button class="read-more-btn">
              Read More
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <path d="M7 0L5.6 1.4L10.2 6H0V8H10.2L5.6 12.6L7 14L14 7L7 0Z"/>
              </svg>
            </button>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import axios from 'axios'

const router = useRouter()
const userStore = useUserStore()

// User data
const user = reactive({
  firstName: 'Alexandra',
  lastName: 'Chen',
  joinedDate: 'November 2023',
  avatar: 'https://api.dicebear.com/9.x/avataaars/svg',
  age: 28,
  experienceLevel: 'Intermediate',
  profession: 'Food Blogger & Chef',
  favouriteCuisine: 'Japanese, Mediterranean',
  allergies: 'Shellfish, Peanuts',
  cookingStyle: 'Fusion & Healthy',
  region: 'Singapore',
  availability: 'Available for Collaboration',
  badges: [
    { id: 1, name: 'Top Collaborator' },
    { id: 2, name: 'Community Star' }
  ],
  tags: ['foodie', 'zerowaste', 'sustainability', 'masterchef']
})

// Posts data
const userPosts = ref([
  {
    id: 1,
    title: '5 Ways to Reduce Food Waste',
    author: 'Alexandra Chen',
    timing: '2:24',
    listenings: 454256,
    thumbnailColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 2,
    title: 'Zero-Waste Meal Planning Guide',
    author: 'Alexandra Chen',
    timing: '3:15',
    listenings: 389142,
    thumbnailColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    id: 3,
    title: 'Japanese Home Cooking Basics',
    author: 'Alexandra Chen',
    timing: '4:02',
    listenings: 567890,
    thumbnailColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  }
])

// Collections data - now as post cards
const userCollections = ref([
  {
    id: 1,
    title: 'Seasonal Eating: A Guide to Local Produce',
    excerpt: 'Discover how eating seasonally can reduce your carbon footprint while enjoying fresher, more flavorful ingredients throughout the year.',
    date: '2 weeks ago',
    category: 'Sustainability',
    likes: 342,
    comments: 28,
    iconColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 2,
    title: 'Mastering Japanese Knife Skills',
    excerpt: 'Learn the fundamental cutting techniques used in Japanese cuisine, from basic chopping to advanced decorative cuts.',
    date: '3 weeks ago',
    category: 'Techniques',
    likes: 521,
    comments: 47,
    iconColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 3,
    title: 'Zero-Waste Kitchen Essentials',
    excerpt: 'Transform your kitchen into a sustainable space with these must-have tools and practices for reducing food waste.',
    date: '1 month ago',
    category: 'Zero Waste',
    likes: 689,
    comments: 93,
    iconColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    id: 4,
    title: 'Mediterranean Diet Benefits Explained',
    excerpt: 'Explore the health benefits and culinary traditions of the Mediterranean diet, backed by scientific research.',
    date: '1 month ago',
    category: 'Nutrition',
    likes: 412,
    comments: 61,
    iconColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  },
  {
    id: 5,
    title: 'Fermentation for Beginners',
    excerpt: 'Start your fermentation journey with simple recipes for kimchi, sauerkraut, and kombucha that preserve food naturally.',
    date: '2 months ago',
    category: 'Preservation',
    likes: 578,
    comments: 84,
    iconColor: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
  },
  {
    id: 6,
    title: 'Plant-Based Protein Sources',
    excerpt: 'A comprehensive guide to incorporating diverse plant proteins into your diet for optimal nutrition and sustainability.',
    date: '2 months ago',
    category: 'Nutrition',
    likes: 734,
    comments: 102,
    iconColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  }
])

// Logout handler
async function handleLogout() {
  try {
    await axios.post(
      'http://localhost:4000/api/v1/user/logout',
      {},
      { withCredentials: true }
    )
    await userStore.logout()
    router.replace('/')
  } catch (err) {
    console.error('Logout failed:', err)
    alert('Logout failed. Please try again.')
  }
}
</script>

<style scoped>
/* ============================================
   Base Styles
   ============================================ */
.profile-page {
  background-color: #1c1456;
  color: #e5e5e5;
  font-family: 'Poppins', 'Inter', sans-serif;
  min-height: 100vh;
  padding: 3rem 2rem;
}

/* ============================================
   Profile Header Section
   ============================================ */
.profile-header {
  margin-bottom: 3rem;
}

.profile-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 2rem;
}

/* Avatar Card (Left Side) */
.avatar-card {
  background: rgba(43, 35, 112, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}

.user-name {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.5rem;
  letter-spacing: -0.5px;
}

.status-badge {
  background: rgba(139, 92, 246, 0.2);
  border: 1px solid rgba(139, 92, 246, 0.4);
  color: #a78bfa;
  padding: 0.375rem 1.25rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  margin-bottom: 2rem;
}

.avatar-wrapper {
  width: 280px;
  height: 280px;
  margin-bottom: 2rem;
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 6px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease;
}

.avatar-image:hover {
  transform: scale(1.03);
}

.logout-button {
  width: 100%;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  padding: 0.875rem 1.5rem;
  border-radius: 12px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
}

.logout-button:hover {
  background: rgba(239, 68, 68, 0.25);
  border-color: rgba(239, 68, 68, 0.5);
  transform: translateY(-2px);
}

.logout-button svg {
  width: 18px;
  height: 18px;
}

/* Bio Card (Right Side) */
.bio-card {
  background: rgba(43, 35, 112, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2.5rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.availability-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 12px rgba(74, 222, 128, 0.6);
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

/* Bio Grid */
.bio-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.bio-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.bio-row .full-width {
  grid-column: 1 / -1;
}

.bio-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bio-label {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  text-transform: capitalize;
}

.bio-value {
  font-size: 1.0625rem;
  color: #ffffff;
  font-weight: 500;
}

/* Additional Info */
.additional-info {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-label {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.availability-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  background: rgba(74, 222, 128, 0.15);
  border: 1px solid rgba(74, 222, 128, 0.3);
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  color: #4ade80;
  font-size: 0.9375rem;
  font-weight: 600;
  width: fit-content;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 8px rgba(74, 222, 128, 0.6);
}

.badges-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: #60a5fa;
  font-size: 0.875rem;
  font-weight: 500;
}

.badge svg {
  width: 16px;
  height: 16px;
}

.tags-section {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag {
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: #a78bfa;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tag:hover {
  background: rgba(139, 92, 246, 0.25);
  border-color: rgba(139, 92, 246, 0.5);
}

/* ============================================
   Content Sections
   ============================================ */
.content-section {
  max-width: 1400px;
  margin: 0 auto 3rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.item-count {
  background: rgba(139, 92, 246, 0.2);
  color: #a78bfa;
  padding: 0.375rem 0.875rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

/* ============================================
   Posts Table
   ============================================ */
.table-container {
  background: rgba(43, 35, 112, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
}

.posts-table {
  width: 100%;
  border-collapse: collapse;
}

.posts-table thead {
  background: rgba(28, 20, 86, 0.6);
}

.posts-table th {
  padding: 1.25rem 1.5rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  text-transform: capitalize;
  letter-spacing: 0.3px;
}

.posts-table tbody tr {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.2s ease;
}

.posts-table tbody tr:hover {
  background: rgba(139, 92, 246, 0.08);
}

.posts-table tbody tr:last-child {
  border-bottom: none;
}

.posts-table td {
  padding: 1.25rem 1.5rem;
  color: #e5e5e5;
}

.post-title-cell {
  width: 45%;
}

.title-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.post-thumbnail {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.title-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.post-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #ffffff;
}

.post-author {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.5);
}

.post-timing {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.7);
}

.post-listenings {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.7);
}

.post-actions {
  display: flex;
  gap: 0.75rem;
}

.action-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.6);
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: rgba(139, 92, 246, 0.15);
  border-color: rgba(139, 92, 246, 0.4);
  color: #a78bfa;
  transform: translateY(-2px);
}

/* ============================================
   Collections Grid (Post Cards)
   ============================================ */
.collections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
}

.collection-card {
  background: linear-gradient(135deg, rgba(43, 35, 112, 0.5) 0%, rgba(28, 20, 86, 0.7) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.collection-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(139, 92, 246, 0.2);
  border-color: rgba(139, 92, 246, 0.4);
}

/* Collection Header */
.collection-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.collection-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.collection-icon svg {
  width: 24px;
  height: 24px;
}

.collection-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.collection-date {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
}

.collection-category {
  font-size: 0.75rem;
  color: #a78bfa;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Collection Content */
.collection-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.collection-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.4;
}

.collection-excerpt {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin: 0;
}

/* Collection Footer */
.collection-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.collection-stats {
  display: flex;
  gap: 1.25rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

.stat-item svg {
  width: 16px;
  height: 16px;
  opacity: 0.7;
}

.read-more-btn {
  background: transparent;
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: #a78bfa;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.read-more-btn:hover {
  background: rgba(139, 92, 246, 0.15);
  border-color: rgba(139, 92, 246, 0.5);
  transform: translateX(4px);
}

.read-more-btn svg {
  width: 14px;
  height: 14px;
  transition: transform 0.3s ease;
}

.read-more-btn:hover svg {
  transform: translateX(3px);
}

/* ============================================
   Responsive Design
   ============================================ */
@media (max-width: 1200px) {
  .profile-container {
    grid-template-columns: 1fr;
  }

  .avatar-card {
    max-width: 500px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .profile-page {
    padding: 2rem 1rem;
  }

  .bio-row {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .table-container {
    overflow-x: auto;
  }

  .posts-table {
    min-width: 700px;
  }

  .collections-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .avatar-wrapper {
    width: 200px;
    height: 200px;
  }

  .user-name {
    font-size: 1.5rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .collection-card {
    padding: 1.25rem;
  }

  .collection-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .read-more-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>