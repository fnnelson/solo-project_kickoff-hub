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
                    <h2>Game Details</h2>
                    <a href={gameDetails.maps_link} target="_blank" rel="noopener noreferrer">
                        <div style={{ position: 'relative' }}>
                            <img
                                src={gameDetails.field_photo || 'http://via.placeholder.com/450x250'} // Use the provided photo URL or a placeholder
                                alt="Game Photo"
                                style={{
                                    width: '450px',
                                    height: '250px',
                                    border: '2px solid #000'
                                }}
                            />
                        </div>
                    </a>
                    <p>*clicking photo will bring you to Google Maps</p>
                    <h4>{gameDetails.field_name} in {gameDetails.location}</h4>
                    <p>Jersey color {gameDetails.home_jersey}</p>
                    <p>{gameDetails.home_team_name} {gameDetails.home_team_wins}-{gameDetails.home_team_losses}-{gameDetails.home_team_draws}</p>
                    <p>vs.</p>
                    <p>Jersey color {gameDetails.away_jersey}</p>
                    <p>{gameDetails.away_team_name} {gameDetails.away_team_wins}-{gameDetails.away_team_losses}-{gameDetails.away_team_draws}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default PlayerGameDetailsPage;