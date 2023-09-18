import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Box, Button, Select, Text } from '@chakra-ui/react';

function SinglePlayerAssignment({ player, allTeams }) {

    useEffect(() => {
        setSelectedTeam(player.team_id || ''); 
        // I'm doing this because the dropdown value shows a default of the previously chosen team for another player in the same spot
      }, [player]);

    const dispatch = useDispatch();

    // state object to track the selected team for each player
    const [selectedTeam, setSelectedTeam] = useState(player.team_id ? player.team_id : '');

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

            <Text as='span' color='#f7f7f7' fontSize='lg' fontWeight='bold' m='5px'>{player.name ? player.name : player.username}</Text>
            <Select bgColor='#f7f7f7'
                m='5px'
                colorScheme='green'
                value={selectedTeam}
                onChange={(event) => setSelectedTeam(event.target.value)}
            >
                <option style={{ backgroundColor: 'pink' }} value="">No team</option>
                {allTeams.map((team) => (
                    <option key={team.id} value={team.id}>
                        {team.team_name}
                    </option>
                ))}
            </Select>
            <Box textAlign='right' >
                <Button color='#383838' bgColor='#fadf5e' border='2px solid black' onClick={() => handleAssignment(player.id)}>Assign</Button>
            </Box>
        </div>
    );
}

export default SinglePlayerAssignment;