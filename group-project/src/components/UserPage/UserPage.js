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
import { useGeolocation } from "../../services/geolocation.service";

export default function UserPage() {
  const { dishName } = useParams();
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { state, setState } = useContext(Context);
  const [originalResults, setOriginalResults] = useState([]); // the first list of restaurants from coordinates
  const api = useApi();
  const navigate = useNavigate();
  const storage = useLocalStorage();
  const getCoordinatesPromise = useGeolocation();

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

  function getRestaurantsByLatLong(latitude, longitude) {
    api
      .getRestaurantsByDish(dishName, { latitude, longitude })
      .then((results) => {
        setOriginalResults(results.data.restaurants);
        return results.data.restaurants;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getCoordinatesPromise.then(async ({ latitude, longitude }) => {
      await getRestaurantsByLatLong(latitude, longitude);
      setOriginalResults([])
    });
  }, []);

  if (!state.user) {
    return <p>No user found</p>;
  }

  
  const firstName = state.user.firstName;
  const email = state.user.email;

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
            {state.user.firstName.charAt(0).toUpperCase()}
          </p>
        </Avatar>
        <h2 className="welcome">Welcome, {firstName ? firstName : email}!</h2>
      </div>
      <Divider />
      <br />
      <div className="favorites">{firstName ? firstName : email}'s Favorites:</div>
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
          disabled
          label="First Name"
          defaultValue={state.user.firstName}
          type="text"
          variant="outlined"
          sx={{ display: "flex", marginTop: "1rem" }}
        />
        <TextField
          disabled
          label="Email"
          defaultValue={state.user.email}
          type="email"
          variant="outlined"
          sx={{ display: "flex", marginTop: "1rem" }}
        />

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
