import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function SinglePlayerAssignment({ player, allTeams }) {

    const dispatch = useDispatch();

    // state object to track the selected team for each player
    const [selectedTeam, setSelectedTeam] = useState(player.team_id || '');

    // handle team selection for a player
    const handleAssignment = (playerId) => {
        console.log('selectedTeam is:', selectedTeam)
        console.log('playerId:', playerId)
        let teamObj = {};
        if (selectedTeam == '') {
            teamObj.newTeam = null;
        } else {
            teamObj.newTeam = selectedTeam
        }
        axios.put(`/api/player/${playerId}`, teamObj)
            .then(response => {
                console.log("success PUT new team:", response);
                dispatch({ type: 'FETCH_PLAYERS' });
                dispatch({ type: 'FETCH_TEAMS' });
            })
            .catch(error => {
                console.log("error on PUT new team", error);
            })
    };

    return (
        <div>
            Player: {player.name ? player.name : player.username}, {player.team_name || 'No team assigned'}
            <select value={selectedTeam} onChange={(event) => setSelectedTeam(event.target.value)}>
                <option value="">No team</option>
                {allTeams.map((team) => (
                    <option key={team.id} value={team.id}>
                        {team.team_name}
                    </option>
                ))}
            </select>
            <button onClick={() => handleAssignment(player.id)}>Assign</button>
        </div>
    );
}

export default SinglePlayerAssignment;