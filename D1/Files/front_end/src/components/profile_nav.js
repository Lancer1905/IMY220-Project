// Pieter Venter u23896257
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const NavHelper = ({ isLoggedIn, username, onProfileClick }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate(`/profile/${username}`);
    } else {
      alert('You are not logged in yet, please login or register.');
    }
  };
  const handlePlaylistsClick = () => {
    if (isLoggedIn) {
      navigate(`/playlists/${username}`);
    } else {
      alert('You are not logged in yet, please login or register.');
    }
  };

  return (
    <>
      <button onClick={handleProfileClick} className="nav-btn">Profile</button>
      <Link to="/community"><button className="nav-btn">Community</button></Link>
      <button onClick={handlePlaylistsClick} className="nav-btn">Playlists</button>
      <Link to="/contact"><button className="nav-btn">Contact</button></Link>
    </> 
  );
};

export default NavHelper;
