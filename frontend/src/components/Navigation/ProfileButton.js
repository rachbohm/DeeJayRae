import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { loadMySongsThunk } from "../../store/current";
import { NavLink } from "react-router-dom";
import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  useEffect(() => {
    dispatch(loadMySongsThunk())
  }, [dispatch]);

  let mySongs = useSelector(state => state.currentState);
  let mySongsArr = Object.values(mySongs);

  return (
    <>
      <button onClick={openMenu}>
      <i className="fa-regular fa-user"></i>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <div className="song-list">
            My Songs:
          {mySongsArr.map((song) => (
            <NavLink key={song.id} className='my-song-title' to={`/songs/${song.id}`}>{song.title}</NavLink>
          ))}
          </div>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
