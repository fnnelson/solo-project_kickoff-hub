import React from 'react';
import { useSelector } from 'react-redux';

function AdminHomePage() {

    const user = useSelector((store) => store.user);

    const boxStyle = {
        border: '2px solid black',
        padding: '10px',
        display: 'inline-block',
        margin: '15px',
    };

    return (
        <div className="container">
            <p>Admin Page</p>
            {user.name ? <h2>Welcome, Admin {user.name}!</h2> : <h2>Welcome, Admin {user.username}!</h2>}
            <div style={boxStyle}>
                <h1>Add Scores / New Games</h1>
            </div>
            <br />
            <div style={boxStyle}>
                <h1>Add New Announcement</h1>
            </div>
        </div>
    );
}

export default AdminHomePage;