import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import "../SignUpPage/LoginSignUp.css";
import { Context } from "../../App";
import { useApi } from "../../services/api.service";
import { useLocalStorage } from "../../services/localStorage.service";
import { useToasts } from "../Toasts/ToastService";

export default function LoginPage() {
  return (
    <div className="login">
      <h2 className="login-header">Login</h2>
      <LoginForm />
      <hr />

      <Link to="/signup">
        <button type="button" className="secondary-button">Sign Up</button>
      </Link>
      {/*<a href="#" className="forgotPassword">
        Forgot My Username/Password
      </a>*/}
    </div>
  );
}

function LoginForm() {
  var { state, setState } = useContext(Context);
  const toast = useToasts();
  const storage = useLocalStorage();
  const api = useApi();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const animationTime = 300;

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
      api
        .login(user)
        .then((res) => {
          storage.saveUser(res.data.user);
          setState({ ...state, user: res.data.user });
          navigate(`/profile`);
        })
        .catch((err) => {
          console.error(err);
          toast.warn("Email and Password are incorrect!");
          setUser({ email: "", password: "" });

          setTimeout(() => {
            emailRef.current.classList.remove("shake");
            passwordRef.current.classList.remove("shake");
          }, animationTime);
        });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-inputs">
        {/* <div className="email"> */}
        <label>Email</label>
        <input
          ref={emailRef}
          type="text"
          name="email"
          value={user.email}
          style={{ "--animationTime": `${animationTime}ms` }}
          onChange={handleChange}
          placeholder="Email"
        />
        <label>Password</label>
        <input
          ref={passwordRef}
          type="password"
          name="password"
          value={user.password}
          style={{ "--animationTime": `${animationTime}ms` }}
          onChange={handleChange}
          placeholder="Password"
        />
      </div>
      <br />
      <button
        className="primary-button"
        type="submit"
        disabled={!user.email || !user.password}
      >
        Login
      </button>
    </form>
  );
}
