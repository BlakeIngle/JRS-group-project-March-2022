import React, { useContext } from "react";
import "./HomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet } from "react-router-dom";
import { Context } from "../../App";

export default function HomePage() {
  return (
    <div className="home-page-root">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

function Header() {
  const { state } = useContext(Context);

  return (
    <div className="header-root">
      <Link to="/">
        <span className="app-name">The Forking Best</span>
      </Link>
      <span className="user-options">
        {state.user ? (
          <Link to={`/user/${state.user.id}`}>
            <span className="icon">
              <FontAwesomeIcon icon={faUser} />
            </span>
          </Link>
        ) : (
          <Link to="/login">
            <span className="login">Login</span>
          </Link>
        )}
      </span>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer-root">
      <div className="icon">
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </div>
  );
}
