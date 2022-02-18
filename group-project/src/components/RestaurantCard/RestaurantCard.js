import React, { useContext, useEffect, useState } from "react";
import "./RestaurantCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faMapMarkerAlt,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import ReviewForm from "../ReviewForm/ReviewForm";
import { Context } from "../../App";
import { useApi } from "../../services/api.service";
import { useNavigate } from "react-router";

export default function RestaurantCard({
  id,
  name,
  location,
  url,
  image_url,
  total_favorites,
  dishName
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

  const { city, country, stateName, address1, address2, address3, zip_code } =
    location;
  const googleUrl =
    "https://www.google.com/maps/search/" + name + "@" + location.zip_code;

  const handleClick = () => {
    window.open(googleUrl);
  };
  const handleYelpClick = () => {
    window.open(url);
  };

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

  useEffect(() => {
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
  }, [])

  return (
    <div className="restaurant-card-root">
      <div className="top-row">
        <span>
          <h2>{name}</h2>
        </span>
        <span className="links">
          <a onClick={handleClick}>

              <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />

          </a>
          <a onClick={handleYelpClick}>
            <img className="icon"
              src="https://i.postimg.cc/d1QLsskm/yelp-logo-cmyk.png"
              height="20px"
            />
          </a>
        </span>
      </div>
      <div className="reviews">
        <FontAwesomeIcon
          className="icon"
          icon={faThumbsUp}
          onClick={() => {
            submitReview();
          }} />
        <span>{total_favorites || 0} reviews</span>

      </div>

    </div>
  );
}
