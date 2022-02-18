import React, { useContext, useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Button, Divider, TextField, Tooltip } from "@mui/material";
import "./UserPage.css";
import { useLocalStorage } from "../../services/localStorage.service";
import { Context } from "../../App";
import { useNavigate } from "react-router";
import { deepOrange } from "@mui/material/colors";
import { useApi } from "../../services/api.service";
import ChangePasswordForm from "./ChangePasswordForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Review from "../Review/Review";

export default function UserPage() {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const [reviews, setReviews] = useState([]);
  const api = useApi();

  const { state, setState } = useContext(Context);
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

  function getReviews() {
    api
      .getReviewByUserId(state.user.id)
      .then((res) => {
        setReviews(res.data.reviews);
      })
      .catch((err) => {
        console.error(err.reponse);
      });
  }

  function deleteReviewCard(reviewId) {
    api
      .deleteReview(reviewId)
      .then((res) => {
        setReviews(reviews.filter((r) => r.id !== reviewId));
      })
      .catch((err) => {
        console.error(err.response);
      });
  }

  useEffect(() => {
    if (state.user) {
      getReviews();
    }
  }, [state.user]);

  if (!state.user) {
    return <p>No user found</p>;
  }

  const { firstName, email } = state.user;

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
            boxShadow: "0px 6px 5px #ccc;",
          }}
        >
          <p style={{ fontSize: "3.1rem" }}>
            {firstName.charAt(0).toUpperCase()}
          </p>
        </Avatar>
        <h2 className="welcome">Welcome, {firstName ? firstName : email}!</h2>
      </div>
      <Divider />
      <br />
      <div className="favorites">
        {firstName ? firstName : email}'s Favorites:
      </div>
      <div className="reviews-container">
        {reviews.map((r) => (
          <Review
            key={r.id}
            {...r}
            name={r.restaurantName}
            deleteReviewCard={deleteReviewCard}
          />
        ))}
      </div>
      <br />
      <br />
      <div className="editInformation">
        <Divider />
        <h4 style={{ textAlign: "center", textDecoration: "underline" }}>
          Profile Information
        </h4>
        <div className="profile-info">
          <TextField
            className="first-name"
            disabled
            label="First Name"
            defaultValue={firstName}
            type="text"
            variant="outlined"
            sx={{ display: "flex", marginTop: "1rem" }}
          />
          <TextField
            className="email"
            disabled
            label="Email"
            defaultValue={email}
            type="email"
            variant="outlined"
            sx={{ display: "flex", marginTop: "1rem" }}
          />
        </div>

        <div className="drop-down">
          <br />
          <Tooltip title="Edit Password" arrow>
            <Button
              className="right-icon"
              variant="contained"
              onClick={togglePasswordChangeAccordion}
            >
              <p>Change Password</p>
            </Button>
          </Tooltip>
          {isChangePasswordOpen && (
            <ChangePasswordForm
              user={state.user}
              close={togglePasswordChangeAccordion}
            />
          )}
        </div>

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
