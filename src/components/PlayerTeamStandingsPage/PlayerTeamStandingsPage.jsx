import { Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';


function PlayerTeamStandingsPage() {

    const allTeams = useSelector(store => store.teams.allTeams)

    return (
        <div className="container" >
            {allTeams ? (
                <TableContainer>
                    <Table variant='striped' colorScheme='teal'>
                        <TableCaption>League Standings</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Team</Th>
                                <Th>W</Th>
                                <Th>D</Th>
                                <Th>L</Th>
                                <Th>+/-</Th>
                                <Th>Pts</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {allTeams.map((team, index) => (
                                <Tr key={index}>
                                    <Td w='200px'>{team.team_name}</Td>
                                    <Td>{team.wins}</Td>
                                    <Td>{team.losses}</Td>
                                    <Td>{team.draws}</Td>
                                    <Td>{team.goal_differential}</Td>
                                    <Td>{team.total_points}</Td>
                                </Tr>
                            ))
                            }
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>Team</Th>
                                <Th>W</Th>
                                <Th>D</Th>
                                <Th>L</Th>
                                <Th>+/-</Th>
                                <Th>Pts</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            ) : (
                <p>Loading...</p>
            )
            }


            <p>Standings Page</p>

        </div >
    );
}

export default PlayerTeamStandingsPage;