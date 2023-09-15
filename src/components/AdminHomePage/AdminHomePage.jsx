import { Box, Card, Heading, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

// Page at '/adminhome'

function AdminHomePage() {

    const user = useSelector((store) => store.user);
    const pastGames = useSelector(store => store.games.pastGames);

    const noScoresGames = pastGames.filter(game =>
        // this is counting the number of games that don't yet have an official score, and will not count games that have been canceled
        (game.home_team_score === -1 || game.away_team_score === -1) && !game.cancel_status
    );

    return (
        <div className="container">
            <Box >
                <Box fontSize='xl' my='15px' >
                    <FontAwesomeIcon icon={faCircleUser} size="xl" color='#383838' />
                </Box>
                {/* {user.name ? <Heading color='#f7f7f7' textShadow='0 0 5px #383838'>Hello, {user.name}!</Heading> : <Heading color='#f7f7f7' textShadow='0 0 3px #383838'>Hello, {user.username}!</Heading>} */}
            </Box>
            <Box my='5px'>
                <Heading color='#fadf5e' textShadow='0 0 5px #383838'>Admin Home</Heading>
            </Box>

            <Link to='/adminschedule'>
                <Card
                    textAlign='center'
                    variant='outline'
                    border='2px solid #383838'
                    bgColor='#f7f7f7'
                    mt='50px'
                >
                    <Heading>Add Scores</Heading>
                    <Text fontSize='lg'><b>or</b></Text>
                    <Heading>Schedule Games</Heading>
                    {noScoresGames.length > 0 ? <Text color='red' my='5px'>{noScoresGames.length} games need scores!</Text> : <Text my='5px'>All caught up! 😎</Text>}
                </Card>
            </Link>
            <Link to='/adminannouncements'>
                <br />
                <Card
                    textAlign='center'
                    variant='outline'
                    border='2px solid #383838'
                    bgColor='#f7f7f7'
                >
                    <Heading>Add New Announcement</Heading>
                </Card>
            </Link>
        </div>
    );
}

export default AdminHomePage;