import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

function AdminUpcomingGamesItem({ game }) {

    const dispatch = useDispatch();

    // const [toggleCancelGame, setToggleCancelGame] = useState(true);

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

    const handleCancelGame = (gameId) => {
        // console.log("inside handleCancelGame")
        // let cancelObj = {
        //     cancelStatus: toggleCancelGame
        // }
        axios.put(`/api/game/cancel/${gameId}`)
            .then(response => {
                console.log("updated cancel/game on", response)
                dispatch({ type: 'FETCH_GAMES' })
            })
            .catch(error => {
                console.log("error with PUT client side", error)
            })
        // setToggleCancelGame(!toggleCancelGame)
    }


    return (
        <div>
            {game.cancel_status ?
                (
                    <p>
                        <s>{game.day_of_week}, {game.game_date} at {game.game_time} - {game.home_team_name} vs {game.away_team_name}</s> <button onClick={() => { handleDelete(game.id) }}>Delete</button> <button onClick={() => { handleCancelGame(game.id) }}>Game On!</button>
                    </p>
                ) : (
                    <p>
                        {game.day_of_week}, {game.game_date} at {game.game_time} - {game.home_team_name} vs {game.away_team_name} <button onClick={() => { handleDelete(game.id) }}>Delete</button> <button onClick={() => { handleCancelGame(game.id) }}>Cancel Game</button>
                    </p>
                )}
        </div>
    );
}

export default AdminUpcomingGamesItem;