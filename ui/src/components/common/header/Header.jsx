import React from 'react';
import { Navbar } from '../../common';

import './Header.css';

function Header () {
  return (
    <section className='header'>
        <section className='header_logo'>
          <a href="/" className='header_logo_image'>LOGO</a>
        </section>
        <section className='header_navbar'>
          <Navbar />
        </section>
        <section className='header_login'>
          Login
        </section>
    </section>
  )
}

export default Header;