import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from './../../assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [toggleNav, setToggleNav] = useState(false);
  const [isFixed, setIsFixed] = useState(false); // State to track fixed nav
  const [search, setSearch] = useState("");

  const navToggleHandler = () => {
    setToggleNav(!toggleNav);
  }

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedSearch = search.trim();
    if(trimmedSearch)
    {
      navigate(`/search/${trimmedSearch}`);
    }
    else
    {
      navigate('/search');
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll); // Add scroll event listener
    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
    };
  }, []);

  return (
    <div>


      <nav className={isFixed ? 'fixed' : ''}> {/* Add 'fixed' class if isFixed is true */}
          <div className='sec1'>
            <button className='openNavBtn' onClick={navToggleHandler}>&#9776;</button>
            <div><NavLink to='/'><img src={logo}></img></NavLink></div>
          </div>
          <ul className={`${toggleNav ? 'show' : ''}`}>
              <button className='closeNavBtn' onClick={navToggleHandler}>&#10005;</button>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/blog">Blog</NavLink></li>
              <li><NavLink to="/contact">Contact Us</NavLink></li>
              <li><NavLink to="/about">About Us</NavLink></li>
          </ul>
      </nav>


      <div className='topNav'>
        <form onSubmit={handleSearchSubmit}>
          <input type="search" className='searchInput' placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
          <button type="submit" className='searchBtn'>Search</button>
        </form>
      </div>



    </div>
  )
}

export default Header;