import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function PlayerHome() {
    const dispatch = useDispatch();

    const user = useSelector((store) => store.user);
    const upcomingGames = useSelector(store => store.games.upcomingGames);

    useEffect(() => {
        dispatch({ type: 'FETCH_GAMES' })
    }, [dispatch])
    
    console.log('upcomingGames[0] is:', upcomingGames[0])

    let nextGame = upcomingGames[0];
    let longDate = new Date(nextGame.game_date)
    let month = longDate.getMonth() + 1; // since it goes 0-11
    let day = longDate.getDate();
    let nextGameShortDate = `${month}/${day}`; // to show short-hand on Home Page

    // the data is sometimes showing up as undefined!  Need to make sure games are fetched every time before this page loads
    if (!upcomingGames[0]) {
        return <div><p>Loading...</p></div>
    }
    // note - the records info should only need to be on the Game Details page

    return (
        <div className="container">
            <h3>Profile Button/Preview Here?</h3>
            <h2>Hello, {user.username}!</h2>
            <div>
                <h2>NEXT GAME</h2>
                <p>
                    Home - {nextGame.home_team_name} {nextGame.home_team_wins}-{nextGame.home_team_losses}-{nextGame.home_team_draws} - Jersey color ({nextGame.home_jersey})
                </p>
                <p>
                    Away - {nextGame.away_team_name} {nextGame.away_team_wins}-{nextGame.away_team_losses}-{nextGame.away_team_draws} - Jersey color ({nextGame.away_jersey})
                </p>
                <p>
                    {nextGame.day_of_week} {nextGameShortDate} {nextGame.game_time} @ {nextGame.field_name}
                </p>
            </div>
        </div >
    );
}

export default PlayerHome;