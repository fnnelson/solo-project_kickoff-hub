import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpcomingGameList from "./UpcomingGameList";

function PlayerCalendarPage() {

    const dispatch = useDispatch();

    const upcomingGames = useSelector(store => store.games.upcomingGames);
    const pastGames = useSelector(store => store.games.pastGames);

    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        dispatch({ type: 'FETCH_GAMES' })
    }, [dispatch])

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
                                <p>{game.day_of_week}, {game.game_date} at {game.game_time} - {game.home_team_name} vs {game.away_team_name}</p>
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
                                <UpcomingGameList game={game} />
                            </div>
                        ))}
                    </div>
                </>
            }
        </div >
    );
}

export default PlayerCalendarPage;


