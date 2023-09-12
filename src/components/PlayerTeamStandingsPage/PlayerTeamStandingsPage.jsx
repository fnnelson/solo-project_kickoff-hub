import React from 'react';
import { useSelector } from 'react-redux';


function PlayerTeamStandingsPage() {

    const allTeams = useSelector(store => store.teams.allTeams)

    return (
        <div className="container">
            <p>Standings Page</p>
            {allTeams ? (
                <div>
                    {allTeams.map((team, index) => (
                        <div key={index}>
                            {team.team_name}: {team.wins}, {team.losses}, {team.draws}, {team.total_points}, {team.goal_differential}
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default PlayerTeamStandingsPage;