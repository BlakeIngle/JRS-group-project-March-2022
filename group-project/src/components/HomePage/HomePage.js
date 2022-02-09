import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import './HomePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, Outlet } from 'react-router-dom';

const userLoggedIn = false;

export default function HomePage() {

    const location = useLocation();

    const splitPath = location.pathname.split("/")[1];

    const footerRef = useRef(null);

    useEffect(() => {
        // make footer visible if url is "/dishes/..."
        if (splitPath == "dishes") {
            footerRef.current.classList.add("visible")
        };
    }, [location])

    return (
        <div className='home-page-root'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );

    function Header() {

        return (
            <div className='header-root'>
                <Link to="/">
                    <img className='logo' src="https://i.postimg.cc/T3bd2sHn/forkingbest-logo-white-rgb-100px-72ppi.png"></img>
                    <span className='app-name'>The Forking Best</span>
                </Link>
                <Link to="/login">
                    <span className='user-options'>
                        {userLoggedIn ? <span className='icon'><FontAwesomeIcon icon={faUser} /></span>
                            : <span className='login'>Login</span>}
                    </span>
                </Link>
            </div>
        )
    }


    function Footer() {

        function handleClick() {
            // add a new review
        }

        return (
            <div className='footer-root' ref={footerRef}>
                <div className='icon'
                    onClick={handleClick}>
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            </div>
        )
    }

}