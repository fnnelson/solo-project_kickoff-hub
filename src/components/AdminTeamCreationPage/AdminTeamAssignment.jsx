import React from 'react';
import SinglePlayerAssignment from './SinglePlayerAssignment';
import { Text } from '@chakra-ui/react';


function AdminTeamAssignment({ allPlayers, allTeams }) {

    const playersWithNoTeam = allPlayers.filter((player) => !player.team_id);
    const playersWithTeam = allPlayers.filter((player) => player.team_id);


    return (
        <div>

            {playersWithNoTeam.length > 0 && (
                <div>
                    <Text textAlign='center' fontSize="lg" fontWeight="bold" mb="4" color={"#fadf5e"}>
                        Players with No Team
                    </Text>
                    {playersWithNoTeam.map((player, index) => (
                        <div key={index}>
                            <SinglePlayerAssignment player={player} allTeams={allTeams} />
                        </div>
                    ))}
                </div>
            )}
            <br />
            {playersWithTeam.length > 0 && (
                <div>
                    <Text textAlign='center' fontSize="lg" fontWeight="bold" mb="4" color={"#fadf5e"}>
                        Players with Teams
                    </Text>
                    {playersWithTeam.map((player, index) => (
                        <div key={index}>
                            <SinglePlayerAssignment player={player} allTeams={allTeams} />
                        </div>
                    ))}
                </div>
            )}

            {allPlayers.length === 0 && <Text>No players available.</Text>}
        </div>
    );

}

export default AdminTeamAssignment;