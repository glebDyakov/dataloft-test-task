import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    cars: [],
    carDetails: null,
    isLoading: false,
  },
  mutations: {
    SET_CARS(state, cars) {
      state.cars = cars;
    },
    SET_CAR_DETAILS(state, carDetails) {
      state.carDetails = carDetails;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading
    },
  },
  actions: {
    async fetchCarList({ commit }) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get('https://am111.05.testing.place/api/v1/cars/list')
        commit('SET_CARS', response.data)
        commit('SET_LOADING', false)
      } catch (error) {
        console.error('Error fetching car list:', error)
      }
    },
    async fetchCarDetails({ commit }, carId) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`http://am111.05.testing.place/api/v1/car/${carId}`)
        commit('SET_CAR_DETAILS', {
          car: response.data.car,
          seller: response.data.user,
        })
        commit('SET_LOADING', false);
      } catch (error) {
        console.error('Error fetching car details:', error)
      }
    },
    async fetchCarPosts({ state, commit }, carId) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(`http://am111.05.testing.place/api/v1/car/${carId}/posts`)
        commit('SET_CAR_DETAILS', {
          ...state.carDetails,
          car: {
            ...state.carDetails.car,
            posts: response.data.posts,
          },
        })
        commit('SET_LOADING', false);
      } catch (error) {
        console.error('Error fetching car details:', error)
      }
    },
  },
  getters: {
    cars: (state) => state.cars,
    carDetails: (state) => state.carDetails,
    isLoading: (state) => state.isLoading,
  },
})
