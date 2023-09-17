import { Box, Center, Divider, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem } from '@fortawesome/free-regular-svg-icons';
import qrCode from '../../assets/images/LinkedIn QR Code.jpeg';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div >
        <Text fontSize='xl' fontWeight='bold' color='#fadf5e'>
          Forrest Nelson
        </Text>
        <Text
          color='#f7f7f7'>
          Prime Digital Academy <FontAwesomeIcon icon={faGem} style={{ color: "#a372fd", }} /> Iolite Cohort
        </Text>
        <Divider my='10px' />
        <Text
          color='#f7f7f7'>
          Technology used to develop KickOff Hub: React, React Redux & Sagas, JavaScript, Node.js, Express, PostgreSQL, Postico, HTML, VS Code
        </Text>
        <Text
          color='#f7f7f7'>
          Styling: CSS, Chakra UI, FontAwesome Icons
        </Text>
        <Divider my='10px' />
        <Text
          color='#f7f7f7'>
          Ideas for addl features: player attendance, team chat, player profiles, weather forecasts.
        </Text>
        <Divider my='10px' />
        <Text
          color='#f7f7f7'>
          Thank you to our instructor Key, all of the Prime instructors and staff including Dane, Rachel, Andrew, and Aaron, and all of my amazing cohort-mates in Iolite!
        </Text>
        <Box>
          <Center my='5px'>
            <Text color='#fadf5e'>Connect with me on LinkedIn!</Text>
          </Center>
          <Center my='5px'>
            <Image border='2px solid #383838' src={qrCode} boxSize='100px' alt='Forrest Nelson LinkedIn QR Code' />
          </Center>
        </Box>
      </div >
    </div >
  );
}

export default AboutPage;
