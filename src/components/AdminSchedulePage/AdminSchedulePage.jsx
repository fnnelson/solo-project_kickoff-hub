import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminPastGamesItem from "./AdminPastGamesItem";
import AdminUpcomingGamesItem from "./AdminUpcomingGamesItem";
import AdminSchedulingForm from "./AdminSchedulingForm";
import { Card, CardBody, Divider, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

function AdminSchedulePage() {

    const upcomingGames = useSelector(store => store.games.upcomingGames);
    const pastGames = useSelector(store => store.games.pastGames);

    const [toggle, setToggle] = useState(true);

    const togglePastFuture = () => {
        setToggle(!toggle);
        // console.log('toggle is now:', toggle)
    }

    return (
        <div className="container">

            <Tabs isManual variant='enclosed' align="center">
                <TabList>
                    <Tab>Past Games</Tab>
                    <Tab>Upcoming Games</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <>
                            <div>
                                {pastGames.map((game, index) => (
                                    <Card key={index} m='10px'>
                                        <CardBody>
                                            <AdminPastGamesItem game={game} />
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                            <p>[x] - score has not yet been entered</p>
                        </>
                    </TabPanel>
                    <TabPanel>
                        <>
                            <h3>Add New Game to Schedule:</h3>
                            <AdminSchedulingForm />
                            <Link to='/adminannouncements'><h4>Add announcement if canceling game</h4></Link>
                            <Divider my='10px' />
                            <div>
                                {upcomingGames.map((game, index) => (
                                    <Card key={index} m='10px'>
                                        <CardBody>
                                            <AdminUpcomingGamesItem game={game} />
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        </>
                    </TabPanel>
                </TabPanels>
            </Tabs>

            {/* <button onClick={togglePastFuture}>Toggle</button> */}
        </div >
    );
}

export default AdminSchedulePage;





