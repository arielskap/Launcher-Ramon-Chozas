import React from 'react';
import Logo from '../images/logo_chozas.png';
import './styles/Navbar.css';

function Navbar(){
   return (
    <div className='Navbar'>
        <div className='container-fluid'>
            <div className='Navbar__brand' >
                <img className='Navbar__brand-logo' src={Logo} alt='Logo' />
            </div>
        </div>
    </div>
   )
}

export default Navbar;