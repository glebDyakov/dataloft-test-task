<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useStore } from 'vuex'

const store = useStore()

const entity = computed(() => store.getters.carDetails)

const isLoading = computed(() => store.getters.isLoading);

const openMenu = () => {
  // TODO: Здесь можно реализовать логику для меню
}

const fetchCarDetails = async () => {
  const carId = useRoute().params.id // Получаем ID машины из параметра маршрута
  try {
    const response = await axios.get(`http://am111.05.testing.place/api/v1/car/${carId}`)
    entity.value.car = response.data.car // Предполагается, что данные машины находятся в response.data.data
    entity.value.seller = response.data.user // Предполагается, что данные машины находятся в response.data.data
  } catch (error) {
    console.error('Error fetching car details:', error)
  }
}

onMounted(() => {
  const carId = useRoute().params.id
  store.dispatch('fetchCarDetails', carId)
  store.dispatch('fetchCarPosts', carId)
})
</script>

<template>
  <div>
    <div v-if="isLoading" class="loader">
      <div class="spinner-border text-primary" role="status" />
    </div>    
    <div v-else>
      <!-- Шапка с кнопкой назад, тайтлом и меню -->
      <header class="header">
        <button class="back-button" @click="$router.go(-1)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-arrow-left-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 8 8 12 12 16"></polyline>
            <line x1="16" y1="12" x2="8" y2="12"></line>
          </svg>
        </button>
        <h1 class="title">{{ entity?.car?.brand_name }} {{ entity?.car?.model_name }}</h1>
        <div class="menu">
          <button class="menu-button" @click="openMenu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>
      </header>
      <!-- Изображение на всю ширину экрана -->
      <div class="car-image-container mb-4">
        <img :src="entity?.car?.images[0]?.url ?? ''" :alt="`${entity?.car?.brand_name} ${entity?.car?.model_name	}`" class="car-image-fullwidth" />
      </div>
      <div class="container mb-4">
        <div class="car-info">
          <div class="seller-info">
            <img :src="entity?.seller?.avatar.url" alt="Avatar" class="seller-avatar">
            <div class="seller-details">
              <p class="seller-nickname">{{ entity?.author?.username }}</p>
              <p class="seller-car-model">{{ entity?.car?.brand_name }} {{ entity?.car?.model_name }}</p>
            </div>
          </div>
          <p><strong>{{ entity?.car?.model_name }}</strong></p>
          <p>{{ entity?.car?.engine_name }} · {{ entity?.car?.year }}</p>
          <p>{{ entity?.car?.place_name	 }}</p>
        </div>
      </div>
      <div class="posts">
        <div v-for="post in entity?.car?.posts" :key="post.id" class="post-card">
          <router-link :to="`/post/${post.id}`" class="post-link">
            <div class="post-image-container">
              <img :src="post.img" alt="Car image" class="post-image" />
            </div>
            <div class="post-info-block">
              <div class="post-seller-info">
                <img :src="post.author.avatar.url" alt="Seller Avatar" class="seller-avatar" />
                <div class="seller-details">
                  <span class="post-seller-name">{{ entity?.car?.brand_name }}</span>
                  <span class="post-car-model">{{ entity?.car?.model_name }}</span>
                </div>
              </div>
            </div>
            <div class="post-footer">
              <div class="post-info">
                <span class="post-date">{{ post.created_at }}</span>
              </div>
              <div class="post-actions">
                <div class="post-comments">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle">
                    <path d="M21 11.5a8.38 8.38 0 0 1-1.3 4.4 8.5 8.5 0 0 1-7.7 4.6 8.38 8.38 0 0 1-4.4-1.3L3 21l1.8-4.6a8.38 8.38 0 0 1-1.3-4.4 8.5 8.5 0 0 1 4.6-7.7 8.38 8.38 0 0 1 4.4-1.3 8.5 8.5 0 0 1 8.5 8.5z"></path>
                  </svg>
                  <span>{{ post.comment_count }} Комментариев</span>
                </div>
                <div class="post-likes">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="feather feather-heart-filled">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                  </svg>
                  <span>{{ post.like_count }} Лайков</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f1f1f1;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

/* Тайтл (название автомобиля) */
.title {
  font-size: 18px;
  margin: 0;
  text-align: center;
  flex-grow: 1;
}

/* Изображение автомобиля на всю ширину экрана */
.car-image-container {
  width: 100vw; /* Ширина экрана */
  margin-left: calc(-50vw + 50%); /* Центровка изображения */
}

.car-image-fullwidth {
  width: 100%; /* Растягиваем изображение на всю ширину */
  height: auto;
  display: block; /* Убираем любые лишние отступы */
}

/* Оформление постов */
.posts {
  margin-top: 20px;
}

.post {
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

/* Блок с продавцом */
.seller-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

/* Аватар продавца */
.seller-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}

/* Детали продавца */
.seller-details {
  display: flex;
  flex-direction: column;
}

/* Никнейм продавца */
.seller-nickname {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

/* Модель автомобиля под никнеймом продавца */
.seller-car-model {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.posts {
  margin-top: 20px;
}

.post-card {
  background-color: #f9f9f9;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.post-text {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ddd;
  padding-top: 10px;
}

.post-info {
  font-size: 14px;
  color: #666;
}

.post-image {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  border-radius: 5px;
}

.post-info-block {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.post-seller-info {
  display: flex;
  flex-direction: row;
}

.post-seller-name {
  font-weight: bold;
  margin: 0;
}
</style>
