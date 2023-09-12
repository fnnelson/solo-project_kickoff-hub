import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

// Page at '/playergamedetails/(gameid)'

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
                let gameDate = new Date(response.data[0].game_date);
                let day = gameDate.getDate();
                let month = gameDate.getMonth() + 1; // month plus 1 since it does 0-11
                let formattedDate = `${month}/${day}`
                response.data[0].game_date = formattedDate;
                let dbTime = response.data[0].game_time;
                // console.log('DB time is:', dbTime)
                if (dbTime[0] == '0') {
                    dbTime = dbTime.slice(1);
                    response.data[0].game_time = dbTime;
                }

                setGameDetails(response.data[0])
            })
            .catch(error => {
                console.error('error with GET single game', error)
            })
    }

    return (
        <div className="container">
            {gameDetails ? (
                <div>
                    {gameDetails.cancel_status ?
                        <>
                            <h1 style={{ color: 'red' }}>Game Canceled <Link to='/playerannouncements'><button>Announcements</button></Link> </h1>
                        </>
                        :
                        <h2>Game Details</h2>
                    }
                    <a href={gameDetails.maps_link} target="_blank" rel="noopener noreferrer">
                        <span style={{ position: 'relative' }}>
                            <img
                                src={gameDetails.field_photo || 'http://via.placeholder.com/450x250'} // Use the provided photo URL or a placeholder
                                alt="Field Photo"
                                style={{
                                    width: '450px',
                                    height: '250px',
                                    border: '2px solid #000'
                                }}
                            />
                        </span>
                    </a>
                    <p>*clicking photo will bring you to Google Maps</p>
                    <h4>{gameDetails.field_name}</h4>
                    <h5>{gameDetails.address}</h5>
                    <h3>{gameDetails.game_date} @ {gameDetails.game_time}</h3>
                    <p>Home - Jersey color {gameDetails.home_jersey}</p>
                    <p>{gameDetails.home_team_name} {gameDetails.home_team_wins}-{gameDetails.home_team_losses}-{gameDetails.home_team_draws}</p>
                    <p>vs.</p>
                    <p>Away - Jersey color {gameDetails.away_jersey}</p>
                    <p>{gameDetails.away_team_name} {gameDetails.away_team_wins}-{gameDetails.away_team_losses}-{gameDetails.away_team_draws}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default PlayerGameDetailsPage;