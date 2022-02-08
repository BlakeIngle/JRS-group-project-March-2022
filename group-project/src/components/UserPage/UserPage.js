import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Card, CardActionArea, CardContent, Link } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Emojis } from "../../assets/DishIcon";
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
        <h2>WELCOME {review.userName}</h2>
        <EditIcon
          sx={{
            display: "flex",
            alignContent: "right",
            justifyContent: "right",
          }}
        />
      </div>
      <div className="favorites">{review.userName}'s Favorites List: </div>
      <div className="favoritesBox">
        <Card
          sx={{
            margin: "1rem",
            width: "60%",
            backgroundColor: "#ffffff88",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <CardActionArea>
            <FavoriteIcon
              className="favoriteIcon"
              sx={{ fontSize: 40, color: "red", display: "flex", width: "12%" }}
            />
            <div className="icon">{Emojis.burger}</div>
          </CardActionArea>
          <CardContent>
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
