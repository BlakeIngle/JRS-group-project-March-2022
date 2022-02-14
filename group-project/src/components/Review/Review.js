import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBan } from "@fortawesome/free-solid-svg-icons";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Emojis } from "../../assets/DishIcon";

export default function Review({ id, body, dish, deleteReviewCard }) {
  return (
    <div className="favorites-box">
      <div className="rest-title">
        <a>{id}</a>
      </div>
      <div className="favorite-card-review">{body}</div>
      <div className="icon">{Emojis[dish]}</div>
      <div className="delete-favorite">
        <FontAwesomeIcon icon={faBan} onClick={() => {
          deleteReviewCard(id);
        }} />
      </div>
      <div className="favorite-icon">
        <FavoriteIcon icon={faHeart} />
      </div>
    </div>
  );
}
