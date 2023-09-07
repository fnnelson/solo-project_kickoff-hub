import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

function AdminAnnouncements() {

    const allAnnouncements = useSelector(store => store.announcements.allAnnouncements)
    console.log('allAnnouncements are:', allAnnouncements)

    const announcementStyle = {
        border: '2px solid black',
        padding: '5px',
        margin: '25px',
    };

    return (
        <div className="container">
            <p>Admin Announcements Page</p>

            <form>
                <textarea
                    type="text"
                    style={{ height: '100px', width: '200px', lineHeight: '1' }}
                    placeholder='add new announcement'
                />

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