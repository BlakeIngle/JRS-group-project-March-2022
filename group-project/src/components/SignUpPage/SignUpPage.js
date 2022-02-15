import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignUp.css";

import { useApi } from "../../services/api.service";
import { useLocalStorage } from "../../services/localStorage.service";

export default function SignUpPage() {
  const navigate = useNavigate();
  const api = useApi();
  var storage = useLocalStorage();
 
  function attemptSignUp(user) {
    api
      .createNewUser(user)
      .then((res) => {
        const user = res.data.user;
        storage.saveUser(user);
        navigate(`/profile`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="signup">
      <h2 className="signup-header">Sign Up</h2>
      <SignUpForm onSubmit={attemptSignUp} api={api} />
      <div className="form-message">Already have an account?</div>
      <Link to="/login">
        <button type="button">Login</button>
      </Link>
    </div>
  );
}

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
