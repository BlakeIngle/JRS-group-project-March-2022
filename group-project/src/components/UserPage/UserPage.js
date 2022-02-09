import React, { useContext, useEffect } from "react";
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
} from "@mui/material";
import { Emojis } from "../../assets/DishIcon";
import "./UserPage.css";
import { useLocalStorage } from "../../services/localStorage.service";
import { Context } from "../../App";
import { useNavigate } from "react-router";

export default function UserPage() {
  const { state, setState } = useContext(Context);

  const navigate = useNavigate();

  const storage = useLocalStorage();

  function logoutClicked() {
    // log out
    setState({ ...state, user: null });
    storage.removeActiveUser();
    navigate("/"); // 'home' page
  }

  useEffect(() => {
    if (state.user) {
      console.log("use effect state variable");
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
    <div className="userPage-root">
      <div className="userPage">
        <Avatar
          sx={{
            backgroundColor: "lightblue",
            width: 80,
            height: 80,
            margin: "1rem",
            color: "black",
          }}
        >
          {state.user.firstName}
        </Avatar>

        <h2 className="welcome">Welcome {state.user.firstName}</h2>
      </div>
      <Divider />

      <div className="favorites">{state.user.firstName}'s Favorites List: </div>
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
              {state.user.firstName}
            </Link>
          </CardContent>
          <CardActionArea sx={{ padding: "1rem" }}>
            {state.user.email}
          </CardActionArea>
        </Card>
      </div>
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
        <TextField
          type="password"
          label="Current Password"
          variant="outlined"
          sx={{ display: "flex", marginTop: "1rem" }}
        />
        <TextField
          type="password"
          label="New Password"
          variant="outlined"
          sx={{ display: "flex", marginTop: "1rem" }}
        />
        <TextField
          type="password"
          label="Confirm New Password"
          variant="outlined"
          sx={{ display: "flex", marginTop: "1rem" }}
        />
        <br />
        <Button variant="contained">Save</Button>
        <Divider />

        <Button
          variant="contained"
          startIcon={<LogoutIcon />}
          sx={{ position: "absolute", right: 0 }}
          onClick={logoutClicked}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
