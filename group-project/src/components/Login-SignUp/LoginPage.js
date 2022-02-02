import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
// import { Context } from "../App";
import "../Login-SignUp/LoginPage.css";

export default function LoginPage() {
  return (
    <div className="login-root">
      <h2 className="login-header">Login</h2>
      <LoginForm />
      <Link to="/signup">
        <button type="button">Signup</button>
      </Link>
      <a href="#" className="forgotPassword">Forgot My Username/Password</a>
    </div>
  );
}

function LoginForm() {
  // let { http, state, setState, localStorageService } = useContext(Context);
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

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
      // onSubmit(user);
      // {
      //   http
      //     .login(user)
      //     .then((res) => {
      //       // localStorageService.saveUser(res.data.user);
      //       // setState({ ...state, user: res.data.user });
      //       // navigate(`/user/${res.data.user.id}`);
      //     })
      //     .catch((err) => {
      //       //maybe status code 404 misspelled email
      //       //maybe 4xx -> good email, bad password
      //       // console.error(err);

      //       setUser({ email: "", password: "" });
      //     });
      // }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Email: </label>
      <input
        ref={emailRef}
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <br />
      <label>Password: </label>
      <input
        ref={passwordRef}
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Password"
      />

      <br />
      <button type="submit" disabled={!user.email || !user.password}>
        Login
      </button>
    </form>
  );
}
