import { Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function PlayerUpcomingGamesItem({ game }) {

    return (
        game.cancel_status ? (
            <>
                <Text>**Canceled**</Text>
                <Text><s>{game.day_of_week}, {game.game_date} at {game.game_time}</s></Text>
                <Text><s>{game.home_team_name}</s></Text>
                <Text fontSize='sm'><s>vs.</s></Text>
                <Text><s>{game.away_team_name}</s></Text>
            </>
        ) : (
            <Link to={`/playergamedetails/${game.id}`}>
               <Text>{game.day_of_week}, {game.game_date} at {game.game_time}</Text>
                <Text>{game.home_team_name}</Text>
                <Text fontSize='sm'>vs.</Text>
                <Text>{game.away_team_name}</Text>
            </Link>
        )
    );
}

export default PlayerUpcomingGamesItem;