const axios = require("axios");
const URL = `http://localhost:8080/api`;

function getRestaurantsByName(name) {
  return axios.get(`${URL}/restaurants?name=${name}`);
}

const api = {
  login: (user) => {
    return axios.post(`${URL}/users/login`, user);
  },
  createNewUser: (user) => {
    return axios.post(`${URL}/users/signup`, user);
  },
  updateUser: (user) => {
    return axios.put(`${URL}/users/${user.id}`, user);
  },
  getUserByEmail: (email) => {
    return axios.get(`${URL}/users/email/${email}`);
  },

  getAllDishes: () => {
    return axios.get(`${URL}/dishes`);
  },
  getDishById: (dishId) => {
    return axios.get(`${URL}/dishes/${dishId}`);
  },

  getDishByName: (dishName) => {
    return axios.get(`${URL}/dishes/${dishName}`);
  },

  getReviewByUserId: (userId) => {
    return axios.get(`${URL}/reviews/${userId}`);
  },
  getReviewsByRestaurantId: (restaurantId) => {
    return axios.get(`${URL}/reviews/${restaurantId}`);
  },
  addNewReview: (review) => {
    return axios.post(`${URL}/reviews`, review);
  },
  updateReview: (review) => {
    return axios.put(`${URL}/reviews/${review.id}`, review);
  },
  deleteReview: (review) => {
    return axios.delete(`${URL}/reviews/${review.id}`);
  },

  getRestaurantsByDish: (dishName, location) => {
    if (location.latitude && location.longitude) {
      return axios.get(
        `${URL}/restaurants/${dishName}?latitude=${location.latitude}&longitude=${location.longitude}`
      );
    } else {
      // location = 'new york' or 'NYC' or '29470' etc.
      return axios.get(`${URL}/restaurants/${dishName}?location=${location}`);
    }
  },

  getRestaurantsByName,
};

function useApi() {
  return api;
}

export { useApi };
