import React, { useState } from 'react';

function SinglePlayerAssignment({ player, allTeams }) {
    
    // state object to track the selected team for each player
    const [selectedTeam, setSelectedTeam] = useState(player.team_id || '');

    // handle team selection for a player
    const handleTeamChange = (event) => {
        setSelectedTeam(event.target.value);
    };

    return (
        <div>
            Player: {player.name ? player.name : player.username}, {player.team_name || 'No team assigned'}
            <select value={selectedTeam} onChange={handleTeamChange}>
                <option value="">No team</option>
                {allTeams.map((team) => (
                    <option key={team.id} value={team.id}>
                        {team.team_name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SinglePlayerAssignment;