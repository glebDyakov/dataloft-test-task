<script setup>
import { ref } from 'vue'

const entity = ref({
  car: {
    id: 1,
    name: 'BMW',
    model: 'X5',
    brand: 'BMW',
    year: 2021,
    engine: '3.0L Twin-Turbo I6', // Название двигателя
    market: 'Авторынок в Москве', // Название авторынка
    image: 'https://via.placeholder.com/1200x400?text=BMW+X5',
    posts: [
      {
        id: 1,
        text: 'Первый пост о BMW X5',
        date: '12 октября 2024',
        commentsCount: 5,
        likesCount: 12,
        seller: {
          name: 'AutoSeller123',
          avatar: 'https://via.placeholder.com/150x150?text=Avatar'
        },
        carModel: 'BMW X5',
        image: 'https://via.placeholder.com/1200x400?text=BMW+X5',
      },
      {
        id: 2,
        text: 'Второй пост о BMW X5',
        date: '10 октября 2024',
        commentsCount: 8,
        likesCount: 20,
        seller: {
          name: 'AutoSeller123',
          avatar: 'https://via.placeholder.com/150x150?text=Avatar'
        },
        carModel: 'BMW X5',
        image: 'https://via.placeholder.com/1200x400?text=BMW+X5',
      },
      {
        id: 3,
        text: 'Еще один пост о BMW X5',
        date: '8 октября 2024',
        commentsCount: 3,
        likesCount: 7,
        seller: {
          name: 'AutoSeller123',
          avatar: 'https://via.placeholder.com/150x150?text=Avatar'
        },
        carModel: 'BMW X5',
        image: 'https://via.placeholder.com/1200x400?text=BMW+X5',
      }
    ]
  },
  seller: {
    nickname: 'AutoSeller123',
    avatar: 'https://via.placeholder.com/150x150?text=Avatar'
  }
})
const posts = ref([
  {
    id: 1,
    title: 'Post 1',
    content: 'This is the first post.',
    image: 'https://via.placeholder.com/1200x400?text=BMW+X5',
  },
  {
    id: 2,
    title: 'Post 2',
    content: 'This is the second post.',
    image: 'https://via.placeholder.com/1200x400?text=BMW+X5',
  },
])

const goBack = () => {
  this.$router.go(-1)
}

const openMenu = () => {
  // TODO: Здесь можно реализовать логику для меню
}
</script>

<template>
  <div>
    <!-- Шапка с кнопкой назад, тайтлом и меню -->
    <header class="header">
      <button class="back-button" @click="goBack">
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
      <h1 class="title">{{ entity.car.name }} {{ entity.car.model }}</h1>
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
      <img :src="entity.car.image" :alt="`${entity.car.name} ${entity.car.model}`" class="car-image-fullwidth" />
    </div>
    <div class="container mb-4">
      <div class="car-info">
        <div class="seller-info">
          <img :src="entity.seller.avatar" alt="Avatar" class="seller-avatar">
          <div class="seller-details">
            <p class="seller-nickname">{{ entity.seller.nickname }}</p>
            <p class="seller-car-model">{{ entity.car.name }} {{ entity.car.model }}</p>
          </div>
        </div>
        <p><strong>{{ entity.car.model }}</strong></p>
        <p>{{ entity.car.engine }} · {{ entity.car.year }}</p>
        <p>{{ entity.car.market }}</p>
      </div>
    </div>
    <div class="posts">
      <div v-for="post in entity.car.posts" :key="post.id" class="post-card">
        <!-- <router-link :to="{ name: 'PostDetails', params: { id: post.id } }" class="post-link"> -->
        <router-link :to="`/post/${post.id}`" class="post-link">
          <!-- Блок с картинкой -->
          <div class="post-image-container">
            <img :src="post.image" alt="Car image" class="post-image" />
          </div>
          <!-- Информационный блок о посте -->
          <div class="post-info-block">
            <div class="post-seller-info">
              <img :src="post.seller.avatar" alt="Seller Avatar" class="seller-avatar" />
              <div class="seller-details">
                <span class="post-seller-name">{{ post.seller.name }}</span>
                <span class="post-car-model">{{ post.carModel }}</span>
              </div>
            </div>
          </div>
          <div class="post-footer">
            <div class="post-info">
              <span class="post-date">{{ post.date }}</span>
            </div>
            <div class="post-actions">
              <div class="post-comments">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle">
                  <path d="M21 11.5a8.38 8.38 0 0 1-1.3 4.4 8.5 8.5 0 0 1-7.7 4.6 8.38 8.38 0 0 1-4.4-1.3L3 21l1.8-4.6a8.38 8.38 0 0 1-1.3-4.4 8.5 8.5 0 0 1 4.6-7.7 8.38 8.38 0 0 1 4.4-1.3 8.5 8.5 0 0 1 8.5 8.5z"></path>
                </svg>
                <span>{{ post.commentsCount }} Комментариев</span>
              </div>
              <div class="post-likes">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="feather feather-heart-filled">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                </svg>
                <span>{{ post.likesCount }} Лайков</span>
              </div>
            </div>
          </div>
        </router-link>
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

/* Меню (три точки) */
.menu-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
}

.menu-button:hover {
  color: #007bff;
}


.menu-button svg {
  width: 32px;
  height: 32px;
  stroke: #333; /* Цвет иконки */
}

.menu-button:hover svg {
  stroke: #007bff; /* Изменение цвета при наведении */
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

.back-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.back-button svg {
  width: 32px;
  height: 32px;
  stroke: black; /* Синий цвет линии */
  fill: none; /* Убедитесь, что внутри круга нет заливки */
}

.back-button:hover svg {
  stroke: #007bff; /* Изменение цвета при наведении */
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

.post-actions {
  display: flex;
  align-items: center;
}

.post-comments, .post-likes {
  display: flex;
  align-items: center;
  margin-left: 15px;
}

.post-comments svg, .post-likes svg {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.post-comments span, .post-likes span {
  font-size: 14px;
  color: #333;
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