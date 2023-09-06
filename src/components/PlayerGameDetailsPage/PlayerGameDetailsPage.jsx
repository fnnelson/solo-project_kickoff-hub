import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function PlayerGameDetailsPage() {

    const { gameId } = useParams();

    const [gameDetails, setGameDetails] = useState(null);

    useEffect(() => {
        fetchSingleGame();
    }, [gameId])

    const fetchSingleGame = () => {
        console.log('inside fetchSingleGame with gameId:', gameId)
        axios.get(`/api/game/${gameId}`)
            .then(response => {
                console.log('response with GET single game:', response.data)
                setGameDetails(response.data[0])
            })
            .catch(error => {
                console.error('error with GET single game', error)
            })
    }

    console.log('gameDetails is now:', gameDetails)

    return (
        <div className="container">
            {gameDetails ? (
                <div>
                    <p>Single Game Details Component</p>
                    <p>game ID: {gameId}</p>
                    <a href={gameDetails.maps_link} target="_blank" rel="noopener noreferrer"><img src="http://via.placeholder.com/450x250"></img></a>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default PlayerGameDetailsPage;