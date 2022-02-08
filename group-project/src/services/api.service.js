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

  getRestrauntsByName,
};

function useApi() {
  return api;
}

export { useApi };
