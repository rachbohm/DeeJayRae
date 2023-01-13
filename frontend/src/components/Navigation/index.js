import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser.id) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className="navLink login" to="/login">Log In</NavLink>
        <NavLink className="navLink signup" to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className="nav-bar-container">
      <div className="logo">
        <i class="fa-brands fa-soundcloud"> ClonedCloud</i>
      </div>
      <div className="nav-right">
        <NavLink className="navLink" exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
