import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Box, Button, IconButton, Input, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faFloppyDisk, faFutbol } from "@fortawesome/free-solid-svg-icons";

const winnerIcon = <FontAwesomeIcon icon={faFutbol} />

// Page at '/adminschedule'

function AdminPastGamesItem({ game, user }) {

    const dispatch = useDispatch();

    const [editToggle, setEditToggle] = useState(false);
    const [homeTeamScore, setHomeTeamScore] = useState(game.home_team_score !== -1 ? game.home_team_score : '');
    const [awayTeamScore, setAwayTeamScore] = useState(game.away_team_score !== -1 ? game.away_team_score : '');

    const toggleEditOption = () => {
        // console.log("inside of toggleEditOption, edit on?:", editToggle);
        setEditToggle(!editToggle);
    }

    const handleSave = () => {
        console.log("updated scores are:", homeTeamScore, "to", awayTeamScore, "for game #", game.id)
        if ((homeTeamScore == '' && awayTeamScore != '') || awayTeamScore == '' && homeTeamScore != '') {
            alert("Please enter both scores")
        } else if ((homeTeamScore == -1 && awayTeamScore != -1) || (awayTeamScore == -1 && homeTeamScore != -1)) {
            alert("Enter both scores as -1 if erasing scores, cannot only erase one");
        } else if (homeTeamScore == '' && awayTeamScore == '') {
            setEditToggle(false);
        } else {
            let homeTeamResult;
            let awayTeamResult;
            if (homeTeamScore > awayTeamScore) {
                homeTeamResult = 'W';
                awayTeamResult = 'L'
            } else if (homeTeamScore < awayTeamScore) {
                homeTeamResult = 'L'
                awayTeamResult = 'W';
            } else if (homeTeamScore == awayTeamScore) {
                homeTeamResult = awayTeamResult = 'D';
            }
            let gameId = game.id;
            let updatedScoreObj = {
                homeScore: Number(homeTeamScore),
                awayScore: Number(awayTeamScore),
                homeResult: homeTeamResult,
                awayResult: awayTeamResult,
                homeTeamId: game.home_team_id,
                awayTeamId: game.away_team_id,
            };
            // PUT request to update "game" table and transaction used to also update the team table based on game data
            axios.put(`/api/game/score/${gameId}`, updatedScoreObj)
                .then(response => {
                    console.log("1st PUT successful!", response);
                    console.log("upcomingUserGames[0].team_name is:", user.team_id)
                    dispatch({ type: 'FETCH_GAMES' })
                    dispatch({ type: 'FETCH_USER_GAMES', payload: user.team_id })
                    dispatch({ type: 'FETCH_TEAMS' })
                })
                .catch(error => {
                    console.error("1st PUT ain't PUTtin", error);
                });

            setEditToggle(false);
        }
    }

    const inputStyle = {
        width: '60px'
    }

    return (
        <div>
            {game.cancel_status ? (
                <>
                    <Text>**GAME CANCELED**</Text>
                    <Text><s>{game.day_of_week}, {game.game_date} at {game.game_time}</s></Text>
                    <Text><s>{game.home_team_name} : N/A</s></Text>
                    <Text><s>{game.away_team_name} : N/A</s></Text>
                    <Text>**GAME CANCELED**</Text>
                </>
            ) : (editToggle ? (
                game.home_team_score === -1 || game.away_team_score === -1 ? (
                    <>
                        <Text>**UPDATE**</Text>
                        <Text>{game.day_of_week}, {game.game_date} at {game.game_time}</Text>
                        <Text>{game.home_team_name}{' '}
                            <Input
                                type='text'
                                style={inputStyle}
                                value={homeTeamScore}
                                bgColor='white'
                                color='black'
                                onChange={(event) => { setHomeTeamScore(event.target.value) }}
                            />
                        </Text>
                        <Text>
                            {game.away_team_name}
                            <Input
                                type='text'
                                style={inputStyle}
                                value={awayTeamScore}
                                bgColor='white'
                                color='black'
                                onChange={(event) => { setAwayTeamScore(event.target.value) }}
                            />
                        </Text>
                        <Text>**UPDATE**</Text>
                        <Box textAlign='right'>
                            <IconButton border='2px solid red'>
                                <FontAwesomeIcon icon={faFloppyDisk} onClick={handleSave} color='black' />
                            </IconButton>
                        </Box>
                    </>
                ) : (
                    <>
                        <Text>
                            {game.day_of_week}, {game.game_date} at {game.game_time}</Text>
                        <Text>{game.home_team_name}{' '}
                            <Input
                                type='text'
                                value={homeTeamScore}
                                onChange={(event) => { setHomeTeamScore(event.target.value) }}
                                style={inputStyle}
                            />
                        </Text>
                        <Text>
                            {game.away_team_name}
                            <Input
                                type='text'
                                style={inputStyle}
                                value={awayTeamScore}
                                onChange={(event) => { setAwayTeamScore(event.target.value) }}
                            />
                        </Text>
                        <Box textAlign='right'>
                            <IconButton border='2px solid #3a7259'>
                                <FontAwesomeIcon icon={faFloppyDisk} onClick={handleSave} color='black' />
                            </IconButton>
                        </Box>
                    </>
                )
            ) : game.home_team_score === -1 || game.away_team_score === -1 ? (
                <>
                    <Text>**UPDATE**</Text>
                    <Text>{game.day_of_week}, {game.game_date} at {game.game_time}</Text>
                    <Text>{game.home_team_name} : <b>[x]</b></Text>
                    <Text>{game.away_team_name} : <b>[x]</b></Text>
                    <Text>**UPDATE**</Text>
                    <Box textAlign='right'>
                        <IconButton border='2px solid red' >
                            <FontAwesomeIcon icon={faPenToSquare} onClick={toggleEditOption} color='black' />
                        </IconButton>
                    </Box>
                </>
            ) : (
                <>
                    <Text>{game.day_of_week}, {game.game_date} at {game.game_time}</Text>
                    <Text>{game.home_team_name} : <b>{game.home_team_score}</b> {game.home_team_result == 'W' && winnerIcon}</Text>
                    <Text>{game.away_team_name} : <b>{game.away_team_score}</b> {game.away_team_result == 'W' && winnerIcon}</Text>
                    <Box textAlign='right'>
                        <IconButton border='2px solid #3a7259'>
                            <FontAwesomeIcon icon={faPenToSquare} onClick={toggleEditOption} color='black' />
                        </IconButton>
                    </Box>
                </>
            ))}
        </div>
    );
}

export default AdminPastGamesItem;