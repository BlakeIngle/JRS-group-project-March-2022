import React from "react";

const api = {
  saveUser: (user) => {
    console.log(user);
    const value = JSON.stringify(user);
    localStorage.setItem("activeUser", value);
  },
  getActiveUser: () => {
    return JSON.parse(localStorage.getItem("activeUser"));
  },
  removeActiveUser: () => {
    localStorage.removeItem("activeUser");
  },
};

function useLocalStorage() {
  return api;
}
export { useLocalStorage };
