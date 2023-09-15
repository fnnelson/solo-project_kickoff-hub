import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Select } from '@chakra-ui/react';

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
            Date:<input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
            />

            Time: <input
                type="time"
                placeholder=""
                value={time}
                onChange={(event) => setTime(event.target.value)}
            />

            Field:
            <Select
                value={field}
                onChange={(event) => setField(event.target.value)}
            >
                <option value="">Select Field</option>
                <option value="1">Braemar Field</option>
                <option value="2">Pamela Turf Field</option>
                <option value="3">Kuhlman Stadium</option>
                <option value="4">Plymouth Fieldhouse</option>
            </Select>

            Home Team:
            <Select
                value={homeTeam}
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
            Away Team:
            <Select
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
            <button type="submit">Add Game</button>
        </form>
    );
}

export default AdminSchedulingForm;