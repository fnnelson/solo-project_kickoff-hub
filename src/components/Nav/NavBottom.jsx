import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import './NavBottom.css';
import { useSelector } from 'react-redux';

import { Box, Flex, Center } from '@chakra-ui/react';


function NavBottom({ toggleAdminMode, isAdminMode }) {
  const user = useSelector((store) => store.user);

  return (
    <Box bg={'gray.200'} borderTop='1px solid gray' position='fixed' bottom='0' left='0' right='0'>
      <Flex as='nav' m='2px'>
        {/* If a user is logged in, show these links */}
        {user.id && !isAdminMode && (
          <>
            <Center flex='1' h='50px' bg='red' >
              <Link className="navLink" to="/playerhome">
                PH
              </Link>
            </Center>

            <Center flex='1' h='50px' bg='green'>
              <Link className="navLink" to="/playercalendar">
                PC
              </Link>
            </Center>

            {user.admin && (
              <Center flex='1' h='50px' bg='yellow'>
                <Link to='/adminhome'>
                  <button className="navButton" onClick={toggleAdminMode} >
                    Admn
                  </button>
                </Link>
              </Center>
            )}

            <Center flex='1' h='50px' bg='orange'>
              <Link className="navLink" to="/playerannouncements">
                PA
              </Link>
            </Center>

            <Center flex='1' h='50px' bg='lightgray'>
              <Link className="navLink" to="/playerteamrankings">
                PTS
              </Link>
            </Center>
          </>
        )}

        {isAdminMode && user.admin && (
          <>
            <Center flex='1' h='50px' bg='red' >
              <Link className="navLink" to="/adminhome">
                AM
              </Link>
            </Center>

            <Center flex='1' h='50px' bg='azure' >
              <Link className="navLink" to="/adminschedule">
                AS
              </Link>
            </Center>

            <Center flex='1' h='50px' bg='violet' >
              <Link to='/playerhome'>
                <button className="navButton" onClick={toggleAdminMode}>
                  Plyr
                </button>
              </Link>
            </Center>

            <Center flex='1' h='50px' bg='pink' >
              <Link className="navLink" to="/adminannouncements">
                AA
              </Link>
            </Center>

            <Center flex='1' h='50px' bg='blue' >
              <Link className="navLink" to="/adminteamcreation">
                ATC
              </Link>
            </Center>
          </>
        )}
      </Flex>
    </Box>
  );
}

export default NavBottom;
