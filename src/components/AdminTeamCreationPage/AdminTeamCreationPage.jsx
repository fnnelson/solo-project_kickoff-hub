import React from 'react';
import { useSelector } from 'react-redux';
import AdminTeamAssignment from './AdminTeamAssignment';
import { Divider, Heading, Text } from '@chakra-ui/react';


function AdminTeamCreationPage() {
    const allPlayers = useSelector((store) => store.players.allPlayers);
    const allTeams = useSelector((store) => store.teams.allTeams);

    // console.log("players are", allPlayers);
    // console.log("teams are", allTeams);

    /** 
     *  Explanation of the code below (I had to research):
     *  1. Calculate the count of players for each team
        2. The reduce function is used to transform an array into a single value. In this case, it's used to calculate the player count for each team.
        (counts, team) => This is an arrow function passed to reduce. It takes two parameters: counts (an accumulator) and team (the current team object being processed).
        4. counts[team.id] = This line updates the counts object with the player count for the current team. It uses the team's id as the key in the counts object. This key-value pair will represent the team's ID and the count of players assigned to that team.
        5. allPlayers.filter((player) => player.team_id === team.id).length: This part of the code calculates the count of players assigned to the current team (team). Here's how it works:
            a) allPlayers.filter(...): It filters the allPlayers array to only include players whose team_id matches the current team.id. This creates an array of players belonging to the current team.
            b) .length: It calculates the length of the filtered array, which is essentially the count of players in that team.
        6. return counts;: This line returns the updated counts object after processing the current team. The reduce function will accumulate these counts for all teams into a single object.
        7. }, {});: This is the closing part of the reduce function. It initializes the counts object as an empty object {}. This is the initial value of the accumulator.
     */
    const teamPlayerCounts = allTeams.reduce((counts, team) => {
        counts[team.id] = allPlayers.filter((player) => player.team_id === team.id).length;
        return counts;
    }, {});
    const playersWithNoTeam = allPlayers.filter((player) => !player.team_id);

    return (
        <div className="container">

            <Heading
                fontSize='lg'
                color='#f7f7f7'
                fontWeight='bold'
                textShadow='0 0 3px #383838'
                mb='20px'
            >
                Team Management
            </Heading>

            <div>
                {allTeams ? (
                    <div>
                        <Text color='#f7f7f7'>
                            <b>No Team Assigned</b>, players #: <b>{playersWithNoTeam.length}</b>
                        </Text>
                        {playersWithNoTeam.map((player, playerIndex) => (
                            <Text as='span' color='#fadf5e' key={playerIndex}>| {player.name ? player.name : player.username} </Text>
                        ))}
                        <Divider my='10px'/>
                        {allTeams.map((team, index) => (
                            <div key={index}>
                                <Text color='#f7f7f7'>
                                    <b>{team.team_name}</b>, players #: <b>{teamPlayerCounts[team.id]}</b>
                                </Text>
                                {allPlayers.map((player, playerIndex) => (
                                    player.team_id === team.id ? (
                                        <Text as='span' color='#fadf5e' key={playerIndex}>| {player.name? player.name : player.username} </Text>
                                    ) : null
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <Text>Loading...</Text>
                )}
            </div>

            <Divider my='20px' />

            <Heading
                size='lg'
                my='30px'
                textShadow='0 0 2px #f7f7f7'
                textAlign='center'
            >
                Match players to teams:
            </Heading>

            < AdminTeamAssignment allPlayers={allPlayers} allTeams={allTeams} />

        </div >
    );
}

export default AdminTeamCreationPage;

