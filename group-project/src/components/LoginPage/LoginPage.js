import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import "./LoginPage.css";
import { Context } from "../../App";
import { useApi } from "../../services/api.service";
import { useLocalStorage } from "../../services/localStorage.service";

export default function LoginPage() {
  return (
    <div className="login">
      <h2 className="login-header">Login</h2>
      <LoginForm />
      <Link to="/signup">
        <button type="button">Signup</button>
      </Link>
      <br />
      {/*<a href="#" className="forgotPassword">
        Forgot My Username/Password
      </a>*/}
    </div>
  );
}

function LoginForm() {
  var { state, setState } = useContext(Context);

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
          navigate(`/user/${res.data.user.id}`);
        })
        .catch((err) => {
          console.error(err);

          emailRef.current.classList.add("shake");
          passwordRef.current.classList.add("shake");

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
      <label>Email: </label>
      <input
        ref={emailRef}
        type="text"
        name="email"
        value={user.email}
        style={{ "--animationTime": `${animationTime}ms` }}
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
        style={{ "--animationTime": `${animationTime}ms` }}
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
