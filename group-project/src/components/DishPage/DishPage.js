import React, { useEffect } from "react";
import { Emojis } from "../../assets/DishIcon";
import { useApi } from "../../services/api.service";

export default function DishPage({ dishId, name, meal, cuisine }) {
  const api = useApi();

  function getDishes() {
    api
      .getAllDishes()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getDishes();
  }, []);

  // const dishId = 1;
  // const dishIcon = dishIcons[(dishId - 1)].emoji;

  return (
    <div className="dish-page-root">
      <h2>Restaurant</h2>
      {/* RestaurantCards go here */}
    </div>
  );
}
