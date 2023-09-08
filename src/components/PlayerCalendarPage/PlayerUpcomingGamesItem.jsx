import React from "react";
import { Link } from "react-router-dom";

function PlayerUpcomingGamesItem({ game }) {

    return (
        <Link to={`/playergamedetails/${game.id}`}>
            <p>
                {game.day_of_week}, {game.game_date} at {game.game_time} - {game.home_team_name} vs {game.away_team_name}
            </p>
        </Link>
    );
}

export default PlayerUpcomingGamesItem;