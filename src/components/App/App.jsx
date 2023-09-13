import React, { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import NavTop from '../Nav/NavTop';
import NavBottom from '../Nav/NavBottom';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

// my new pages!
import WeatherPage from '../WeatherPage/WeatherPage';
import PlayerCalendarPage from '../PlayerCalendarPage/PlayerCalendarPage';
import PlayerHomePage from '../PlayerHomePage/PlayerHomePage';
import PlayerGameDetailsPage from '../PlayerGameDetailsPage/PlayerGameDetailsPage';
import PlayerAnnouncementsPage from '../PlayerAnnouncementsPage/PlayerAnnouncementsPage';
import PlayerTeamRankingsPage from '../PlayerTeamStandingsPage/PlayerTeamStandingsPage';
// and the admin pages!
import AdminHomePage from '../AdminHomePage/AdminHomePage';
import AdminAnnouncementsPage from '../AdminAnnouncementsPage/AdminAnnouncementsPage';
import AdminSchedulePage from '../AdminSchedulePage/AdminSchedulePage';
import AdminTeamCreationPage from '../AdminTeamCreationPage/AdminTeamCreationPage';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const [isAdminMode, setIsAdminMode] = useState(false);

  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
  };

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'FETCH_GAMES' });
    dispatch({ type: 'FETCH_PLAYERS' });
    dispatch({ type: 'FETCH_TEAMS' });
    dispatch({ type: 'FETCH_ANNOUNCEMENTS' });
    if (user.team_id) {
      dispatch({ type: 'FETCH_USER_GAMES', payload: user.team_id });
    }
  }, [dispatch, user.team_id]);

  return (
    <Router>
      <div>
        <NavTop isAdminMode={isAdminMode} />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows PlayerHomePage else shows LoginPage
            exact
            path="/playerhome"
          >
            <PlayerHomePage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows PlayerCalendarPage else shows LoginPage
            exact
            path="/playercalendar"
          >
            <PlayerCalendarPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows PlayerGameDetailsPage else shows LoginPage
            exact
            path="/playergamedetails/:gameId"
          >
            <PlayerGameDetailsPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows PlayerAnnouncementsPage else shows LoginPage
            exact
            path="/playerannouncements"
          >
            <PlayerAnnouncementsPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows PlayerAnnouncementsPage else shows LoginPage
            exact
            path="/playerteamrankings"
          >
            <PlayerTeamRankingsPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AdminHomePage else shows LoginPage
            exact
            path="/adminhome"
          >
            <AdminHomePage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AdminSchedulePage else shows LoginPage
            exact
            path="/adminschedule"
          >
            <AdminSchedulePage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AdminAnnouncementsPage else shows LoginPage
            exact
            path="/adminannouncements"
          >
            <AdminAnnouncementsPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AdminTeamCreationPage else shows LoginPage
            exact
            path="/adminteamcreation"
          >
            <AdminTeamCreationPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows WeatherPage else shows LoginPage
            exact
            path="/weather"
          >
            <WeatherPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              // Forrest - updated this to /playerhome (will add another conditional for admin vs player)
              <Redirect to="/playerhome" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
        <NavBottom toggleAdminMode={toggleAdminMode} isAdminMode={isAdminMode} />
      </div>
    </Router>
  );
}

export default App;
