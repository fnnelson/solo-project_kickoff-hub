import React, { useState } from "react";
import { useSelector } from "react-redux";
import PlayerUpcomingGamesItem from "./PlayerUpcomingGamesItem";

// Page at '/playercalendar'

function PlayerCalendarPage() {

    const upcomingUserGames = useSelector(store => store.games.upcomingUserGames);
    const pastUserGames = useSelector(store => store.games.pastUserGames);

    const [toggle, setToggle] = useState(false);

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
                        {pastUserGames.map((game, index) => (
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
                    {upcomingUserGames ?
                        <div>
                            {upcomingUserGames.map((game, index) => (
                                <div key={index}>
                                    <PlayerUpcomingGamesItem game={game} />
                                </div>
                            ))}
                        </div>
                        :
                        <p>No upcoming games</p>
                    }
                </>
            }
        </div >
    );
}

export default PlayerCalendarPage;


