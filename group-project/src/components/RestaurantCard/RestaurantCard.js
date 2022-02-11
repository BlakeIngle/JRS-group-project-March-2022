import React from "react";
import "./RestaurantCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function RestaurantCard({
  id,
  name,
  location,
  url,
  image_url,
  total_favorites,
}) {
  const { city, country, state, address1, address2, address3, zip_code } =
    location;
  const googleUrl =
    "https://www.google.com/maps/search/" + name + "@" + location.zip_code;

  const handleClick = () => {
    window.open(googleUrl);
  };
  return (
    <div className="restaurant-card-root">
      <div className="top-row">
        <span>
          <h2>{name}</h2>
        </span>
        <span>{total_favorites || 0}</span>
        <span className="links">
          <a onClick={handleClick}>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </a>
          <a href={url}>
            <img
              src="https://i.postimg.cc/d1QLsskm/yelp-logo-cmyk.png"
              height="15"
            />
          </a>
        </span>
      </div>
    </div>
  );
}
