import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminPastGamesItem from "./AdminPastGamesItem";
import AdminUpcomingGamesItem from "./AdminUpcomingGamesItem";
import AdminSchedulingForm from "./AdminSchedulingForm";

function AdminSchedulePage() {

    const dispatch = useDispatch();

    const upcomingGames = useSelector(store => store.games.upcomingGames);
    const pastGames = useSelector(store => store.games.pastGames);

    const [toggle, setToggle] = useState(true);

    // getting rid of this useEffect since App.jsx has it already
    // useEffect(() => {
    //     dispatch({ type: 'FETCH_GAMES' })
    // }, [dispatch])

    const togglePastFuture = () => {
        setToggle(!toggle);
        // console.log('toggle is now:', toggle)
    }

    return (
        <div className="container">
            <button onClick={togglePastFuture}>Toggle</button>
            {toggle ?
                <>
                    <h3>Past Games</h3>
                    <div>
                        {pastGames.map((game, index) => (
                            <div key={index}>
                                <AdminPastGamesItem game={game} />
                            </div>
                        ))}
                    </div>
                    <p>[x] - score has not yet been entered</p>
                    <p>Note: Update both scores to -1 if needing to erase any scores</p>
                </>
                :
                <>
                    <h3>Upcoming Games</h3>
                    <div>
                        {upcomingGames.map((game, index) => (
                            <div key={index}>
                                <AdminUpcomingGamesItem game={game} />
                            </div>
                        ))}
                    </div>
                    <h3>Add New Game to Schedule:</h3>
                    <AdminSchedulingForm />
                    <Link to='/adminannouncements'><h3>Announcements Page</h3></Link>
                </>
            }
        </div >
    );
}

export default AdminSchedulePage;





