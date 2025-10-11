<template>
  <div class="profile-page">
    <div class="profile-card">
      <!-- Avatar -->
      <img
        src="https://api.dicebear.com/9.x/avataaars/svg"
        alt="Avatar"
        class="profile-avatar"
      />

      <!-- User Info -->
      <h3 class="profile-name">{{ user.firstName }} {{ user.lastName }}</h3>
      <p class="profile-username">@{{ user.username }}</p>
      <p class="profile-email">{{ user.email }}</p>

      <!-- Logout button -->
      <div class="profile-actions">
        <button class="logout-button" @click="handleLogout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import axios from "axios";

const router = useRouter();
const userStore = useUserStore();

const user = reactive({
  firstName: "",
  lastName: "",
  username: "",
  email: "",
});

async function fetchUser() {
  try {
    const res = await axios.get("http://localhost:4000/api/v1/users/me", {
      withCredentials: true,
    });
    Object.assign(user, res.data.user);
  } catch (err) {
    console.error("Failed to fetch user:", err);
    router.push("/login");
  }
}

onMounted(fetchUser);

async function handleLogout() {
  try {
    await axios.post(
      "http://localhost:4000/api/v1/users/logout",
      {},
      { withCredentials: true }
    );
    await userStore.logout();
    router.replace("/");
  } catch (err) {
    console.error("Logout failed:", err);
    alert("Logout failed. Please try again.");
  }
}
</script>

<style scoped>
.profile-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px); /* adjust for navbar height */
  background-color: #e5e4e2;
  padding: 1rem;
}

.profile-card {
  background-color: #fff;
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.profile-name {
  font-family: "Anton", sans-serif;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.profile-username {
  font-weight: 600;
  color: #555;
  margin-bottom: 0.25rem;
}

.profile-email {
  font-weight: 400;
  color: #777;
  margin-bottom: 1.5rem;
}

.logout-button {
  background-color: #1c1456;
  color: #fff;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #3a2d80;
}
</style>
