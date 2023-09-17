import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Box, Button, Input, Select, Text } from '@chakra-ui/react';

function AdminSchedulingForm() {

    const dispatch = useDispatch();

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [field, setField] = useState('');
    const [homeTeam, setHomeTeam] = useState('');
    const [awayTeam, setAwayTeam] = useState('');

    const addNewGame = (event) => {
        event.preventDefault();
        console.log('date is now', date)
        console.log('time is now', time)
        console.log('field is now', field)
        console.log('homeTeam is now', homeTeam)
        console.log('awayTeam is now', awayTeam)
        if (date == '' || time == '' || field == '' || homeTeam == '' || awayTeam == '') {
            alert("Please complete all inputs")
        }
        else if (homeTeam == awayTeam) {
            alert("Team cannot play itself!")
        } else {
            let newGameObj = {
                gameDate: date,
                gameTime: time,
                fieldId: field,
                homeTeamId: homeTeam,
                awayTeamId: awayTeam
            }
            axios.post('/api/game', newGameObj)
                .then(response => {
                    console.log("success in POSTing new game", response)
                    dispatch({ type: 'FETCH_GAMES' })
                })
                .catch(error => {
                    console.error("error on POST new game!", error)
                })
            setDate('');
            setTime('');
            setField('');
            setHomeTeam('');
            setAwayTeam('');
        }
    }



    return (
        <form onSubmit={addNewGame}>
            <Box textAlign='left'>
                <Text color='#f7f7f7'>Date:</Text>
                <Input
                    type="date"
                    bgColor='#f7f7f7'
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                />
            </Box>
            <Box textAlign='left'>
                <Text color='#f7f7f7'>Time:</Text>
                <Input
                    type="time"
                    bgColor='#f7f7f7'
                    step='900'
                    placeholder=""
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                />
            </Box>
            <Box textAlign='left'>
                <Text color='#f7f7f7'>Field:</Text>
            </Box>
            <Select
                bgColor='#f7f7f7'
                m='5px'
                value={field}
                onChange={(event) => setField(event.target.value)}
            >
                <option value="">Select Field</option>
                <option value="1">Braemar Field</option>
                <option value="2">Pamela Turf Field</option>
                <option value="3">Kuhlman Stadium</option>
                <option value="4">Plymouth Fieldhouse</option>
            </Select>
            <Box textAlign='left'>
                <Text color='#f7f7f7'>Home Team:</Text>
            </Box>
            <Select
                value={homeTeam}
                bgColor='#f7f7f7'
                m='5px'
                onChange={(event) => setHomeTeam(event.target.value)}
            >
                <option value="">Select Home Team</option>
                <option value="1">Brutal Foxes</option>
                <option value="2">Polar Hornets</option>
                <option value="3">Hustlin' Cheetahs</option>
                <option value="4">Flaming Dragons</option>
                <option value="5">Scrappy Koalas</option>
                <option value="6">Honey Badgers</option>
            </Select>
            <Box textAlign='left'>
                <Text color='#f7f7f7'>Away Team:</Text>
            </Box>
            <Select
                bgColor='#f7f7f7'
                m='5px'
                value={awayTeam}
                onChange={(event) => setAwayTeam(event.target.value)}
            >
                <option value="">Select Away Team</option>
                <option value="1">Brutal Foxes</option>
                <option value="2">Polar Hornets</option>
                <option value="3">Hustlin' Cheetahs</option>
                <option value="4">Flaming Dragons</option>
                <option value="5">Scrappy Koalas</option>
                <option value="6">Honey Badgers</option>
            </Select>
            <Box textAlign='right' my='10px'>
                <Button type='submit' color='#383838' bgColor='#fadf5e' border='2px solid black'>Add Game</Button>
            </Box>
        </form>
    );
}

export default AdminSchedulingForm;