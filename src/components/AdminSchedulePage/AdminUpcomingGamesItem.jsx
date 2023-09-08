import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

function AdminUpcomingGamesItem({ game }) {

    const dispatch = useDispatch();

    const handleDelete = (gameId) => {
        // console.log("inside handleDelete", gameId)
        axios.delete(`/api/game/${gameId}`)
            .then(response => {
                console.log("deleted game!", response)
                dispatch({ type: 'FETCH_GAMES' })
            })
            .catch(error => {
                console.log("error with DELETE client side", error)
            })
    }


    return (
        <div>
            <p>
                {game.day_of_week}, {game.game_date} at {game.game_time} - {game.home_team_name} vs {game.away_team_name} <button onClick={() => { handleDelete(game.id) }}>Delete</button> <button>Cancel Game</button>
            </p>
        </div>
    );
}

export default AdminUpcomingGamesItem;