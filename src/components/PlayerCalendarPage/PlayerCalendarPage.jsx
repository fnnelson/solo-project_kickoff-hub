import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayerUpcomingGamesItem from "./PlayerUpcomingGamesItem";

// Page at '/playercalendar'

function PlayerCalendarPage() {

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
                                {game.home_team_score == -1 || game.away_team_score == -1 ?
                                    <p>{game.day_of_week}, {game.game_date} at {game.game_time} - {game.home_team_name} [x] - [x] {game.away_team_name}</p> :
                                    <p>{game.day_of_week}, {game.game_date} at {game.game_time} - {game.home_team_name} {game.home_team_score} - {game.away_team_score} {game.away_team_name}</p>}
                            </div>
                        ))}
                    </div>
                    <p>[x] - score has not yet been entered</p>
                </>
                :
                <>
                    <p>Upcoming Games</p>
                    <div>
                        {upcomingGames.map((game, index) => (
                            <div key={index}>
                                <PlayerUpcomingGamesItem game={game} />
                            </div>
                        ))}
                    </div>
                </>
            }
        </div >
    );
}

export default PlayerCalendarPage;


