import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function AdminTeamCreationPage() {
    const allPlayers = useSelector((store) => store.players.allPlayers);
    const allTeams = useSelector((store) => store.teams.allTeams);
    const dispatch = useDispatch();

    console.log("players are", allPlayers);
    console.log("teams are", allTeams);

    // Define a state object to track the selected team for each player
    const [selectedTeams, setSelectedTeams] = useState({});

    // Function to handle team selection for a player
    const handleTeamChange = (playerId, teamId) => {
        setSelectedTeams((prevSelectedTeams) => ({
            ...prevSelectedTeams,
            [playerId]: teamId,
        }));
    };

    return (
        <div className="container">

            <div>
                {allTeams ? (
                    <div>
                        {allTeams.map((team, index) => (
                            <div key={index}>
                                <p>Team: {team.team_name}</p>
                                {allPlayers.map((player, playerIndex) => (
                                    player.team_id === team.id ? (
                                        <p key={playerIndex}>{player.username || player.name}</p>
                                    ) : null
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>

            <p>Match players to teams:</p>

            <div>
                {allPlayers ? (
                    <div>
                        {allPlayers.map((player, index) => (
                            <div key={index}>
                                Player: {player.name ? player.name : player.username}, {player.team_name || 'No team assigned'}
                                <select
                                    value={selectedTeams[player.id] || ''}
                                    onChange={(e) => handleTeamChange(player.id, e.target.value)}
                                >
                                    <option value="">No team</option>
                                    {allTeams.map((team) => (
                                        <option key={team.id} value={team.id}>
                                            {team.team_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>

        </div >
    );
}

export default AdminTeamCreationPage;
