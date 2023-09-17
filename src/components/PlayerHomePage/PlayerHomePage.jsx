import { AbsoluteCenter, Box, Card, CardBody, CardFooter, CardHeader, Divider, Flex, Grid, GridItem, HStack, Heading, Stack, StackDivider, StackItem, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShirt, faCircleUser } from '@fortawesome/free-solid-svg-icons'

const getShirtIconStyle = (color) => ({
    color: color, // setting the icon color to the provided hex code
});

function PlayerHome() {
    const history = useHistory();

    const user = useSelector((store) => store.user);
    const upcomingUserGames = useSelector(store => store.games.upcomingUserGames);

    // console.log('upcomingUserGames is:', upcomingUserGames)
    // console.log('user data:', user)

    const [nextGame, setNextGame] = useState('');

    useEffect(() => {
        if (upcomingUserGames.length > 0) {
            console.log('upcomingUserGames[0] is:', upcomingUserGames[0]);
            let longDate = new Date(upcomingUserGames[0].game_date)
            let month = longDate.getMonth() + 1; // since it goes 0-11
            let day = longDate.getDate();
            let nextGameShortDate = `${month}/${day}`; // to show short-hand on Home Page
            upcomingUserGames[0].game_date = nextGameShortDate
            setNextGame(upcomingUserGames[0]);
        }
    }, [upcomingUserGames]);

    if (!user.team_id) {
        return <Box p='40px' justifyContent='center'>
            <Text fontSize='xl' m='25px'>*Team not yet assigned*</Text>
            <Text>Teams assigned one week prior to season start.  If within one week and no team assignment, it's recommended to contact the admin to confirm registration status.</Text>
        </Box>
    } else if (!nextGame) {
        return <div><p>No Upcoming Games</p></div>
    }

    const goToNextGameDetails = () => {
        history.push(`/playergamedetails/${nextGame.id}`)
    }

    return (
        <div className="container">
            <Stack>
                <StackItem h='150px' >
                    <Box>
                        <Box fontSize='xl' my='15px' >
                            <FontAwesomeIcon icon={faCircleUser} size="xl" color='#383838' />
                        </Box>
                        {user.name ? <Heading color='#f7f7f7' textShadow='0 0 5px #383838'>Hello, {user.name}!</Heading> : <Heading color='#f7f7f7' textShadow='0 0 3px #383838'>Hello, {user.username}!</Heading>}
                        <Box mt='10px'>
                            <Text color='#fadf5e' mt='10px' as='span' fontSize='sm'>Your team: {nextGame.user_team_name}</Text>
                        </Box>
                    </Box>
                </StackItem>
                <StackItem>
                    <Box>
                        <Card
                            align='center'
                            style={{
                                backgroundColor: nextGame.cancel_status ? 'pink' : '#f7f7f7',
                            }}
                            border='2px solid #383838'
                            onClick={goToNextGameDetails}
                            p='10px'
                        >
                            <CardHeader >
                                {nextGame.cancel_status ? <Heading size='md' align='center'>GAME CANCELED</Heading> : <Heading size='md' align='center' color='#383838'>NEXT GAME</Heading>}

                            </CardHeader>
                            <CardBody>
                                <HStack spacing='6'>
                                    <Stack align='center'>
                                        <Heading size='xs'>Home</Heading>
                                        <Text align='center'>{nextGame.home_team_name}</Text>
                                        <Text align='center' fontSize='4xl'>
                                            <FontAwesomeIcon
                                                icon={faShirt}
                                                style={getShirtIconStyle(nextGame.home_jersey)}
                                            />
                                        </Text>
                                    </Stack>
                                    <Text m='5px'>vs.</Text>
                                    <Stack align='center'>
                                        <Heading size='xs'>Away</Heading>
                                        <Text align='center'>{nextGame.away_team_name}</Text>
                                        <Text align='center' fontSize='4xl'>
                                            <FontAwesomeIcon
                                                icon={faShirt}
                                                style={getShirtIconStyle(nextGame.away_jersey)}
                                            />
                                        </Text>
                                    </Stack>
                                </HStack>
                                <Divider my='5px' />
                            </CardBody>
                            <Stack align='center'>
                                <Text>{nextGame.day_of_week} {nextGame.game_date}</Text>
                                <Text>{nextGame.game_time} @ {nextGame.field_name}</Text>
                            </Stack>
                        </Card>
                    </Box>
                </StackItem>
            </Stack>
        </div >
    );
}

export default PlayerHome;