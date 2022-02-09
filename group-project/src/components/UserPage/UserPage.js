import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Card, CardActionArea, CardContent, Link } from "@mui/material";
import { Emojis } from "../../assets/DishIcon";
import ProfileModal from "../Modal/ProfileModal";
import "./UserPage.css";

export default function UserPage() {
  let review = {
    userId: "1",
    userName: "Greg",
    body: "It's simply the best, better than all the rest",
    restaurantName: "Poe's Tavern",
  };


  return (
    <div className="userPage-root">
      <div className="userPage">
        <h2 className="welcome">WELCOME {review.userName}</h2>
        <ProfileModal />
      </div>
      <div className="favorites">{review.userName}'s Favorites List: </div>
      <div className="favoritesBox">
        <Card
          sx={{
            margin: "1rem",
            width: "45%",
            backgroundColor: "#ffffff88",
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
          }}
        >
          <CardActionArea>
            <FavoriteIcon
              className="favoriteIcon"
              sx={{ fontSize: 40, color: "red", display: "flex", width: "12%" }}
            />
            <div className="icon">{Emojis.burger}</div>
          </CardActionArea>
          <CardContent sx={{}}>
            <Link
              href="https://www.poestavern.com/"
              target="_blank"
              rel="noopener"
            >
              {review.restaurantName}
            </Link>
          </CardContent>
          <CardActionArea sx={{ padding: "1rem" }}>
            {review.body}
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}
