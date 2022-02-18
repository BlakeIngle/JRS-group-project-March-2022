import React, { useContext, useState } from "react";
import "./RestaurantCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faMapMarkerAlt,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../App";
import { useApi } from "../../services/api.service";
import { useNavigate } from "react-router";

export default function RestaurantCard({
  id,
  name,
  location,
  url,
  total_favorites,
}) {
  const api = useApi();
  const navigate = useNavigate();

  const { state, setState } = useContext(Context);

  const [review, setReview] = useState({
    dishId: "",
    restaurantId: "",
    userId: state.user?.id,
    body: "",
    restaurantName: "",
  });

  var googleUrl = "";
  if (location) {
    const { city, stateName, address1, address2, address3, zip_code } =
      location;
    googleUrl = `https://www.google.com/maps/place/${
      address1 ? address1 + "," : ""
    }${address2 ? address2 + "," : ""}${address3 ? address3 + "," : ""}${
      city ? city + "," : ""
    }${stateName ? stateName + "," : ""}${zip_code ? zip_code : ""}`;
  }

  function submitReview() {
    setReview({
      ...review,
      restaurantId: id,
      restaurantName: name,
    });
    api
      .addNewReview(review)
      .then((res) => {
        // toggleForm();
        navigate(`/profile`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="restaurant-card-root">
      <div className="top-row">
        <span>
          <h2>{name}</h2>
        </span>
        <span className="links">
          {googleUrl && (
            <a href={googleUrl} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />
            </a>
          )}
          {url && (
            <a href={url || "#"} target="_blank" rel="noopener noreferrer">
              <img
                className="icon"
                src="https://i.postimg.cc/d1QLsskm/yelp-logo-cmyk.png"
                height="20px"
              />
            </a>
          )}
        </span>
      </div>
      <div className="reviews">
        <FontAwesomeIcon
          className="icon"
          // icon={faThumbsUp}
          icon={faThumbsUp}
          onClick={() => {
            submitReview();
          }}
        />
        <span>{total_favorites || 0}</span>
      </div>
    </div>
  );
}
