import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignUp.css";

import { useApi } from "../../services/api.service";
import { useLocalStorage } from "../../services/localStorage.service";
import { Context } from "../../App";
import ReviewForm from "../ReviewForm/ReviewForm";
import { Emojis } from "../../assets/DishIcon";
import RestaurantSearch from "../Searches/RestaurantSearch";

export default function SignUpPage() {
  const { state, setState } = useContext(Context);
  const navigate = useNavigate();
  const api = useApi();
  var storage = useLocalStorage();
  const [isDialogOpen, setIsDialogOpen] = useState(false)


  function attemptSignUp(user) {
    api
      .createNewUser(user)
      .then((res) => {
        const user = res.data.user;
        storage.saveUser(user);
        setState({ ...state, user })
        setIsDialogOpen(true);
        // navigate(`/profile`);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
    <>
      <div className="signup">
        <h2 className="signup-header">Sign Up</h2>
        <SignUpForm onSubmit={attemptSignUp} api={api} />
        <div className="form-message">Already have an account?</div>
        <Link to="/login">
          <button type="button">Login</button>
        </Link>
      </div>

      {isDialogOpen && <NewUserDialog user={state.user} />}
    </>
  );


  function SignUpForm({ onSubmit, api }) {
    const [user, setUser] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    const [isEmailTaken, setIsEmailTaken] = useState(false);
    const [searchTimeout, setSearchTimeout] = useState(null);

    function handleChange(e) {
      //name property on input form
      let name = e.target.name;
      //value property on input form
      let value = e.target.value;

      setUser({
        ...user,
        [name]: value,
      });
    }

    function handleSubmit(e) {
      e.preventDefault();
      if (user.email && user.password) {
        onSubmit(user);
      }
    }

    useEffect(() => {
      clearTimeout(searchTimeout);

      setSearchTimeout(
        setTimeout(() => {
          if (user.email) {
            api
              .getUserByEmail(user.email)
              .then((res) => {
                setIsEmailTaken(true);
              })
              .catch((err) => {
                if (err.response.status === 404) {
                  setIsEmailTaken(false);
                } else {
                  console.error(err);
                }
              });
          }
        }, 1500)
      );
    }, [user.email]);

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-inputs">
          {/* <div className="firstName"> */}
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
          {/* </div> */}
          {/* <div className="signup-email"> */}
          {isEmailTaken && (
            <p className="error-message">*Email is already taken*</p>
          )}
          <label>Email *</label>
          <input
            type="text"
            className={isEmailTaken ? "email-taken" : " "}
            name="email"
            required
            value={user.email}
            onChange={handleChange}
            placeholder="Email..."
          />
          {/* </div> */}

          {/* <div className="signup-password"> */}
          <label>Password *</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password..."
          />
          {/* </div> */}
        </div>
        <br />
        <button type="submit" disabled={!user.email || !user.password}>
          Sign Up
        </button>
      </form>
    );
  }

  function NewUserDialog(user) {


    function toggleForm() {
      setIsDialogOpen(!isDialogOpen)
    }

    function getRandomDish() {
      let random = Math.floor(Math.random() * (Object.entries(Emojis).length + 1))
      const name = Object.entries(Emojis)[random][0]
      const emoji = Object.entries(Emojis)[random][1]
      const randomDish = {
        name,
        emoji
      }
      return randomDish;
    }

    const [randomDish, setRandomDish] = useState(getRandomDish());

    // useEffect(() => {
    //   randomDish = getRandomDish();
    // }, [])


    return (
      <div className="dialog-root">
        <div className="dialog-wrapper">
          <div className="dialog-container">
            <h2>Welcome to The Forking Best!</h2>
            <p>To get started, choose your favorite
              {/* <br /> */}
              {randomDish.emoji}<b>{randomDish.name}</b>{randomDish.emoji}
            </p>
            <ReviewForm randomDish={randomDish} toggleForm={toggleForm} />
            <div className="random-dish-btn">
              <span>Not a {randomDish.name} fan?</span>
              <button onClick={() => {
                setRandomDish(getRandomDish());
                console.log(randomDish);
              }
              }>Get a different random dish</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

}