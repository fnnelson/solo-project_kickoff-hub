import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminPastGamesList from "./AdminPastGamesList";

function AdminSchedulePage() {

    const dispatch = useDispatch();

    const upcomingGames = useSelector(store => store.games.upcomingGames);
    const pastGames = useSelector(store => store.games.pastGames);

    const [toggle, setToggle] = useState(false);

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
                    <p>Past Games</p>
                    <div>
                        {pastGames.map((game, index) => (
                            <div key={index}>
                                <AdminPastGamesList game={game} />
                            </div>
                        ))}
                    </div>
                </>
                :
                <>
                    <p>Upcoming Games</p>
                    <div>
                        {upcomingGames.map((game, index) => (
                            <div key={index}>
                                <p>
                                    {game.day_of_week}, {game.game_date} at {game.game_time} - {game.home_team_name} vs {game.away_team_name}
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            }
        </div >
    );
}

export default AdminSchedulePage;



