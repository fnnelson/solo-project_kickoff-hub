import { Box, Button, Card, CardBody, CardHeader, Center, Divider, HStack, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { faLocationArrow, faShirt } from "@fortawesome/free-solid-svg-icons";

// Page at '/playergamedetails/(gameid)'

function PlayerGameDetailsPage() {

    const { gameId } = useParams();

    const [gameDetails, setGameDetails] = useState(null);

    useEffect(() => {
        fetchSingleGame();
    }, [gameId])

    const getShirtIconStyle = (color) => ({
        color: color, // setting the icon color to the provided hex code
    });

    const fetchSingleGame = () => {
        console.log('inside fetchSingleGame with gameId:', gameId)
        axios.get(`/api/game/${gameId}`)
            .then(response => {
                console.log('response with GET single game:', response.data)
                let gameDate = new Date(response.data[0].game_date).toLocaleDateString("en-us", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                });

                // let day = gameDate.getDate();
                // let month = gameDate.getMonth() + 1; // month plus 1 since it does 0-11
                // let formattedDate = `${month}/${day}`

                response.data[0].game_date = gameDate;
                let dbTime = response.data[0].game_time;
                // console.log('DB time is:', dbTime)
                if (dbTime[0] == '0') {
                    dbTime = dbTime.slice(1);
                    response.data[0].game_time = dbTime;
                }

                setGameDetails(response.data[0])
            })
            .catch(error => {
                console.error('error with GET single game', error)
            })
    }

    return (
        <div className="container">
            {gameDetails ? (
                <div>
                    {gameDetails.cancel_status ?
                        <>
                            <Text as='h1' color='red'>Game Canceled <Link to='/playerannouncements'><Button>Announcements</Button></Link> </Text>
                        </>
                        :
                        <Text fontSize='lg' textAlign='center' color='#fadf5e' my='10px' textShadow='0 0 5px #383838'>Game Details</Text>
                    }
                    <a href={gameDetails.maps_link} target="_blank" rel="noopener noreferrer">
                        <span style={{ position: 'relative' }}>
                            <img
                                src={gameDetails.field_photo || 'http://via.placeholder.com/450x250'} // Use the provided photo URL or a placeholder
                                alt="Field Photo"
                                style={{
                                    width: '450px',
                                    height: '250px',
                                    border: '2px solid #383838'
                                }}
                            />
                        </span>
                    </a>
                    <Text textAlign='right'>click photo for navigation <FontAwesomeIcon icon={faLocationArrow} /></Text>
                    <Stack textAlign='center' m='20px' fontWeight='bold' color='#f7f7f7'>
                        <Text fontSize='lg'>{gameDetails.field_name}</Text>
                        <Text fontSize='md'>{gameDetails.address}</Text>
                        <Text fontSize='lg'>{gameDetails.game_date} @ {gameDetails.game_time}</Text>
                    </Stack>

                    <Center>
                        <HStack spacing='6'>
                            <Stack align='center' color='#f7f7f7'>
                                <Text align='center'>{gameDetails.home_team_name}</Text>
                                <Text>{gameDetails.home_team_wins}-{gameDetails.home_team_losses}-{gameDetails.home_team_draws}</Text>
                                <Text align='center' fontSize='4xl'>
                                    <FontAwesomeIcon
                                        icon={faShirt}
                                        style={getShirtIconStyle(gameDetails.home_jersey)}
                                    />
                                </Text>
                                <Heading size='xs'>Home</Heading>
                            </Stack>
                            <Text m='5px' color='#f7f7f7'>vs.</Text>
                            <Stack align='center' color='#f7f7f7'>
                                <Text align='center'>{gameDetails.away_team_name}</Text>
                                <Text>{gameDetails.away_team_wins}-{gameDetails.away_team_losses}-{gameDetails.away_team_draws}</Text>
                                <Text align='center' fontSize='4xl'>
                                    <FontAwesomeIcon
                                        icon={faShirt}
                                        style={getShirtIconStyle(gameDetails.away_jersey)}
                                    />
                                </Text>
                                <Heading size='xs'>Away</Heading>
                            </Stack>
                        </HStack>
                    </Center>
                </div>

            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default PlayerGameDetailsPage;