import React, { useContext, useEffect, useRef, useState } from "react";
import "./ReviewForm.css";
import RestaurantSearch from "../Searches/RestaurantSearch";
import { Navigate, useLocation, useNavigate } from "react-router";
import { Emojis } from "../../assets/DishIcon";
import { useApi } from "../../services/api.service";
import { Context } from "../../App";

export default function ReviewForm({ toggleForm, randomDish }) {
  const location = useLocation();
  const api = useApi();
  const navigate = useNavigate();
  const { state } = useContext(Context);
  const dishName = location.pathname.split("/")[2]?.replaceAll("%20", " ");

  const [restaurantName, setRestaurantName] = useState(null);
  const [restaurant, setRestaurant] = useState({});
  const formRef = useRef(null);
  const [review, setReview] = useState({
    dishId: "",
    restaurantId: restaurant.id,
    userId: state.user?.id,
    body: "",
    restaurantName: restaurant.name,
  });

  function handleCancel() {
    toggleForm();
    setRestaurantName(null);
    navigate(`/profile`);
  }

  function handleChange(e) {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    api
      .addNewReview(review)
      .then((res) => {
        toggleForm();
        randomDish && navigate(`/profile`);

      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    setReview({
      ...review,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
    });
  }, [restaurant]);

  useEffect(() => {
    if (randomDish) {
      api
      .getDishByName(randomDish.name)
      .then((res) => {
        const dish = res.data.dish.id;
        setReview({
          ...review,
          dishId: dish,
        });
      })
      .catch((err) => {
        console.error(err);
      });
    } else {
      api
        .getDishByName(dishName)
        .then((res) => {
          const dish = res.data.dish.id;
          setReview({
            ...review,
            dishId: dish,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);


  return (
    <div className="review-form-root" ref={formRef}>
      <h2>Who has the best {dishName ? dishName : randomDish.name}?</h2>
      <form onSubmit={handleSubmit}>
        {restaurantName && (
          <div className="user-selection">
            <div className="label">Your selection:</div>
            <div className="selected-restaurant">
              <div>{restaurantName}</div>
              {restaurant.location.address1 &&
                <div style={{ fontSize: "0.9rem", filter: "contrast(50%)" }}>{restaurant.location.address1}</div>}
              {/* <span>{Emojis[dishName]}</span> */}
            </div>
            <div className="review-body">
              <label className="label" htmlFor="reviewBody">
                Optional review:
              </label>
              <textarea
                className="text-input"
                name="body"
                maxLength={255}
                value={review.body}
                onChange={handleChange}
              ></textarea>
              {/* <input className='text-input' type="text" name="reviewBody"></input> */}
              <div className=" label char-limit">(255 char max)</div>
            </div>
          </div>
        )}
        <RestaurantSearch
          restaurant={restaurant}
          setRestaurant={setRestaurant}
          restaurantName={restaurantName}
          setRestaurantName={setRestaurantName}
        />
        <div className="buttons">
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );

}
