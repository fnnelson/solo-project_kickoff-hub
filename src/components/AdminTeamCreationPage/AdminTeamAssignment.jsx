import React from 'react';
import SinglePlayerAssignment from './SinglePlayerAssignment';


function AdminTeamAssignment({ allPlayers, allTeams }) {




    return <div>
        {allPlayers ? (
            <div>
                {allPlayers.map((player, index) => (
                    <div key={index}>
                        <SinglePlayerAssignment player={player} allTeams={allTeams} />
                    </div>
                ))}
            </div>
        ) : (
            <p>Loading...</p>
        )}
    </div>;
}

export default AdminTeamAssignment;


