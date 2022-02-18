import React from "react";
import "../UserPage/UserPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Emojis } from "../../assets/DishIcon";
import RestaurantCard from "../RestaurantCard/RestaurantCard";

export default function Review({
  id,
  name,
  body,
  url,
  location,
  image_url,
  deleteReviewCard,
  restaurantName,
}) {

  return (
    <div className="restaurant-card-root">
      <RestaurantCard id={id} name={restaurantName} location={location} url={url} image_url total_favorites dishName />
      {body && (
        <div className="favorite-card-review">
          <div>Your review:</div>
          <div>"{body}"</div>
        </div>
      )}
    </div>
  );
}