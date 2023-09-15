import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Box, Button, Card, CardBody, Heading, IconButton, Stack, Tabs, Text, Textarea } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

// Page at '/adminannouncements'

function AdminAnnouncementsPage() {

    const dispatch = useDispatch();

    const [newAnnouncement, setNewAnnouncement] = useState('');

    const allAnnouncements = useSelector(store => store.announcements.allAnnouncements)
    // console.log('allAnnouncements are:', allAnnouncements)
    // TODO: why does this update upon every letter typed in the input/textarea?

    const handleAddAnnouncement = (event) => {
        event.preventDefault();
        console.log('newAnnouncement is:', newAnnouncement);
        const announcementObj = {
            description: newAnnouncement
        }
        axios.post('/api/announcement', announcementObj)
            .then(response => {
                console.log("POST successful from client side", response)
                dispatch({ type: 'FETCH_ANNOUNCEMENTS' })
            })
            .catch(error => {
                console.error("error in POST new announcement!", error)
            })
        setNewAnnouncement('');
    }

    const handleDeleteAnnouncement = (itemObj) => {
        console.log("inside handleDelete", itemObj.id);
        // may as well send the whole object?

        axios.delete(`/api/announcement/${itemObj.id}`)
            .then(response => {
                console.log("DELETE successful from client side")
                dispatch({ type: 'FETCH_ANNOUNCEMENTS' })
            })
            .catch(error => {
                console.error("error in DELETE announcement!", error)
            })
    }

    return (
        <div className="container">
            <Heading
                fontSize='md'
                color='#f7f7f7'
                fontWeight='bold'
                textShadow='0 0 3px #383838'
                mb='20px'
            >
                Admin Announcements
            </Heading>

            <form onSubmit={handleAddAnnouncement}>
                <Textarea
                    type="text"
                    style={{ minHeight: '100px', width: '100%' }}
                    bgColor='#f7f7f7'
                    border='1px solid black'
                    placeholder='type new announcement here...'
                    value={newAnnouncement}
                    onChange={(event) => setNewAnnouncement(event.target.value)}
                    onInput={(event) => {
                        event.target.style.height = 'auto';
                        event.target.style.height = event.target.scrollHeight + 'px';
                    }}
                ></Textarea>
                <Box textAlign='right'>
                    <Button
                        m='5px'
                        mb='25px'
                        type='submit'
                        bgColor='#fadf5e'
                        color='#383838'
                        fontWeight='bold'
                        textShadow='0 0 3px #f7f7f7'
                    >
                        Add
                    </Button>
                </Box>
            </form>

            <Box>
                <Stack>
                    {allAnnouncements.map((item, index) => (
                        <Card key={index} variant='elevated'>
                            <CardBody>
                                <Text>
                                    <b>{item.date}</b>: {item.description}
                                </Text>
                                <Box textAlign='right'>
                                    <IconButton border='2px solid pink'>
                                        <FontAwesomeIcon icon={faTrashCan} onClick={() => handleDeleteAnnouncement(item)} color='black' />
                                    </IconButton>
                                </Box>
                            </CardBody>
                        </Card>
                    ))}
                </Stack>
            </Box>
        </div >
    );
}

export default AdminAnnouncementsPage;