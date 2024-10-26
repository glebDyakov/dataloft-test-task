<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useStore } from 'vuex'
import formatDate from '../utils/date'

const store = useStore()

const post = computed(() => store.getters.postDetails);

const isLoading = computed(() => store.getters.isLoading);

onMounted(() => {
  const postId = useRoute().params.id // Получаем ID поста из параметра маршрута
  store.dispatch('fetchPostDetails', postId)
})
</script>

<template>
  <div>
    <div v-if="isLoading" class="loader">
      <div class="spinner-border text-primary" role="status" />
    </div>    
    <div v-else>
      <div class="post-details">
        <!-- Шапка с кнопкой назад, заголовком и меню -->
        <div class="post-header">
          <button class="back-button" @click="$router.go(-1)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left-circle">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 8 8 12 12 16"></polyline>
              <line x1="16" y1="12" x2="8" y2="12"></line>
            </svg>
          </button>
          <h1>{{ post?.user.main_auto_name }}</h1>
          <button class="menu-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>

        <!-- Картинка поста на всю ширину -->
        <img :src="post?.img" :alt="post?.text" class="post-image-fullwidth">

        <!-- Информация о посте -->
        <div class="post-info-block">
          <div class="post-seller">
            <img :src="post?.user.avatar.url" :alt="post?.user.username" class="seller-avatar">
            <div class="seller-info">
              <span class="seller-nickname">{{ post?.user.username }}</span>
              <span class="post-car-model">{{ post?.user.main_auto_name }}</span>
            </div>
          </div>

          <!-- Двигатель и год выпуска -->
          <div class="post-car-info">
            <span>{{ post?.text }}</span>
          </div>

          <!-- Автомобильный рынок -->
          <div class="post-market">
            <p>{{ post?.main }}</p>
          </div>
        </div>

        <!-- Футер поста -->
        <div class="post-footer">
          <div class="post-actions">
            <div class="post-comments">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle">
                <path d="M21 11.5a8.38 8.38 0 0 1-1.3 4.4 8.5 8.5 0 0 1-7.7 4.6 8.38 8.38 0 0 1-4.4-1.3L3 21l1.8-4.6a8.38 8.38 0 0 1-1.3-4.4 8.5 8.5 0 0 1 4.6-7.7 8.38 8.38 0 0 1 4.4-1.3 8.5 8.5 0 0 1 8.5 8.5z"></path>
              </svg>
              <span>{{ post?.comment_count }} Комментариев</span>
            </div>
            <div class="post-likes">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="feather feather-heart-filled">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
              </svg>
              <span>{{ post?.like_count }} Лайков</span>
            </div>
            <div class="post-likes">
              <span>{{ post?.created_at ? formatDate(new Date(post?.created_at)) : '' }}</span>
            </div>
          </div>
        </div>
        <!-- Список комментариев -->
        <div class="comments-list">
          <div v-for="comment in post?.comments" :key="comment.id" class="comment-card">
            <img :src="comment.user.avatar.url" alt="User Avatar" class="avatar" />
            <div class="comment-content">
              <div class="comment-header">
                <span class="username">{{ comment.user.username }}</span>
                <span class="comment-date">{{ formatDate(new Date(comment.created_at)) }}</span>
              </div>
              <p class="car-model">{{ comment.user.main_auto_name }}</p>
              <p class="comment-text">{{ comment.text }}</p>
            </div>
          </div>
        </div>
        <!-- Блок авторизации для комментирования -->
        <div class="login-for-comments">
          <p>Авторизуйтесь для комментирования</p>
          <button @click="login">Войти</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
}

.back-button svg, .menu-button svg {
  width: 24px;
  height: 24px;
}

.post-image-fullwidth {
  width: 100%;
  height: auto;
}

.post-info-block {
  padding: 15px;
}

.post-seller {
  display: flex;
  align-items: center;
}

.seller-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.seller-info {
  display: flex;
  flex-direction: column;
}

.post-car-info {
  margin-top: 10px;
  font-size: 14px;
  color: #555;
}

.post-market {
  font-size: 14px;
  color: #777;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-top: 1px solid #ddd;
}

.post-actions svg {
  width: 20px;
  height: 20px;
}

.comments-list {
  padding: 15px;
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
}

.comment-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
}

.comment-author {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-info {
  display: flex;
  flex-direction: column;
}

.comment-author-name {
  font-weight: bold;
}

.comment-date {
  font-size: 12px;
  color: #777;
}

.login-for-comments {
  padding: 20px;
  text-align: center;
  border-top: 1px solid #ddd;
  background-color: #f1f1f1;
}

.login-for-comments p {
  margin-bottom: 10px;
  font-size: 14px;
  color: #555;
}

.login-for-comments button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-for-comments button:hover {
  background-color: #0056b3;
}

.comment-card {
  display: flex;
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.username {
  font-weight: bold;
}

.comment-date {
  font-size: 12px;
  color: #999;
}

.car-model {
  font-size: 14px;
  color: #666;
  margin: 4px 0;
}

.comment-text {
  margin: 0;
  text-align: left;
}

.seller-nickname {
  font-weight: bold;
  color: #333;
}
</style>
