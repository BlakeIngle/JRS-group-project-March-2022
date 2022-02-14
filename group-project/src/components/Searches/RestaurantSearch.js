import React, { useEffect, useState } from "react";
import { useApi } from "../../services/api.service";
// import '../DishPage/Dishes.css'

export default function RestaurantSearch({ restaurantName, setRestaurantName }) {

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
            .getRestaurantsByName(inputText)
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

  useEffect(() => {
    setRestaurantsResults([]);
    setInputText("")
  }, [restaurantName]);

  return (
    <div className="search-root">
      <input className='text-input' type="text" value={inputText}
        onChange={onInputChange}
        placeholder="Search restaurants"
      />
      <Restaurants restaurants={restaurantsResults} />
    </div>
  );


  function Restaurants({ restaurants }) {
    return (
      <div className="restaurants-list">
        {restaurants.map((restaurant) => (
          <Restaurant key={restaurant.id} name={restaurant.name} address={restaurant.location.address1} />
        ))}
      </div>
    );
  }

  function Restaurant({ name, address }) {

    function updateRestaurant() {
      setRestaurantName(name)
    }
    return (
      <div className="restaurant"
        onClick={updateRestaurant}>
        <div>{name}</div> <div className='address'>{address}</div>
      </div>
    );
  }

}