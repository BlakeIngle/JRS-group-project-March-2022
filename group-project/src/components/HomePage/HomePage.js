import React from 'react';
import './HomePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, Outlet } from 'react-router-dom';

const userLoggedIn = false;

export default function HomePage() {

    return (
        <div className='home-page-root'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

function Header() {

    return (
        <div className='header-root'>
            <Link to="/">
                <span className='app-name'>The Forking Best</span>
            </Link>
            <Link to="/login">
                <span className='user-options'>
                    {userLoggedIn ? <span className='icon'><FontAwesomeIcon icon={faUser} /></span>
                        : <span className='login'>Login / Sign Up</span>}
                </span>
            </Link>
        </div>
    )
}


function Footer() {

    return (
        <div className='footer-root'>
            {/* <span className='icon'><FontAwesomeIcon icon={faSearch} /></span> */}
            <div className='icon'><FontAwesomeIcon icon={faPlus} /></div>
        </div>
    )
}