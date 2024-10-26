import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    cars: [],
    carDetails: null,
    postDetails: null,
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
    SET_POST_DETAILS(state, postDetails) {
      state.postDetails = postDetails;
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
    async fetchPostDetails({ commit }, postId) {
      commit('SET_LOADING', true);
      try {
        const response = await axios.get(`http://am111.05.testing.place/api/v1/post/${postId}`);
        commit('SET_POST_DETAILS', {
          ...response.data.post,
          comments: response.data.comments,
        });
      } catch (error) {
        console.error('Error fetching post details:', error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
  },
  getters: {
    cars: (state) => state.cars,
    carDetails: (state) => state.carDetails,
    postDetails: (state) => state.postDetails,
    isLoading: (state) => state.isLoading,
  },
})
