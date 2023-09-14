import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import './NavBottom.css';
import { useSelector } from 'react-redux';

import { Box, Flex, Center } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCalendarDays, faTrophy, faClipboardQuestion, faFutbol, faBullhorn, faRepeat, faCalendarPlus, faPeopleGroup, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const homeIcon = <FontAwesomeIcon icon={faHouse} />
const calendarIcon = <FontAwesomeIcon icon={faCalendarDays} />
const trophyIcon = <FontAwesomeIcon icon={faTrophy} />
const faqIcon = <FontAwesomeIcon icon={faClipboardQuestion} />
// const ballIcon = <FontAwesomeIcon icon={faFutbol} />
const switchIcon = <FontAwesomeIcon icon={faRepeat} />
const editIcon = <FontAwesomeIcon icon={faPenToSquare} />
const calendarPlusIcon = <FontAwesomeIcon icon={faCalendarPlus} />
const teamIcon = <FontAwesomeIcon icon={faPeopleGroup} />
const bullhornIcon = <FontAwesomeIcon icon={faBullhorn} />


function NavBottom({ toggleAdminMode, isAdminMode }) {
  const user = useSelector((store) => store.user);

  return (
    <Box bg={'gray.200'} borderTop='1px solid gray' position='fixed' bottom='0' left='0' right='0'>
      <Flex as='nav' m='2px'>
        {/* If a user is logged in, show these links */}
        {user.id && !user.admin && (
          <>
            <Center flex='1' h='50px'  >
              <Link className="navLink" to="/playerhome">
                {homeIcon}
              </Link>
            </Center>

            <Center flex='1' h='50px' >
              <Link className="navLink" to="/playercalendar">
                {calendarIcon}
              </Link>
            </Center>

            <Center flex='1' h='50px' >
              <Link className="navLink" to="/playerteamrankings">
                {trophyIcon}
              </Link>
            </Center>

            <Center flex='1' h='50px' >
              <Link className="navLink" to="/playerannouncements">
                {faqIcon}
              </Link>
            </Center>
          </>
        )}

        {user.admin && !isAdminMode && (
          <>
            <Center flex='1' h='50px'  >
              <Link className="navLink" to="/playerhome">
                {homeIcon}
              </Link>
            </Center>

            <Center flex='1' h='50px' >
              <Link className="navLink" to="/playercalendar">
                {calendarIcon}
              </Link>
            </Center>

            <Center flex='1' h='50px' >
              <Link to='/adminhome'>
                <button className="navButton" onClick={toggleAdminMode} >
                  {switchIcon}
                </button>
              </Link>
            </Center>

            <Center flex='1' h='50px' >
              <Link className="navLink" to="/playerteamrankings">
                {trophyIcon}
              </Link>
            </Center>

            <Center flex='1' h='50px' >
              <Link className="navLink" to="/playerannouncements">
                {faqIcon}
              </Link>
            </Center>
          </>
        )}

        {isAdminMode && user.admin && (
          <>
            <Center flex='1' h='50px'  >
              <Link className="navLink" to="/adminhome">
                {homeIcon}
              </Link>
            </Center>

            <Center flex='1' h='50px'  >
              <Link className="navLink" to="/adminschedule">
                {calendarPlusIcon}
              </Link>
            </Center>

            <Center flex='1' h='50px'  >
              <Link to='/playerhome'>
                <button className="navButton" onClick={toggleAdminMode}>
                  {switchIcon}
                </button>
              </Link>
            </Center>

            <Center flex='1' h='50px'  >
              <Link className="navLink" to="/adminteamcreation">
                {teamIcon}
              </Link>
            </Center>

            <Center flex='1' h='50px'  >
              <Link className="navLink" to="/adminannouncements">
                {bullhornIcon}
              </Link>
            </Center>

          </>
        )}
      </Flex>
    </Box>
  );
}

export default NavBottom;
