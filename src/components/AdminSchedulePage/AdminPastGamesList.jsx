import React from "react";

const inputStyle = {
    width: '15px'
}

function AdminPastGamesList({ game }) {
    return <div>
        {game.home_team_score == -1 || game.away_team_score == -1 ?
            <p style={{ backgroundColor: 'pink' }}>**UPDATE** {game.day_of_week}, {game.game_date} at {game.game_time} - {game.home_team_name} <input style={inputStyle} /> - <input style={inputStyle} /> {game.away_team_name} **UPDATE**</p> :
            <p>{game.day_of_week}, {game.game_date} at {game.game_time} - {game.home_team_name} <input style={inputStyle} value={game.home_team_score} />  - <input style={inputStyle} value={game.away_team_score} /> {game.away_team_name}</p>}
    </div>;
}

export default AdminPastGamesList;