import { Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';

// Page at '/playerannouncements'

function PlayerAnnouncementsPage() {

    const allAnnouncements = useSelector(store => store.announcements.allAnnouncements)

    return (
        <div className="container">

            <Tabs isManual variant='enclosed'>
                <TabList>
                    <Tab>Announcements</Tab>
                    <Tab>FAQs</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Box>
                            <Stack>
                                {allAnnouncements.map((item, index) => (
                                    <Card key={index} variant='elevated'>
                                        <CardBody>
                                            <Text>
                                                {item.date}: {item.description}
                                            </Text>
                                        </CardBody>
                                    </Card>
                                ))}
                            </Stack>
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <Box>
                            <Card >
                                <CardHeader>
                                    <Heading size='md'>League Details</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Stack divider={<StackDivider />} spacing='4'>
                                        <Box>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Game and League Basics
                                            </Heading>
                                            <Text pt='2' fontSize='sm'>
                                                Games are 7v7 and played on Turf.  Halves are 25 minutes with a 2 minute half-time.  There are 6 regular season games plus 2 play off games.  Game time posted is the kick off time.  Rotating GK unless there is a designated GK on your team. Refund is only available if completed 2 weeks prior to kick off of first game. Teams will consist of 11-12 players. Teams will be determined 3-4 days prior to first game. League jerseys are required, and team captains are responsible for bringing on the first game day. Got questions? Email us at forrestnnelson@gmail. Bring both Home and Away jerseys to games just in case, though we will have jersey colors posted on the app.
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Game Ball
                                            </Heading>
                                            <Text pt='2' fontSize='sm'>
                                                A size 5 ball will be used for the adult coed league. Home team provides game ball.
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Substitutions
                                            </Heading>
                                            <Text pt='2' fontSize='sm'>
                                                Substitutions can be made during a stoppage of play. "On-the-fly" substitutions in a soccer match can be made while the ball is in play and are unlimited for non-goalkeepers. Goalkeepers can only be replaced when the ball is out of play, with the referee's approval. Players leaving the field must use the substitution zone by the touchline, and the entering player can do so only after the exiting player has crossed the touchline. The substitution is completed when the new player enters, with the replaced player no longer considered part of the game. Goalkeepers can swap positions with outfield players during a stoppage with prior referee approval. Substitutes are under the referee's authority, whether they are called to play or not.
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Player Equipment
                                            </Heading>
                                            <Text pt='2' fontSize='sm'>
                                                1. A player shall not wear anything that is dangerous to other players and/or themselves including jewelry.
                                            </Text>
                                            <Text pt='2' fontSize='sm'>
                                                2. The usual equipment of a player shall consist of a shirt, shorts/sweatpants, shoes, and socks, which
                                                should be consistent in color throughout the team, except for the goalkeeper.
                                            </Text>
                                            <Text pt='2' fontSize='sm'>
                                                3. Numbered jerseys are recommended in all leagues.
                                            </Text>
                                            <Text pt='2' fontSize='sm'>
                                                4. Shin guards are recommended, but not required.
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Heading size='xs' textTransform='uppercase'>
                                                The Start of Play
                                            </Heading>
                                            <Text pt='2' fontSize='sm'>
                                                The home team shall kick off at the beginning of the game. The visiting team shall kick off at the beginning of the second half. You CAN score directly from a kick-off. Each team will begin by defending the goal farthest from their players' bench. When the referee has given a signal, the game shall be started by the player taking a place kick, i.e. a kick at the ball while it is stationary on the ground in the center of the field. On the kick-off to start the game or to begin play after a goal, the ball does have to go forward. All players shall be in their own half, and the players of the team opposing that of the player taking the kick shall remain at a distance of not less than 10 yards from the ball until it is kicked. The kicker shall not play the ball a second time until it has been touched or played by another player.
                                            </Text>
                                        </Box>
                                    </Stack>
                                </CardBody>
                            </Card>
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
}

export default PlayerAnnouncementsPage;