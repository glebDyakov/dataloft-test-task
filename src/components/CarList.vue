<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'

const store = useStore()

const cars = computed(() => store.getters.cars)

const isLoading = computed(() => store.getters.isLoading);

const selectedBrand = ref(null)

const uniqueBrands = computed(() => {
  const brands = cars.value.map(car => car.brand_name)
  return [...new Set(brands)] // remove duplicates
})

const filteredCars = computed(() => {
  if (selectedBrand.value === null) return cars.value
  return cars.value.filter(car => car.brand_name === selectedBrand.value);
})

const filterByBrand = (brand) => {
  if (selectedBrand.value && brand === selectedBrand.value) selectedBrand.value = null
  else selectedBrand.value = brand
}

onMounted(() => store.dispatch('fetchCarList'))
</script>

<template>
  <div>
    <div v-if="isLoading" class="loader">
      <div class="spinner-border text-primary" role="status" />
    </div>
    <div v-else class="container">
      <div class="my-4">
        <h3 class="text-secondary">Выберите марку</h3>
      </div>
      <hr />
      <div class="mb-4">
        <ul class="nav nav-pills">
          <li class="nav-item" v-for="brand in uniqueBrands" :key="brand">
            <button
              class="nav-link tab-button"
              :class="{ active: selectedBrand === brand }"
              @click="filterByBrand(brand)"
            >
              {{ brand }}
            </button>
          </li>
        </ul>
      </div>
      <hr />
      <div class="mb-4">
        <h3 class="text-secondary">Место нахождения: любое</h3>
      </div>
      <div class="car-grid">
        <div 
          v-for="car in filteredCars" 
          :key="car.id" 
          class="car-item clickable"
          @click="$router.push(`/car/${car.id}`)"
        >
          <img 
            :src="car.image" 
            :alt="`${car.name} ${car.model}`" 
            class="img-fluid car-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.car-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px; /* Отступ в 1px между элементами */
}

/* Элемент автомобиля */
.car-item {
  background-color: #f9f9f9; /* Фон для изображения */
}

/* Изображение автомобиля */
.car-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tab-button {
  color: #ccc; /* Тёмный текст */
  border: none; /* Убираем границы */
  margin: 0 5px; /* Отступы между табами */
}
</style>