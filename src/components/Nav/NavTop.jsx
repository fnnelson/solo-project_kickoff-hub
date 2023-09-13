import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
// import './NavTop.css';
import { useSelector } from 'react-redux';

import { Box, Center, Flex, Grid, GridItem, Heading, Spacer } from '@chakra-ui/react';


function NavTop({ isAdminMode }) {
    const user = useSelector((store) => store.user);

    return (
        <Box bg={'gray.200'} borderBottom='1px solid gray' position='fixed' top='0' left='0' right='0' zIndex='1000'>
            <Flex as='nav' m='2px'>
                <Box flex='3' h='50px' bg='red' >
                    <Link to="/home">
                        <Heading size='xl' className='nav-title'>KickOff Hub</Heading>
                    </Link>
                </Box>

                {/* If no user is logged in, show these links */}
                {!user.id && (
                    <Center flex='1' h='50px' bg='pink' >
                        <Link to="/login">
                            Login / Register
                        </Link>
                    </Center>
                )}

                {/* <Link to="/weather">
                *Weather API*
                </Link> */}

                <Center flex='1' h='50px' bg='purple'>
                    <Link to="/about">
                        About
                    </Link>
                </Center>

                {user.id && (
                    <Center flex='1' h='50px' bg='yellow' >
                        <LogOutButton />
                    </Center>
                )}

            </Flex>
        </Box>
    );
}

export default NavTop;
