<template>
    <div class="post-detail-page">
      <!-- Left: Image -->
      <div class="post-image-section">
        <img
          :src="post.image_url"
          alt="Post image"
          class="post-image"
        />
      </div>
  
      <!-- Right: Details & Comments -->
      <div class="post-comments-section">
        <!-- Post Info -->
        <div class="post-header">
          <img
            src="https://api.dicebear.com/9.x/avataaars/svg"
            alt="User avatar"
            class="avatar"
          />
          <span class="username">{{ post.username }}</span>
        </div>
  
        <!-- Post Caption / Description -->
        <div class="post-caption">
          <strong>{{ post.username }}</strong> {{ post.caption }}
          <p>{{ post.description }}</p>
        </div>
  
        <!-- Likes -->
        <div class="post-actions">
          <button class="like-button" @click="toggleLike">
            <span :class="{ liked: liked }">❤️</span> {{ post.likeCount }}
          </button>
        </div>
  
        <!-- Comments -->
        <div class="comments-list">
          <div v-for="comment in comments" :key="comment.id" class="comment">
            <strong>{{ comment.username }}</strong> {{ comment.content }}
          </div>
        </div>
  
        <!-- Add Comment -->
        <div class="add-comment">
          <input
            v-model="newComment"
            type="text"
            placeholder="Add a comment..."
            @keyup.enter="addComment"
          />
          <button @click="addComment">Post</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from "vue";
  import axios from "axios";
  import { useRoute } from "vue-router";
  import { useUserStore } from "../stores/userStore";
  
  const route = useRoute();
  const postId = route.params.id;
  const userStore = useUserStore();
  
  const post = ref({
    username: "",
    image_url: "",
    caption: "",
    description: "",
    likeCount: 0,
  });
  const comments = ref([]);
  const newComment = ref("");
  const liked = ref(false);
  
  // Fetch post details
  async function fetchPost() {
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/posts/${postId}`, {
        withCredentials: true,
      });
  
      // backend returns the full post
      post.value = {
        ...res.data,
        likeCount: res.data.likeCount || 0,
      };
      comments.value = res.data.comments || [];
  
      // Optionally check if user already liked
      liked.value = res.data.userLiked || false;
    } catch (err) {
      console.error("Failed to fetch post:", err);
    }
  }
  
  // Like / Unlike toggle
  async function toggleLike() {
    try {
      if (!liked.value) {
        await axios.post(
          `http://localhost:4000/api/v1/posts/${postId}/likes`,
          { userId: userStore.user.id },
          { withCredentials: true }
        );
        post.value.likeCount++;
        liked.value = true;
      } else {
        await axios.delete(
          `http://localhost:4000/api/v1/posts/${postId}/likes`,
          { data: { userId: userStore.user.id }, withCredentials: true }
        );
        post.value.likeCount--;
        liked.value = false;
      }
    } catch (err) {
      console.error("Like toggle failed:", err);
    }
  }
  
  // Add comment
  async function addComment() {
    if (!newComment.value.trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:4000/api/v1/posts/${postId}/comments`,
        { userId: userStore.user.id, content: newComment.value },
        { withCredentials: true }
      );
      comments.value.push(res.data);
      newComment.value = "";
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  }
  
  onMounted(fetchPost);
  </script>
  
  <style scoped>
  .post-detail-page {
    display: flex;
    gap: 2rem;
    min-height: calc(100vh - 80px);
    background-color: #fafafa;
    padding: 2rem;
  }
  
  .post-image-section {
    flex: 1.2;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
    border-radius: 0.5rem;
  }
  
  .post-image {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
  }
  
  .post-comments-section {
    flex: 0.8;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }
  
  .post-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 0.75rem;
  }
  
  .username {
    font-weight: bold;
  }
  
  .post-caption {
    margin-bottom: 1rem;
  }
  
  .post-actions {
    margin-bottom: 1rem;
  }
  
  .like-button {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }
  
  .like-button .liked {
    color: red;
  }
  
  .comments-list {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 1rem;
  }
  
  .comment {
    margin-bottom: 0.5rem;
  }
  
  .comment strong {
    margin-right: 0.5rem;
  }
  
  .add-comment {
    display: flex;
    gap: 0.5rem;
  }
  
  .add-comment input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
  }
  
  .add-comment button {
    background-color: #0095f6;
    color: #fff;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }
  
  .add-comment button:hover {
    background-color: #007ac1;
  }
  
  @media (max-width: 768px) {
    .post-detail-page {
      flex-direction: column;
      padding: 1rem;
    }
    .post-image-section, .post-comments-section {
      flex: none;
      width: 100%;
    }
  }
  </style>
  