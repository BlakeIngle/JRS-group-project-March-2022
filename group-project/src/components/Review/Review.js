import React from "react";
import "../UserPage/UserPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router";
import { Emojis } from "../../assets/DishIcon";

export default function Review({
  id,
  name,
  body,
  url,
  // location,
  dish,
  image_url,
  total_favorites,
  deleteReviewCard,
  restaurantName,
}) {
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(showPosition);
  // } else {
  //   alert("Geolocation not supported in this browser");
  // }

  // function showPosition(position) {
  //   // console.log(position);
  //   // console.log("Lat:" + position.coords.latitude);
  //   // console.log("Long:" + position.coords.longitude);
  // }

  const location = useLocation();

  const { city, country, state, address1, address2, address3, zip_code } =
    location;

  const googleUrl = "https://www.google.com/maps/search/" + restaurantName;

  const handleClick = () => {
    window.open(googleUrl);
  };
  const handleYelpClick = () => {
    window.open("https://www.yelp.com");
  };

  return (
    <div className="restaurant-card-root">
      <div className="top-row">
        <span>
          <h2>{restaurantName}</h2>
        </span>
        {/* <span>{total_favorites || 0}</span> */}
        <span className="favorite-card-review"> {body}</span>
        <span className="links">
          <a onClick={handleClick}>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </a>
          <a style={{ marginRight: "1rem" }} onClick={handleYelpClick}>
            <img
              src="https://i.postimg.cc/d1QLsskm/yelp-logo-cmyk.png"
              height="15"
            />
          </a>
          <FontAwesomeIcon
            className="delete-favorite"
            icon={faBan}
            onClick={() => {
              deleteReviewCard(id);
            }}
          />
          <span className="emoji-icon">{Emojis[dish]}</span>
        </span>
      </div>
    </div>
  );
}
