import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

// Page at '/adminschedule'

function AdminPastGamesItem({ game }) {

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
                    dispatch({ type: 'FETCH_GAMES' })
                })
                .catch(error => {
                    console.error("1st PUT ain't PUTtin", error);
                });

            setEditToggle(false);
        }
    }

    const inputStyle = {
        width: '15px'
    }

    return (
        <div>
            {game.cancel_status ? (
                <p style={{ backgroundColor: 'lightgray' }}>
                    **GAME CANCELLED** <s>{game.day_of_week}, {game.game_date} at {game.game_time} - {game.home_team_name} N/A - N/A {game.away_team_name}</s> **GAME CANCELLED**
                </p>
            ) : (editToggle ? (
                game.home_team_score === -1 || game.away_team_score === -1 ? (
                    <>
                        <p style={{ backgroundColor: 'pink' }}>
                            <button onClick={handleSave}>Save</button> **UPDATE** {game.day_of_week}, {game.game_date} at {game.game_time} - {game.home_team_name}{' '}
                            <input
                                type='text'
                                style={inputStyle}
                                value={homeTeamScore}
                                onChange={(event) => { setHomeTeamScore(event.target.value) }}
                            />{' '}
                            - <input
                                type='text'
                                style={inputStyle}
                                value={awayTeamScore}
                                onChange={(event) => { setAwayTeamScore(event.target.value) }}
                            /> {game.away_team_name} **UPDATE**
                        </p>
                    </>
                ) : (
                    <>
                        <p>
                            <button onClick={handleSave}>Save</button> {game.day_of_week}, {game.game_date} at {game.game_time} - {game.home_team_name}{' '}
                            <input
                                type='text'
                                value={homeTeamScore}
                                onChange={(event) => { setHomeTeamScore(event.target.value) }}
                                style={inputStyle}
                            />{' '}
                            - <input
                                type='text'
                                style={inputStyle}
                                value={awayTeamScore}
                                onChange={(event) => { setAwayTeamScore(event.target.value) }} /> {game.away_team_name}
                        </p>
                    </>
                )
            ) : game.home_team_score === -1 || game.away_team_score === -1 ? (
                <>
                    <p style={{ backgroundColor: 'pink' }}>
                        <button onClick={toggleEditOption}>Edit</button> **UPDATE** {game.day_of_week}, {game.game_date} at {game.game_time} - {game.home_team_name} [x] - [x] {game.away_team_name} **UPDATE**
                    </p>
                </>
            ) : (
                <>
                    <p>
                        <button onClick={toggleEditOption}>Edit</button> {game.day_of_week}, {game.game_date} at {game.game_time} - {game.home_team_name} {game.home_team_score} - {game.away_team_score} {game.away_team_name}
                    </p>
                </>
            ))}
        </div>
    );
}

export default AdminPastGamesItem;