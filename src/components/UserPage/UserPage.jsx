import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { Box, Button, Card, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <Text fontSize='xl' color='#f7f7f7' textAlign='center'>Welcome, {user.username}!</Text>
      <Box textAlign='center' my='10px'>
        <Link to='/playerhome' ><Button textAlign='center'>Go to Player Home</Button></Link>
      </Box>
      <Card bgColor='#fadf5e' color='#383838' mt='20px'>
        <LogOutButton className="btn" />
      </Card>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
