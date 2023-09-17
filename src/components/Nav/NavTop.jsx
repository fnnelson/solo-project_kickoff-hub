import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
// import './NavTop.css';
import { useSelector } from 'react-redux';
import CanvaName from '../../assets/images/CanvaName.jpeg'
import CanvaNoName from '../../assets/images/CanvaNoName.png'

import { Box, Center, Flex, Grid, GridItem, Heading, Spacer } from '@chakra-ui/react';


function NavTop({ isAdminMode }) {
    const user = useSelector((store) => store.user);

    return (
        <Box
            bg={'gray.200'}
            borderBottom='1px solid white'
            position='fixed'
            top='0'
            left='0'
            right='0'
            zIndex='1000'
            style={{ backgroundImage: user.id ? `url(${CanvaName}` : `url(${CanvaNoName})`, backgroundSize: 'cover' }}
        >
            < Flex as='nav' m='2px' >
                <Box flex='3' h='60px' >
                    <Link to="/home">
                            <Heading size='xl' className='nav-title'> </Heading>
                    </Link>
                </Box>

                <Center flex='1' h='60px' style={{ color: '#f7f7f7', fontWeight: 'bold', textShadow: '0 0 5px #383838' }} >
                    <Link to="/about">
                        About
                    </Link>
                </Center>

                {/* If no user is logged in, show these links */}
                {
                    !user.id && (
                        <Center flex='2' h='60px' style={{ color: '#f7f7f7', fontWeight: 'bold', textShadow: '0 0 5px #383838' }}>
                            <Link to="/login">
                                Login / Register
                            </Link>
                        </Center>
                    )
                }

                {/* <Link to="/weather">
                *Weather API*
                </Link> */}


                {
                    user.id && (
                        <Center flex='1' h='60px' >
                            <LogOutButton />
                        </Center>
                    )
                }

            </Flex >
        </Box >
    );
}

export default NavTop;
