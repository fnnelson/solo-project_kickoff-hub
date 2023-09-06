import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

function PlayerHome() {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((store) => store.user);
    const upcomingGames = useSelector(store => store.games.upcomingGames);

    const [nextGame, setNextGame] = useState('');

    useEffect(() => {
        dispatch({ type: 'FETCH_GAMES' });
    }, [dispatch])

    console.log('upcomingGames[0] is:', upcomingGames[0])

    useEffect(() => {
        if (upcomingGames.length > 0) {
            console.log('upcomingGames[0] is:', upcomingGames[0]);
            let longDate = new Date(upcomingGames[0].game_date)
            let month = longDate.getMonth() + 1; // since it goes 0-11
            let day = longDate.getDate();
            let nextGameShortDate = `${month}/${day}`; // to show short-hand on Home Page
            upcomingGames[0].game_date = nextGameShortDate
            setNextGame(upcomingGames[0]);
        }
    }, [upcomingGames]);

    if (!nextGame) {
        return <div><p>Loading...</p></div>
    }

    // note - the records info should only need to be on the Game Details page

    const goToNextGameDetails = () => {
        history.push(`/playergamedetails/${nextGame.id}`)
    }


    return (
        <div className="container">
            <h3>Profile Button/Preview Here?</h3>
            <h2>Hello, {user.username}!</h2>
            <div className="next-game"
                style={{
                    border: '2px solid #000',
                    padding: '10px',
                    backgroundColor: 'lightgray',
                    cursor: 'pointer'
                }}
                onClick={goToNextGameDetails}>
                <h2>NEXT GAME</h2>
                <p>
                    Home - {nextGame.home_team_name} {nextGame.home_team_wins}-{nextGame.home_team_losses}-{nextGame.home_team_draws} - Jersey color ({nextGame.home_jersey})
                </p>
                <p>
                    Away - {nextGame.away_team_name} {nextGame.away_team_wins}-{nextGame.away_team_losses}-{nextGame.away_team_draws} - Jersey color ({nextGame.away_jersey})
                </p>
                <p>
                    {nextGame.day_of_week} {nextGame.game_date} {nextGame.game_time} @ {nextGame.field_name}
                </p>
            </div>
        </div >
    );
}

export default PlayerHome;