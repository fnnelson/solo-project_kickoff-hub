import React from 'react';
import { useSelector } from 'react-redux';
import AdminTeamAssignment from './AdminTeamAssignment';


function AdminTeamCreationPage() {
    const allPlayers = useSelector((store) => store.players.allPlayers);
    const allTeams = useSelector((store) => store.teams.allTeams);

    // console.log("players are", allPlayers);
    // console.log("teams are", allTeams);


/** 1. Calculate the count of players for each team
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

    return (
        <div className="container">

            <div>
                {allTeams ? (
                    <div>
                        {allTeams.map((team, index) => (
                            <div key={index}>
                                <p>{team.team_name}, Players: <b>{teamPlayerCounts[team.id]}</b></p>
                                {allPlayers.map((player, playerIndex) => (
                                    player.team_id === team.id ? (
                                        <span key={playerIndex}>{player.username || player.name} </span>
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

            < AdminTeamAssignment allPlayers={allPlayers} allTeams={allTeams} />

        </div >
    );
}

export default AdminTeamCreationPage;

