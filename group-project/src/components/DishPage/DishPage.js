import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Emojis } from "../../assets/DishIcon";
import { useApi } from "../../services/api.service";
import "../DishPage/Dishes.css";
import { useGeolocation } from "../../services/geolocation.service";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import ReviewForm from "../ReviewForm/ReviewForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import RestaurantCard from "../RestaurantCard/RestaurantCard";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Loader from "../Loader/Loader";
import { Context } from "../../App";

export default function DishPage() {
  const { dishName } = useParams();
  const api = useApi();
  const getCoordinatesPromise = useGeolocation();
  const { state } = useContext(Context);

  const [dish, setDish] = useState(null);
  const [restaurants, setRestaurants] = useState([]); // the displayed list
  const [originalResults, setOriginalResults] = useState([]); // the first list of restaurants from coordinates
  const [searchTimeout, setSearchTimeout] = useState(null);
  var [inputText, setInputText] = useState("");
  const [formIsOpen, setFormIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true);

  function getDish() {
    api
      .getDishByName(dishName)
      .then((res) => {
        const dish = res.data.dish;
        setDish(dish);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /**
   * Set original results of restaurants. Should only be called once on init
   * @param {*} latitude
   * @param {*} longitude
   */
  function getRestaurantsByLatLong(latitude, longitude) {
    api
      .getRestaurantsByDish(dishName, { latitude, longitude })
      .then((results) => {
        setOriginalResults(results.data.restaurants);
      })
      .catch((err) => {
        console.error(err);
        // get restaurants by some zip code ???
      });
  }

  function getRestaurantsByZipCode(inputText) {
    api
      .getRestaurantsByDish(dishName, inputText)
      .then((results) => {
        setRestaurants(results.data.restaurants);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function toggleForm() {
    setFormIsOpen(!formIsOpen);
  }

  useEffect(() => {
    getDish();
    if (!inputText) {
      setRestaurants(originalResults);
    } else {
      clearTimeout(searchTimeout);
      setSearchTimeout(
        setTimeout(() => {
          setIsLoading(true);
          getRestaurantsByZipCode(inputText);
        }, 1500)
      );
    }
  }, [inputText]);

  useEffect(() => {
    setRestaurants(originalResults);
  }, [originalResults]);

  useEffect(() => {
    if (restaurants.length > 0) {
      setIsLoading(false);
    }
  }, [restaurants]);

  useEffect(() => {
    getCoordinatesPromise.then(({ latitude, longitude }) => {
      getRestaurantsByLatLong(latitude, longitude);
    });
  }, []);

  return (
    <div>
      <div className="dish-page-root">
        <h2 className="dish-name">
          {Emojis[dish?.name]}The Forking Best {dish?.name}
          {Emojis[dish?.name]}
        </h2>
        <hr />
        {/* {!hasReviews && (
        <div>
          <br />
          <p className="placeholder-text">Be the first to review this dish!</p>
        </div>
      )} */}
        <div className="dish-page-options">
          <div className="zip-code-form">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <input
              type="text"
              className="zip-code-input"
              name="location"
              placeholder="New Zip Code..."
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
            />
          </div>
          {state.user ? <div className="add-review-btn"
            onClick={toggleForm}>
            Add A Review
          </div>
            : <div className="add-review-btn"
              style={{filter: "opacity(40%"}}>
              Login to review
            </div>}
        </div>
        {formIsOpen && <ReviewForm toggleForm={toggleForm} />}
        {isLoading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div className="restaurant-list">
            {restaurants.map((r) => (
              <RestaurantCard key={r.id} {...r} />
            ))}
          </div>
        )}
      </div>

      {/* RestaurantCards go here */}
    </div>
  );
}
