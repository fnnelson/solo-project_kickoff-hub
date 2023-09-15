import React from 'react';
import SinglePlayerAssignment from './SinglePlayerAssignment';
import { Text } from '@chakra-ui/react';


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
            <Text>Loading...</Text>
        )}
    </div>;
}

export default AdminTeamAssignment;


