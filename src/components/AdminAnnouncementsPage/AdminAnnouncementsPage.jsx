import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

function AdminAnnouncements() {

    const dispatch = useDispatch();

    const [newAnnouncement, setNewAnnouncement] = useState('');

    const allAnnouncements = useSelector(store => store.announcements.allAnnouncements)
    // console.log('allAnnouncements are:', allAnnouncements)
    // TODO: why does this update upon every letter typed in the input/textarea?

    const addNewAnnouncement = (event) => {
        event.preventDefault();
        console.log('newAnnouncement is:', newAnnouncement);
        const announcementObj = {
            description: newAnnouncement
        }
        axios.post('/api/announcement', announcementObj)
            .then(response => {
                console.log("POST successful from client side")
                dispatch({type: 'FETCH_ANNOUNCEMENTS'})
            })
            .catch(error => {
                console.error("error in POST new announcement!", error)
            })
        setNewAnnouncement('');
    }

    const announcementStyle = {
        border: '2px solid black',
        padding: '5px',
        margin: '25px',
    };

    return (
        <div className="container">
            <p>Admin Announcements Page</p>

            <form onSubmit={addNewAnnouncement}>
                <textarea
                    type="text"
                    style={{ height: '100px', width: '200px' }}
                    placeholder='type new announcement...'
                    value={newAnnouncement}
                    onChange={(event) => setNewAnnouncement(event.target.value)}
                />
                <button style={{ margin: '5px' }} type='submit'>Add</button>
            </form>

            <div style={announcementStyle}>
                {allAnnouncements.map((item, index) => (
                    <div key={index} style={announcementStyle}>
                        <p>{item.date}: {item.description}</p>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default AdminAnnouncements;