import { Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';


function PlayerTeamStandingsPage() {

    const allTeams = useSelector(store => store.teams.allTeams)

    const tableColumnStyle = {
        paddingLeft: '8px',
        paddingRight: '8px',
    }

    return (
        <div className="container" >
            {allTeams ? (
                <TableContainer >
                    <Table variant='striped' colorScheme='blackAlpha' >
                        <TableCaption fontSize='lg' placement='top' color='#fadf5e' textShadow='0 0 5px #383838'>League Standings</TableCaption>
                        <Thead>
                            <Tr>
                                <Th color='#383838' textDecor='underline'>Team</Th>
                                <Th color='#383838' style={tableColumnStyle} textDecor='underline'>W</Th>
                                <Th color='#383838' style={tableColumnStyle} textDecor='underline'>D</Th>
                                <Th color='#383838' style={tableColumnStyle} textDecor='underline'>L</Th>
                                <Th color='#383838' style={tableColumnStyle} textDecor='underline'>+/-</Th>
                                <Th color='#383838' style={tableColumnStyle} textDecor='underline'>Pts</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {allTeams.map((team, index) => (
                                <Tr key={index}>
                                    <Td color='#f7f7f7' textShadow='0 0 2px #383838'>{team.team_name}</Td>
                                    <Td color='#f7f7f7' textShadow='0 0 2px #383838' style={tableColumnStyle}>{team.wins}</Td>
                                    <Td color='#f7f7f7' textShadow='0 0 2px #383838' style={tableColumnStyle}>{team.losses}</Td>
                                    <Td color='#f7f7f7' textShadow='0 0 2px #383838' style={tableColumnStyle}>{team.draws}</Td>
                                    <Td color='#f7f7f7' textShadow='0 0 2px #383838' style={tableColumnStyle}>{team.goal_differential}</Td>
                                    <Td color='#f7f7f7' textShadow='0 0 2px #383838' style={tableColumnStyle}>{team.total_points}</Td>
                                </Tr>
                            ))
                            }
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th color='#383838'>Team</Th>
                                <Th color='#383838' style={tableColumnStyle}>W</Th>
                                <Th color='#383838' style={tableColumnStyle}>D</Th>
                                <Th color='#383838' style={tableColumnStyle}>L</Th>
                                <Th color='#383838' style={tableColumnStyle}>+/-</Th>
                                <Th color='#383838' style={tableColumnStyle}>Pts</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            ) : (
                <p>Loading...</p>
            )
            }

        </div >
    );
}

export default PlayerTeamStandingsPage;