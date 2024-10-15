<script setup>
import { ref } from 'vue'
const post = ref({ id: 1, title: 'Post 1', content: 'This is the first post.' },)
const comments = ref([
  { id: 1, text: 'Great post!' },
  { id: 2, text: 'Very informative.' },
])
</script>

<template>
  <div class="container">
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <h4>Comments</h4>
    <ul>
      <li v-for="comment in comments" :key="comment.id">{{ comment.text }}</li>
    </ul>
  </div>
</template>
