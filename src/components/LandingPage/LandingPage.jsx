import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import { Box, Button, Container, Divider, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <Text fontWeight='bold' color='#f7f7f7'>Welcome to KickOff Hub!</Text>
      <Text color='#f7f7f7' fontStyle='italic'>Please Register Here:</Text>

      <div className="grid">
        <RegisterForm />

        <center>
          <Text fontSize='sm' mb='5px' color='#f7f7f7' >Already a Member?</Text>
          <Button
            bgColor='#fadf5e'
            outline='2px solid #383838'
            onClick={onLogin}
          >
            Login
          </Button>
        </center>
      </div>
      <Box m='20px'>
        <Divider />
        <Heading py='20px'>
          <Text color='#f7f7f7' as="h1" fontSize='lg'>Welcome to the KickOff Hub App</Text>
        </Heading>

        <Container my='20px'  >
          <Text fontSize='lg' fontWeight='bold' color='#fadf5e'>For Players:</Text>
          <UnorderedList color='#f7f7f7'>
            <ListItem>
              <Text fontWeight='bold'>User-Friendly Sign-In</Text>
              <Text>Players can easily log in to the app, creating a personalized account that keeps track of their team and league-related information.</Text>
            </ListItem>
            <ListItem>
              <Text fontWeight='bold'>Game Details</Text>
              <Text>The app provides players with detailed information about their upcoming games. This includes game time, location, and directions to the field.</Text>
            </ListItem>
            <ListItem>
              <Text fontWeight='bold'>Team Schedule</Text>
              <Text>Players can access their team's complete schedule through the app. This schedule not only includes upcoming games but also past matches.</Text>
            </ListItem>
            <ListItem>
              <Text fontWeight='bold'>League Standings</Text>
              <Text>The app offers real-time access to league standings. Players can easily check how their team ranks compared to others.</Text>
            </ListItem>
            <ListItem>
              <Text fontWeight='bold'>Announcements and FAQs</Text>
              <Text>Important league announcements, updates, and FAQs are readily available within the app, keeping players informed.</Text>
            </ListItem>
          </UnorderedList>
        </Container >

        <Container my='20px' >
          <Text fontSize='lg' fontWeight='bold' color='#fadf5e'>For League Administrators:</Text>
          <UnorderedList color='#f7f7f7'>
            <ListItem>
              <Text fontWeight='bold'>Player Management</Text>
              <Text>Administrators can efficiently manage player registrations through the app. They can add new players, update player information, and ensure the roster is up to date.</Text>
            </ListItem>
            <ListItem>
              <Text fontWeight='bold'>Score Updates</Text>
              <Text>Administrators have the ability to update scores for games in real-time, ensuring accurate and up-to-date statistics.</Text>
            </ListItem>
            <ListItem>
              <Text fontWeight='bold'>Game Management</Text>
              <Text>The app allows administrators to handle various aspects of game management, including canceling games due to unforeseen circumstances or adding new games to the schedule.</Text>
            </ListItem>
            <ListItem>
              <Text fontWeight='bold'>Announcement Updates</Text>
              <Text>Administrators can easily broadcast important announcements to all app users, ensuring critical information reaches all participants promptly.</Text>
            </ListItem>
          </UnorderedList>
        </Container >

        <footer>
          <Text color='#fadf5e'>In summary, the KickOff Hub app serves as a centralized platform for all things related to organized sports. This comprehensive tool enhances the overall experience of both players and administrators, making sports leagues more organized and enjoyable for everyone involved.</Text>
        </footer>

      </Box>
    </div>
  );
}

export default LandingPage;
