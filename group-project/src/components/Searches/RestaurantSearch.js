import React, { useEffect, useState } from "react";
import { useApi } from "../../services/api.service";
import '../DishPage/Dishes.css'

export default function RestaurantSearch() {
  const http = useApi();

  var [inputText, setInputText] = useState("");
  var [restaurantsResults, setRestaurantsResults] = useState([]);

  const [searchTimeout, setSearchTimeout] = useState(null);

  function onInputChange(e) {
    setInputText(e.target.value);
  }

  useEffect(() => {
    clearTimeout(searchTimeout);

    setSearchTimeout(
      setTimeout(() => {
        if (inputText) {
          http
            .getRestrauntsByName(inputText)
            .then((results) => {
              if (results.data) {
                setRestaurantsResults(results.data.restaurants);
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }, 1500)
    );
  }, [inputText]);

  return (
    <div className="restaurant search">
      <input type="text" value={inputText}
        onChange={onInputChange}
      placeholder="Search restaurants"/>
      <span>
        <Restaurants restaurants={restaurantsResults} />
      </span>
    </div>
  );
}

function Restaurants({ restaurants }) {
  return (
    <div className="restaurant">
      {restaurants.map((restaurant) => (
        <Restaurant key={restaurant.id} name={restaurant.name} />
      ))}
    </div>
  );
}

function Restaurant({ name }) {
  return (
    <div>
      <h3>{name}</h3>
    </div>
  );
}
