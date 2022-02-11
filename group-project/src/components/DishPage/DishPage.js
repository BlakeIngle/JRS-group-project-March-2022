import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Emojis } from "../../assets/DishIcon";
import { useApi } from "../../services/api.service";
import "../DishPage/Dishes.css";
import { useGeolocation } from "../../services/geolocation.service";
import RestaurantSearch from "../Searches/RestaurantSearch";
import RestaurantCard from "../RestaurantCard/RestaurantCard";

export default function DishPage() {
  const { dishName } = useParams();
  const api = useApi();
  const getCoordinatesPromise = useGeolocation();

  const [dish, setDish] = useState(null);
  const [hasReviews, setHasReviews] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  function getDish() {
    api
      .getDishByName(dishName)
      .then((res) => {
        const dish = res.data.dish;
        setDish(dish);
        // api.getTopRestaurants(res.data.id)
        // .then(res => {
        //      setRestaurants(res.data.restaurants)
        // })
        // .catch(err => {
        //     console.error(err)
        // })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getRestaurantsByLatLong(latitude, longitude) {
    api
      .getRestaurantsByDish(dishName, { latitude, longitude })
      .then((results) => {
        setRestaurants(results.data.restaurants);
      })
      .catch((err) => {
        console.error(err);
        // get restaurants by some zip code ???
      });
  }

  useEffect(() => {
    getDish();
    getCoordinatesPromise.then(({ latitude, longitude }) => {
      getRestaurantsByLatLong(latitude, longitude);
    });
  }, []);

  // console.log(dishName);

  return (
    <div>
      <div className="dish-page-root">
        <h2 className="dish-name">
          {Emojis[dish?.name]}The Forking Best {dish?.name}
          {Emojis[dish?.name]}
        </h2>
        <hr />
        <div className="restaurant-list">
          {restaurants.map((r) => (
            <RestaurantCard key={r.id} {...r} />
          ))}
        </div>
      </div>
      {!hasReviews && (
        <div>
          <br />
          <p className="placeholder-text">Be the first to review this dish!</p>
        </div>
      )}
      {/* RestaurantCards go here */}
    </div>
  );
}
