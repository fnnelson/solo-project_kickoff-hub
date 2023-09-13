import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
// import './NavTop.css';
import { useSelector } from 'react-redux';

import { Box, Flex, Grid, GridItem, Heading, Spacer } from '@chakra-ui/react';


function NavTop({ isAdminMode }) {
    const user = useSelector((store) => store.user);

    return (
        <Box bg={'lightgray'}>
            <Grid
                h='100px'
                p='10px'
                alignItems={'center'}
                justifyContent={'space-between'}
                minWidth='max-content'
                templateColumns='repeat(5, 1fr)'
                gap={1}
            >
                <GridItem colSpan={2} bg={'red'}>
                    <Link to="/home">
                        <Heading size='xl' className='nav-title'>KickOff Hub</Heading>
                    </Link>
                </GridItem>

                {/* If no user is logged in, show these links */}
                {!user.id && (
                    <GridItem colStart={4} colEnd={5} bg={'blue'} justifyContent={'center'}>
                        <Link to="/login">
                            Login / Register
                        </Link>
                    </GridItem>
                )}

                {/* <Link to="/weather">
                *Weather API*
                </Link> */}

                <GridItem colStart={5} bg={'pink'}>
                    <Link to="/about">
                        About
                    </Link>
                </GridItem>

                {user.id && (
                    <GridItem colStart={6} colEnd={6} bg={'green'}>
                        <LogOutButton />
                    </GridItem>
                )}

            </Grid>
        </Box>
    );
}

export default NavTop;
