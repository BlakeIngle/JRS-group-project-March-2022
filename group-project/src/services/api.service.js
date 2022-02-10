const axios = require("axios");
const URL = `http://localhost:8080/api`;

function getRestrauntsByName(name) {
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
  getAllDishes: () => {
    return axios.get(`${URL}/dishes`);
  },
  getUserByEmail: (email) => {
    return axios.get(`${URL}/users/email/${email}`);
  },
  getDishById: (dishId) => {
    return axios.get(`${URL}/dishes/${dishId}`);
  },
  getRestrauntsByName,
  getReviewByUserId: (userId) => {
    return axios.get(`${URL}/reviews/${userId}`);
  },
  getRestaurantsByDishId: (dishId) => {
    return axios.get(`${URL}/restaurants/${dishId}`);
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
};

function useApi() {
  return api;
}

export { useApi };
