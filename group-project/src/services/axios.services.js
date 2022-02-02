import React from 'react';
const axios = require("axios");
const URL = `http://localhost:8080/api`;

const api = {
  login: (user) => {
    return axios.post(`${URL}/users/login`, user);
  },
  createNewUser: (user) => {
    return axios.post(`${URL}/users/signup`, user);
  },
  updateUser: (user) => {
    return axios.put(`${URL}/users/${user.id}`, user);
  }
}

function useApi() {
  return api;
}


export {useApi};