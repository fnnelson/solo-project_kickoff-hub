import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function PlayerHome() {
    const history = useHistory();

    const user = useSelector((store) => store.user);
    const upcomingUserGames = useSelector(store => store.games.upcomingUserGames);

    const [nextGame, setNextGame] = useState('');

    useEffect(() => {
        if (upcomingUserGames.length > 0) {
            console.log('upcomingUserGames[0] is:', upcomingUserGames[0]);
            let longDate = new Date(upcomingUserGames[0].game_date)
            let month = longDate.getMonth() + 1; // since it goes 0-11
            let day = longDate.getDate();
            let nextGameShortDate = `${month}/${day}`; // to show short-hand on Home Page
            upcomingUserGames[0].game_date = nextGameShortDate
            setNextGame(upcomingUserGames[0]);
        }
    }, [upcomingUserGames]);

    if (!user.team_id) {
        return <div>
            <h2>*Team not yet assigned*</h2>
            <p>Teams assigned one week prior to season start.  If within one week and no team assignment, contact admin.</p>
        </div>
    } else if (!nextGame) {
        return <div><p>No Upcoming Games</p></div>
    }

    const goToNextGameDetails = () => {
        history.push(`/playergamedetails/${nextGame.id}`)
    }

    return (
        <div className="container">
            <h3>Profile Button/Preview Here?</h3>
            {user.name ? <h2>Hello, {user.name}!</h2> : <h2>Hello, {user.username}!</h2>}

            {nextGame.cancel_status ? (
                <div className="next-game"
                    style={{
                        border: '2px solid red',
                        padding: '10px',
                        backgroundColor: 'pink',
                        display: 'inline-block',
                        cursor: 'pointer'
                    }}
                    onClick={goToNextGameDetails}>
                    <h2>GAME CANCELED</h2>
                    <p>
                        Home - {nextGame.home_team_name} - Jersey color ({nextGame.home_jersey})
                    </p>
                    <p>vs.</p>
                    <p>
                        Away - {nextGame.away_team_name} - Jersey color ({nextGame.away_jersey})
                    </p>
                    <p>
                        {nextGame.day_of_week} {nextGame.game_date} {nextGame.game_time} @ {nextGame.field_name}
                    </p>
                </div>
            ) : (
                <div className="next-game"
                    style={{
                        border: '2px solid #000',
                        padding: '10px',
                        backgroundColor: 'lightgray',
                        display: 'inline-block',
                        cursor: 'pointer'
                    }}
                    onClick={goToNextGameDetails}>
                    <h2>NEXT GAME</h2>
                    <p>
                        Home - {nextGame.home_team_name} - Jersey color ({nextGame.home_jersey})
                    </p>
                    <p>vs.</p>
                    <p>
                        Away - {nextGame.away_team_name} - Jersey color ({nextGame.away_jersey})
                    </p>
                    <p>
                        {nextGame.day_of_week} {nextGame.game_date} {nextGame.game_time} @ {nextGame.field_name}
                    </p>
                </div>
            )}
        </div >
    );
}

export default PlayerHome;