import React, { useContext, useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Link,
  TextField,
  Tooltip,
} from "@mui/material";
import { Emojis } from "../../assets/DishIcon";
import "./UserPage.css";
import { useLocalStorage } from "../../services/localStorage.service";
import { Context } from "../../App";
import { useNavigate } from "react-router";
import { deepOrange } from "@mui/material/colors";
import { useApi } from "../../services/api.service";
import ChangePasswordForm from "./ChangePasswordForm";

export default function UserPage({ userId }) {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { state, setState } = useContext(Context);
  const api = useApi();
  const navigate = useNavigate();
  const storage = useLocalStorage();

  function logoutClicked() {
    // log out
    setState({ ...state, user: null });
    storage.removeActiveUser();
    navigate("/"); // 'home' page
  }

  function togglePasswordChangeAccordion() {
    setIsChangePasswordOpen(!isChangePasswordOpen);
  }

  function getReviewsById() {
    api
      .getReviewByUserId(state.user.id)
      .then((res) => {
        setReviews(res.data.reviews);
        console.log("Review data:", res.data.reviews);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getReviewsById();
  }, []);

  useEffect(() => {
    if (state.user) {
      // console.log("use effect state variable");
      // someone is loggin in and viewing their own page
      // show the logout button
    } else {
      //not logged in
      navigate("/");
    }
  }, []);

  if (!state.user) {
    return <p>No user found</p>;
  }

  return (
    <div className="user-page-root">
      <div className="top-section">
        <Avatar
          sx={{
            bgcolor: deepOrange[500],
            width: 80,
            height: 80,
            margin: "1rem",
            color: "black",
          }}
        >
          <p style={{ fontSize: "3.1rem" }}>
            {state.user.firstName.charAt(0).toUpperCase()}
          </p>
        </Avatar>
        <h2 className="welcome">Welcome, {state.user.firstName}!</h2>
      </div>
      <Divider />
      <div className="favorites">{state.user.firstName}'s Favorite's:</div>
      {reviews.map((review) => {
        return (
          <div className="favorites-box">
            <div className="favorite-card-review">{review.body}</div>

            <div className="icon">
              {Emojis.burger}
              {review.dishId}
            </div>
            <div className="favorite-icon">
              <FavoriteIcon />
            </div>
            <div className="rest-title">
              <Link
                href="https://www.poestavern.com/"
                target="_blank"
                rel="noopener"
              >
                {review.restaurantId}
              </Link>
            </div>
          </div>
        );
      })}

      <br />
      <br />
      <div className="editInformation">
        <Divider />
        <h4 style={{ display: "flex", textDecoration: "underline" }}>
          Profile Information
        </h4>

        <TextField
          disabled="disabled"
          label="First Name"
          defaultValue={state.user.firstName}
          type="text"
          variant="outlined"
          sx={{ display: "flex", marginTop: "1rem" }}
        />
        <TextField
          disabled="disabled"
          label="Email"
          defaultValue={state.user.email}
          type="email"
          variant="outlined"
          sx={{ display: "flex", marginTop: "1rem" }}
        />

        <div className="dropDown">
          <br />
          <Tooltip title="Edit Password" arrow>
            <Button variant="outlined" onClick={togglePasswordChangeAccordion}>
              <p className="rightIcon">Change Password</p>
            </Button>
          </Tooltip>
          {isChangePasswordOpen && (
            <ChangePasswordForm
              user={state.user}
              close={togglePasswordChangeAccordion}
            />
          )}
        </div>

        <Divider />

        <Button
          variant="contained"
          startIcon={<LogoutIcon />}
          sx={{ marginTop: "1.5rem" }}
          onClick={logoutClicked}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
