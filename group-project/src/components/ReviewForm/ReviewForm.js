import React, { useContext, useEffect, useRef, useState } from "react";
import "./ReviewForm.css";
import RestaurantSearch from "../Searches/RestaurantSearch";
import { useLocation } from "react-router";
import { Emojis } from "../../assets/DishIcon";
import { useApi } from "../../services/api.service";
import { Context } from "../../App";

export default function ReviewForm({ toggleForm }) {
  const location = useLocation();
  const api = useApi();
  const { state } = useContext(Context);

  const dishName = location.pathname.split("/")[2].replaceAll("%20", " ");
  const [restaurantName, setRestaurantName] = useState(null);
  const [restaurant, setRestaurant] = useState({});
  const formRef = useRef(null);
  const [review, setReview] = useState({
    dishId: "",
    restaurantId: restaurant.id,
    userId: state.user.id,
    body: "",
    restaurantName: restaurant.name,
  });

  function handleCancel() {
    // formRef.current.classList.toggle("hidden")
    toggleForm();
    setRestaurantName(null);
  }

  function handleChange(e) {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(review);
    api
      .addNewReview(review)
      .then((res) => {
        toggleForm();
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
    // console.log(review);
  }, [restaurant]);

  useEffect(() => {
    api
      .getDishByName(dishName)
      .then((res) => {
        const dish = res.data.dish.id;
        setReview({
          ...review,
          dishId: dish,
        });
        // console.log(review);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="review-form-root" ref={formRef}>
      <h2>Who has the best {dishName}?</h2>
      <form onSubmit={handleSubmit}>
        {restaurantName && (
          <div className="user-selection">
            <div className="label">Your selection:</div>
            <div className="selected-restaurant">
              <span>{restaurantName}</span>
              <span>{Emojis[dishName]}</span>
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

  // function RestaurantSearch() {
  //     const http = useApi();

  //     var [inputText, setInputText] = useState("");
  //     var [restaurantsResults, setRestaurantsResults] = useState([]);

  //     const [searchTimeout, setSearchTimeout] = useState(null);

  //     function onInputChange(e) {
  //         setInputText(e.target.value);
  //     }

  //     useEffect(() => {
  //         clearTimeout(searchTimeout);

  //         setSearchTimeout(
  //             setTimeout(() => {
  //                 if (inputText) {
  //                     http
  //                         .getRestaurantsByName(inputText)
  //                         .then((results) => {
  //                             if (results.data) {
  //                                 setRestaurantsResults(results.data.restaurants);
  //                             }
  //                         })
  //                         .catch((err) => {
  //                             console.error(err);
  //                         });
  //                 }
  //             }, 1500)
  //         );
  //     }, [inputText]);

  //     return (
  //         <div className="search-root">
  //             <input className='text-input' type="text" value={inputText}
  //                 onChange={onInputChange}
  //                 placeholder="Search restaurants"
  //             />
  //             <Restaurants restaurants={restaurantsResults} />
  //         </div>
  //     );
  // }

  // function Restaurants({ restaurants }) {
  //     return (
  //         <div className="restaurants-list">
  //             {restaurants.map((restaurant) => (
  //                 <Restaurant key={restaurant.id} name={restaurant.name} address={restaurant.location.address1} />
  //             ))}
  //         </div>
  //     );
  // }

  // function Restaurant({ name, address }) {

  //     function updateRestaurant() {
  //         setRestaurantName(name)
  //     }
  //     return (
  //         <div className="restaurant"
  //             onClick={updateRestaurant}>
  //             <div>{name}</div> <div className='address'>{address}</div>
  //         </div>
  //     );
  // }
}
