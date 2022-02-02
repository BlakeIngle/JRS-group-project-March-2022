import React from "react";
import "./ReviewCard.css";
import dishIcons from "../../assets/dishEmoji.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faMapMarkerAlt,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function ReviewCard(review) {
  review = {
    userId: "1",
    userName: "Greg",
    body: "It's simply the best, better than all the rest",
    restaurantId: "fd7843wnk393",
    restaurantName: "Poe's Tavern",
    dishId: 1,
  };

  const dishIcon = dishIcons[review.dishId - 1].emoji;

  return (
    <div className="review-card-root">
      <div className="top-row">
        <span className="dish-icon">{dishIcon}</span>
        <span>
          <h2>{review.restaurantName}</h2>
        </span>
        <span className="links">
          <Link to="/map">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </Link>
          <FontAwesomeIcon icon={faExternalLinkAlt} />
        </span>
      </div>

      <p>
        {review.userName} says: "{review.body}"
      </p>
      <div className="agree-icon">
        <FontAwesomeIcon icon={faThumbsUp} />
      </div>
    </div>
  );
}
