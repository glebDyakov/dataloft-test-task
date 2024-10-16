<script setup>
import { ref, computed } from 'vue'

const cars = ref([
  { id: 1, name: 'BMW', model: 'X5', brand: 'BMW', image: 'https://via.placeholder.com/300x200?text=BMW%20X5' },
  { id: 2, name: 'Audi', model: 'A6', brand: 'Audi', image: 'https://via.placeholder.com/300x200?text=Audi%20A6' },
  { id: 3, name: 'BMW', model: 'X3', brand: 'BMW', image: 'https://via.placeholder.com/300x200?text=BMW%20X3' },
  { id: 4, name: 'Mercedes', model: 'C-Class', brand: 'Mercedes', image: 'https://via.placeholder.com/300x200?text=Mercedes%20C-Class' },
  { id: 5, name: 'Audi', model: 'Q7', brand: 'Audi', image: 'https://via.placeholder.com/300x200?text=Audi%20Q7' }
])

const selectedBrand = ref(null)

const uniqueBrands = computed(() => {
  const brands = cars.value.map(car => car.name)
  return [...new Set(brands)] // remove duplicates
})

const filteredCars = computed(() => {
  if (selectedBrand.value === null) return cars.value
  return cars.value.filter(car => car.name === selectedBrand.value);
})

const filterByBrand = (brand) => {
  if (selectedBrand.value && brand === selectedBrand.value) selectedBrand.value = null
  else selectedBrand.value = brand
}
</script>

<template>
  <div class="container">
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
</template>

<style scoped>
.car-grid {
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); */
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