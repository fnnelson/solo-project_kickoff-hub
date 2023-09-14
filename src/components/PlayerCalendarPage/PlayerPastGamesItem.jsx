import React from "react";

function PlayerPastGamesItem({ game }) {
    return <>
        {game.home_team_score == -1 || game.away_team_score == -1 ?
            <p>{game.day_of_week}, {game.game_date} at {game.game_time} - {game.home_team_name} [x] - [x] {game.away_team_name}</p> :
            <p>{game.day_of_week}, {game.game_date} at {game.game_time} - {game.home_team_name} {game.home_team_score} - {game.away_team_score} {game.away_team_name}</p>}
    </>;
}

export default PlayerPastGamesItem;
