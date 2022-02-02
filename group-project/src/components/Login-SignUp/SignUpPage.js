import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
// import { Context } from "../App";
import '../Login-SignUp/SignUpPage.css'

export default function SignUpPage() {
  //   const { http, localStorageService } = useContext(Context);
  const navigate = useNavigate();

  function attemptSignUp(user) {
    // http
    //   .createNewUser(user)
    //   .then((res) => {
    //     const user = res.data.user;
    //     console.log(user);
    //     localStorageService.saveUser(user);
    //     navigate(`/user/${user.id}`);
    //     // nav to new user's page
    //   })
    //   .catch((err) => {
    //     console.log("Error in Attempt SignUp Function", err);
    //   });
    // console.log("attempt sign up function");
  }

  return (
    <div>
      <div className="signup">
        <h2 className="signup-header">Sign Up</h2>
        <br />
        <SignUpForm onSubmit={attemptSignUp} />
        <Link to="/login">
          <button type="button">Login</button>
        </Link>
      </div>
    </div>
  );
}

function SignUpForm({ onSubmit }) {
  //   const { http } = useContext(Context);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isEmailTaken, setIsEmailTaken] = useState(false);

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

  //   useEffect(() => {
  //     http
  //       .getUserByEmail(user.email)
  //       .then((res) => {
  //         setIsEmailTaken(true);
  //       })
  //       .catch((err) => {
  //         if (err.response.status == 404) {
  //           setIsEmailTaken(false);
  //         } else if (err.response.status == 401) {
  //           setIsEmailTaken(true);
  //         } else {
  //           console.error(err);
  //         }
  //       });
  //   }, [user.email]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="firstName">
        <label> First Name: </label>
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
      </div>
      <div className="lastName">
        <label> Last Name: </label>
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
      </div>
      <div className="signup-email">
        {isEmailTaken && (
          <p className="error-message">*Email is already taken*</p>
        )}
        <label>Email:</label>
        <input
          type="text"
          className={isEmailTaken ? "email-taken" : " "}
          name="email"
          required
          value={user.email}
          onChange={handleChange}
          placeholder="Email..."
        />
      </div>

      <div className="signup-password">
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password..."
        />
      </div>
      <br />
      <button type="submit" disabled={!user.email || !user.password}>
        Sign Up
      </button>
    </form>
  );
}
