import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    cars: [],
    isLoading: false,
  },
  mutations: {
    SET_CARS(state, cars) {
      state.cars = cars;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async fetchCarList({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await axios.get('https://am111.05.testing.place/api/v1/cars/list')
        commit('SET_CARS', response.data)
      } catch (error) {
        console.error('Error fetching car list:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },
  },
  getters: {
    cars: (state) => state.cars,
    isLoading: (state) => state.isLoading,
  },
})
