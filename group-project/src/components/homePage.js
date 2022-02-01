import React from 'react';
import './homePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { Outlet } from 'react-router';

export default function HomePage({ children }) {

    return (
        <div className='home-page-root'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

function Header() {
    const city = "Charleston, SC";

    return (
        <div className='header-root'>
            <span className='app-name'>The Forking Best</span>
            <span className='icon'>
                <FontAwesomeIcon icon={faUser} />
            </span>

            {/* <span className='header-location'>
                <div>Location</div>
                <div className='city-name'>{city} ⯆</div>
            </span> */}
        </div>
    )
}


function Footer() {

    return (
        <div className='footer-root'>
            <span className='icon'><FontAwesomeIcon icon={faSearch} /></span>
            <span className='icon'><FontAwesomeIcon icon={faPlus} /></span>
        </div>
    )
}