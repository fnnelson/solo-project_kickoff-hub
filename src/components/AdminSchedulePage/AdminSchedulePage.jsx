import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminPastGamesItem from "./AdminPastGamesItem";
import AdminUpcomingGamesItem from "./AdminUpcomingGamesItem";
import AdminSchedulingForm from "./AdminSchedulingForm";
import { Box, Button, Card, CardBody, Center, Divider, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";

function AdminSchedulePage() {

    const upcomingGames = useSelector(store => store.games.upcomingGames);
    const pastGames = useSelector(store => store.games.pastGames);
    const user = useSelector((store) => store.user);

    const [toggle, setToggle] = useState(true);

    const togglePastFuture = () => {
        setToggle(!toggle);
        // console.log('toggle is now:', toggle)
    }

    console.log("pastGames:", pastGames)

    return (
        <div className="container">

            <Tabs isManual variant='enclosed' align="center" colorScheme='linkedin'>
                <TabList>
                    <Tab color='#f7f7f7' _selected={{ color: '#397259', bg: '#fade5d' }}>Past Games</Tab>
                    <Tab color='#f7f7f7' _selected={{ color: '#397259', bg: '#fade5d' }}>Upcoming Games</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <>
                            <div>
                                {pastGames.map((game, index) => (
                                    <Card key={index} m='10px' style={{ color: game.cancel_status && '#f7f7f7', backgroundColor: game.cancel_status ? '#383838' : (game.home_team_score === -1 || game.away_team_score === -1) ? 'pink' : '#f7f7f7' }}>
                                        <CardBody>
                                            <AdminPastGamesItem game={game} user={user} />
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                            <p>[x] - score has not yet been entered</p>
                        </>
                    </TabPanel>
                    <TabPanel>
                        <>
                            <Box>
                                <Text color='#f7f7f7' textShadow='0 0 3px black' fontSize='lg' m='10px'><b>Add New Game to Schedule:</b></Text>
                            </Box>
                            <AdminSchedulingForm />
                            <Divider my='10px' />
                            <Center>
                                <Link to='/adminannouncements'><Button variant='outline' color='#fadf5e' mt='10px' mb='20px'>Add announcement if canceling game</Button></Link>
                            </Center>
                            <div>
                                {upcomingGames.map((game, index) => (
                                    <Card key={index} m='10px' style={{ color: game.cancel_status && '#f7f7f7', backgroundColor: game.cancel_status && '#383838' }}>
                                        <CardBody>
                                            <AdminUpcomingGamesItem game={game} user={user} />
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        </>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div >
    );
}

export default AdminSchedulePage;





