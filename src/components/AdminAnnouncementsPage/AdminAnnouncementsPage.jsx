import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

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

    const announcementStyle = {
        border: '2px solid black',
        padding: '5px',
        margin: '25px',
    };

    return (
        <div className="container">
            <p>Admin Announcements Page</p>

            <form onSubmit={handleAddAnnouncement}>
                <textarea
                    type="text"
                    style={{ minHeight: '100px', width: '400px' }}
                    placeholder='type new announcement...'
                    value={newAnnouncement}
                    onChange={(event) => setNewAnnouncement(event.target.value)}
                    onInput={(event) => {
                        event.target.style.height = 'auto';
                        event.target.style.height = event.target.scrollHeight + 'px';
                    }}
                ></textarea>
                <button style={{ margin: '5px' }} type='submit'>Add</button>
            </form>

            <div style={announcementStyle}>
                {allAnnouncements.map((item, index) => (
                    <div key={index} style={announcementStyle}>
                        <p><button onClick={() => handleDeleteAnnouncement(item)}>Delete</button> {item.date}: {item.description}</p>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default AdminAnnouncementsPage;