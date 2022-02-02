import React, { useState } from "react";
import "../HomePage/HomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

export default function HomePage({ children }) {
    return (
        <div className="home-page-root">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

function Header() {
    const city = "Charleston, SC";

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="header-root">
            <Link to="/">
                <span className="app-name">The Forking Best</span>
            </Link>
            <Link to="/login">
                <span className="icon">
                    {isLoggedIn && <FontAwesomeIcon icon={faUser} />}
                    {!isLoggedIn && (
                        <button type="button" className="login-homepage-button">
                            Login
                        </button>
                    )}
                </span>
            </Link>

            
        </div>
    );
}

function Footer() {
    return (
        <div className="footer-root">
            {/* <span className='icon'><FontAwesomeIcon icon={faSearch} /></span> */}
            <span className="icon">
                <FontAwesomeIcon icon={faPlus} />
            </span>
        </div>
    )
}