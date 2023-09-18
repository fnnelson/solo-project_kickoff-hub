import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";
import { Text } from "@chakra-ui/react";

const winnerIcon = <FontAwesomeIcon icon={faFutbol} />

function PlayerPastGamesItem({ game }) {
    return <>
        {game.home_team_score == -1 || game.away_team_score == -1 ? (
            <>
                <Text>{game.day_of_week}, {game.game_date} at {game.game_time}</Text>
                <Text>{game.home_team_name} <b>[x]</b></Text>
                <Text>{game.away_team_name} <b>[x]</b></Text>
                <Text>[x] - scores yet to be entered</Text>
            </>
        ) : (
            <>
                <Text>{game.day_of_week}, {game.game_date} at {game.game_time}</Text>
                <Text>{game.home_team_name} <b>{game.home_team_score}</b> {game.home_team_result == 'W' && winnerIcon}</Text>
                <Text>{game.away_team_name} <b>{game.away_team_score} {game.away_team_result == 'W' && winnerIcon}</b></Text>
            </>

        )}
    </>;
}

export default PlayerPastGamesItem;