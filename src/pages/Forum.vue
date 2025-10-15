<template>
    <div class="feed-page">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <!-- Post Header -->
        <div class="post-header">
          <img
            src="https://api.dicebear.com/9.x/avataaars/svg"
            alt="User avatar"
            class="avatar"
          />
          <span class="username">{{ post.username }}</span>
        </div>
  
        <!-- Post Image -->
        <img :src="post.image_url" alt="Post image" class="post-image" />
  
        <!-- Post Actions -->
        <div class="post-actions">
          <button class="like-button" @click="toggleLike(post)">
            <span :class="{ liked: post.liked }">❤️</span> {{ post.likeCount }}
          </button>
        </div>
  
        <!-- Caption -->
        <div class="post-caption">
          <strong>{{ post.username }}</strong> {{ post.caption }}
          <p>{{ post.description }}</p>
        </div>
  
        <!-- Comments -->
        <div class="comments-list">
          <div v-for="comment in post.comments" :key="comment.id" class="comment">
            <strong>{{ comment.username }}</strong> {{ comment.content }}
          </div>
        </div>
  
        <!-- Add Comment -->
        <div class="add-comment">
          <input
            v-model="post.newComment"
            type="text"
            placeholder="Add a comment..."
            @keyup.enter="addComment(post)"
          />
          <button @click="addComment(post)">Post</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import { useUserStore } from "../stores/userStore";
  
  const userStore = useUserStore();
  const posts = ref([]);
  
  // Fetch all posts
  async function fetchPosts() {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/posts", {
        withCredentials: true,
      });
      // map posts to add a temporary "newComment" and liked flag
      posts.value = res.data.map(post => ({
        ...post,
        newComment: "",
        liked: false, // optionally get from backend if user already liked
      }));
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  }
  
  // Toggle like
  async function toggleLike(post) {
    try {
      if (!post.liked) {
        await axios.post(
          `http://localhost:4000/api/v1/posts/${post.id}/likes`,
          { userId: userStore.user.id },
          { withCredentials: true }
        );
        post.likeCount++;
        post.liked = true;
      } else {
        await axios.delete(
          `http://localhost:4000/api/v1/posts/${post.id}/likes`,
          { data: { userId: userStore.user.id }, withCredentials: true }
        );
        post.likeCount--;
        post.liked = false;
      }
    } catch (err) {
      console.error("Like toggle failed:", err);
    }
  }
  
  // Add comment
  async function addComment(post) {
    if (!post.newComment.trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:4000/api/v1/posts/${post.id}/comments`,
        { userId: userStore.user.id, content: post.newComment },
        { withCredentials: true }
      );
      post.comments.push(res.data);
      post.newComment = "";
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  }
  
  onMounted(fetchPosts);
  </script>
  
  <style scoped>
  .feed-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    background-color: #fafafa;
  }
  
  /* Post Card */
  .post-card {
    width: 100%;
    max-width: 600px;
    background: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  /* Post Header */
  .post-header {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
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
  
  /* Post Image */
  .post-image {
    width: 100%;
    object-fit: cover;
  }
  
  /* Actions */
  .post-actions {
    padding: 0.5rem 1rem;
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
  
  /* Caption */
  .post-caption {
    padding: 0.5rem 1rem;
  }
  
  /* Comments */
  .comments-list {
    padding: 0 1rem;
    margin-bottom: 0.5rem;
  }
  
  .comment {
    margin-bottom: 0.25rem;
  }
  
  /* Add Comment */
  .add-comment {
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem 1rem 1rem 1rem;
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
  </style>
  