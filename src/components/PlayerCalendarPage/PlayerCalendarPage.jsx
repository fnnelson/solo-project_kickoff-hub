import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function PlayerCalendarPage() {

    const dispatch = useDispatch();

    const games = useSelector(store => store.games);

    useEffect(() => {
        fetchGameCalendar()
    }, [])

    const fetchGameCalendar = () => {
        axios.get('/api/game')
            .then(response => {
                // want to send game data to redux state, so it can be used by multiple components
                dispatch({ type: 'GET_GAMES', payload: response.data })
            })
            .catch(error => {
                console.log("error with GET on client side", error)
            })
    }

    return (
        <div className="container">
            <p>Game Calendar</p>
            <div>
                {games.allGames.map((game, index) => (
                    <div key={index}>
                        <p>{game.day_of_week_name}, {game.readable_game_date} at {game.readable_game_time}</p>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default PlayerCalendarPage;