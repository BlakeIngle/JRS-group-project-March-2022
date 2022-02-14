import React, { useContext, useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Button, Divider, TextField, Tooltip } from "@mui/material";
import "./UserPage.css";
import { useLocalStorage } from "../../services/localStorage.service";
import { Context } from "../../App";
import { useNavigate, useParams } from "react-router";
import { deepOrange } from "@mui/material/colors";
import { useApi } from "../../services/api.service";
import ChangePasswordForm from "./ChangePasswordForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Review from "../Review/Review";

export default function UserPage() {
  // const { dishName } = useParams();
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isReviewCardGone, setIsReviewCardGone] = useState(true);
  const [reviews, setReviews] = useState([]);
  const { state, setState } = useContext(Context);
  // const [dish, setDish] = useState(null);
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
    console.log(isChangePasswordOpen);
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
    console.log("deleting review", reviewId);
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
    } else {
      //not logged in
      navigate("/");
    }
  }, []);

  if (!state.user) {
    return <p>No user found</p>;
  }

  // const googleUrl =
  //   "https://www.google.com/maps/search/" + name + "@" + location;

  // const handleClick = () => {
  //   window.open(dishName);
  // };

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
      <br />
      <div className="favorites">{state.user.firstName}'s Favorite's:</div>
      {reviews.map((review) => (
        <Review
          key={review.id}
          {...review}
          deleteReviewCard={deleteReviewCard}
        />
      ))}
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
