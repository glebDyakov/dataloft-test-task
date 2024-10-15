<script setup>
import { ref } from 'vue'

const cars = ref([
  { id: 1, name: 'BMW', model: 'X5' },
  { id: 2, name: 'Audi', model: 'A6' },
])
</script>

<template>
  <div class="container">
    <h1>Car List</h1>
    <div v-for="car in cars" :key="car.id" class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">{{ car.name }} {{ car.model }}</h5>
        <router-link :to="`/car/${car.id}`" class="btn btn-primary">View Details</router-link>
      </div>
    </div>
  </div>
</template>
