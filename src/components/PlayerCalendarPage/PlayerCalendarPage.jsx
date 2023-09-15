import React, { useState } from "react";
import { useSelector } from "react-redux";
import PlayerUpcomingGamesItem from "./PlayerUpcomingGamesItem";
import PlayerPastGamesItem from "./PlayerPastGamesItem";
import { Card, CardBody, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

// Page at '/playercalendar'

function PlayerCalendarPage() {

    const upcomingUserGames = useSelector(store => store.games.upcomingUserGames);
    const pastUserGames = useSelector(store => store.games.pastUserGames);

    // const [toggle, setToggle] = useState(false);

    // const togglePastFuture = () => {
    //     setToggle(!toggle);
    //     // console.log('toggle is now:', toggle)
    // }

    return (
        <div className="container">
            <Tabs isManual variant='enclosed' align="center" defaultIndex={1} >
                <TabList>
                    <Tab color='#f7f7f7' _selected={{ color: '#397259', bg: '#fade5d' }}>Past Games</Tab>
                    <Tab color='#f7f7f7' _selected={{ color: '#397259', bg: '#fade5d' }}>Upcoming Games</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <>
                            <div>
                                {pastUserGames.map((game, index) => (
                                    <Card key={index} m='10px' >
                                        <CardBody>
                                            <PlayerPastGamesItem game={game} />
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                            <p>[x] - score has not yet been entered</p>
                        </>
                    </TabPanel>
                    <TabPanel>
                        <>
                            {upcomingUserGames ?
                                <div>
                                    {upcomingUserGames.map((game, index) => (
                                        <Card key={index} m='10px'>
                                            <CardBody>
                                                <PlayerUpcomingGamesItem game={game} />
                                            </CardBody>
                                        </Card>
                                    ))}
                                </div>
                                :
                                <p>No upcoming games</p>
                            }
                        </>
                    </TabPanel>
                </TabPanels>
            </Tabs>

            {/*            <button onClick={togglePastFuture}>Toggle</button> */}

        </div >
    );
}

export default PlayerCalendarPage;



