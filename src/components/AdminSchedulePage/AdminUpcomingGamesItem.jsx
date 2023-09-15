import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Box, Button, Flex, IconButton, Spacer, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function AdminUpcomingGamesItem({ game }) {

    const dispatch = useDispatch();

    const handleDelete = (gameId) => {
        // console.log("inside handleDelete", gameId)
        axios.delete(`/api/game/${gameId}`)
            .then(response => {
                console.log("deleted game!", response)
                dispatch({ type: 'FETCH_GAMES' })
            })
            .catch(error => {
                console.log("error with DELETE client side", error)
            })
    }

    const handleCancelGame = (gameId) => {
        console.log("inside handleCancelGame", gameId)
        axios.put(`/api/game/cancel/${gameId}`)
            .then(response => {
                console.log("updated cancel/game on", response)
                dispatch({ type: 'FETCH_GAMES' })
            })
            .catch(error => {
                console.log("error with PUT client side", error)
            })
    }


    return (
        <div>
            {game.cancel_status ?
                (
                    <>
                        <Text>
                            <s>{game.day_of_week}, {game.game_date} at {game.game_time} - {game.home_team_name} vs {game.away_team_name}</s>
                        </Text>
                        <Flex mt='15px'>
                            <Button onClick={() => { handleCancelGame(game.id) }}>Game On!</Button>
                            <Spacer />
                            <IconButton border='2px solid pink'>
                                <FontAwesomeIcon icon={faTrashCan} onClick={() => handleDelete(game.id)} color='black' />
                            </IconButton>
                        </Flex>
                    </>
                ) : (
                    <>
                        <Text>
                            {game.day_of_week}, {game.game_date} at {game.game_time} - {game.home_team_name} vs {game.away_team_name}
                        </Text>
                        <Flex mt='15px'>
                            <Button onClick={() => { handleCancelGame(game.id) }}>Cancel Game</Button>
                            <Spacer />
                            <IconButton border='2px solid pink'>
                                <FontAwesomeIcon icon={faTrashCan} onClick={() => handleDelete(game.id)} color='black' />
                            </IconButton>
                        </Flex>
                    </>
                )}
        </div>
    );
}

export default AdminUpcomingGamesItem;