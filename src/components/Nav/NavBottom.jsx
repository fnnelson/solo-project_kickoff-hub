import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import './NavBottom.css';
import { useSelector } from 'react-redux';

import { Box } from '@chakra-ui/react';


function NavBottom({ toggleAdminMode, isAdminMode }) {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">KickOff Hub</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && !isAdminMode && (
          <>
            <Link className="navLink" to="/playerhome">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <Link className="navLink" to="/playercalendar">
              Player: Calendar
            </Link>

            <Link className="navLink" to="/playerannouncements">
              Player: Announcements
            </Link>

            <Link className="navLink" to="/playerteamrankings">
              Player: Team Standings
            </Link>

            {user.admin && (
              <Link to='/adminhome'>
                <button className="navButton" onClick={toggleAdminMode} >
                  Admin Mode
                </button>
              </Link>
            )}
          </>
        )}

        {isAdminMode && user.admin && (
          <>
            <Link className="navLink" to="/adminhome">
              Admin: Home
            </Link>

            <Link className="navLink" to="/adminschedule">
              Admin: Schedule
            </Link>

            <Link className="navLink" to="/adminannouncements">
              Admin: Announcements
            </Link>

            <Link className="navLink" to="/adminteamcreation">
              Admin: Team Creation
            </Link>

            <Link to='/playerhome'>
              <button className="navButton" onClick={toggleAdminMode}>
                Player Mode
              </button>
            </Link>
          </>
        )}
      </div>
    </div >
  );
}

export default NavBottom;
