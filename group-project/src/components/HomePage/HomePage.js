import React, { useContext, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router';
import './HomePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, Outlet } from 'react-router-dom';
import { Context } from '../../App';

const userLoggedIn = false;

export default function HomePage() {

    const location = useLocation();

    const isDishPage = location.pathname.split("/")[1] === 'dish'

    const footerRef = useRef(null);

    useEffect(() => {
        // make footer visible if url is "/dishes/..."
        if (isDishPage) {
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

        const { state } = useContext(Context);

        return (
            <div className='header-root'>
                <Link to="/">
                    <img className='logo' src="https://i.postimg.cc/mDNJ78Zs/forking-logo-white.png"></img>
                    <span className='app-name'>The Forking Best</span>
                </Link>
                <span className="user-options">
                    {state.user ? (
                        <Link to={`profile`}>
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
