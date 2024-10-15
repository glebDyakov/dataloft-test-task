<script setup>
import { ref } from 'vue'

const car = ref({ id: 1, name: 'BMW', model: 'X5' })
const posts = ref([
  { id: 1, title: 'Post 1', content: 'This is the first post.' },
  { id: 2, title: 'Post 2', content: 'This is the second post.' },
])
</script>

<template>
  <div class="container">
    <h2>{{ car.name }} {{ car.model }} Details</h2>
    <h4>Posts</h4>
    <div v-for="post in posts" :key="post.id" class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">{{ post.title }}</h5>
        <router-link :to="`/post/${post.id}`" class="btn btn-secondary">View Post</router-link>
      </div>
    </div>
  </div>
</template>
