import React from 'react';
import { useSelector } from 'react-redux';

// Page at '/playerannouncements'

function PlayerAnnouncementsPage() {

    const allAnnouncements = useSelector(store => store.announcements.allAnnouncements)

    const announcementStyle = {
        border: '2px solid black',
        padding: '5px',
        margin: '25px',
    };

    return (
        <div className="container">
            <p>Player Announcements and FAQs Page</p>

            <h3>Announcements</h3>
            <div style={announcementStyle}>
                {allAnnouncements.map((item, index) => (
                    <div key={index} style={announcementStyle}>
                        <p>{item.date}: {item.description}</p>
                    </div>
                ))}
            </div>

            <h3>FAQs</h3>
            <div style={announcementStyle}>
                <h3>League Details</h3>
                <p>Games are 7v7 and played on Turf.  Halves are 25 minutes with a 2 minute half-time.  There are 6 regular season games plus 2 play off games.  Game time posted is the kick off time.  Rotating GK unless there is a designated GK on your team. Refund is only available if completed 2 weeks prior to kick off of first game. Teams will consist of 11-12 players. Teams will be determined 3-4 days prior to first game. League jerseys are required, and team captains are responsible for bringing on the first game day. Got questions? Email us at forrestnnelson@gmail. Bring both Home and Away jerseys to games just in case, though we will have jersey colors posted on the app.</p>
                <h3>Game Ball</h3>
                <p>A size 5 ball will be used for the adult coed league. Home team provides game ball.</p>
                <h3>Substitutions</h3>
                <p>Substitutions can be made during a stoppage of play. "On-the-fly" substitutions in a soccer match can be made while the ball is in play and are unlimited for non-goalkeepers. Goalkeepers can only be replaced when the ball is out of play, with the referee's approval. Players leaving the field must use the substitution zone by the touchline, and the entering player can do so only after the exiting player has crossed the touchline. The substitution is completed when the new player enters, with the replaced player no longer considered part of the game. Goalkeepers can swap positions with outfield players during a stoppage with prior referee approval. Substitutes are under the referee's authority, whether they are called to play or not.</p>
                <h3>Player Equipment</h3>
                <p>1. A player shall not wear anything that is dangerous to other players and/or themselves including jewelry.</p>
                <p>2. The usual equipment of a player shall consist of a shirt, shorts/sweatpants, shoes, and socks, which
                    should be consistent in color throughout the team, except for the goalkeeper.</p>
                <p>3. Numbered jerseys are recommended in all leagues.</p>
                <p>4. Shin guards are recommended, but not required.</p>
                <h3>The Start of Play</h3>
                <p>The home team shall kick off at the beginning of
                    the game. The visiting team shall kick off at the beginning of the second half. You CAN score directly
                    from a kick-off.
                    Each team will begin by defending the goal farthest from their players' bench.
                    When the referee has given a signal, the game shall be started by the player taking a place kick, i.e. a
                    kick at the ball while it is stationary on the ground in the center of the field. On the kick-off to start the
                    game or to begin play after a goal, the ball does have to go forward. All players shall be in their own half,
                    and the players of the team opposing that of the player taking the kick shall remain at a distance of not
                    less than 10 yards from the ball until it is kicked. The kicker shall not play the ball a second time until it
                    has been touched or played by another player.</p>
                <p>a. After a goal has been scored, the game shall be restarted in the same manner as mentioned above
                    with the kick-off being taken by a player of the opposite team to the one that scored.</p>
                <p>b. After the half-time interval, the teams shall change ends and the kick-off shall be taken as stated
                    above.</p>
                <p>c. When restarting the game after a temporary suspension of play from any cause not mentioned
                    elsewhere in these laws, and provided that immediately preceding the suspension the ball has not
                    passed over the touch or goal lines, the referee shall drop the ball at the place where it was when the
                    play was suspended. However, when the ball was in the goal area when play was stopped, ball shall be
                    dropped at the point outside the goal area nearest the ball when the game was stopped. In one team is
                    in clear possession of the ball when play is suspended, that team shall receive a direct free kick. If no
                    one was in possession it shall be a dropped ball.</p>
                <p>During a drop ball, the ball shall be deemed to be in play the moment it has touched the ground. If,
                    however, it crosses over the touch or goal lines after the referee has dropped it, but before it is touched
                    by a player, the referee shall drop it again. No player shall play the ball until it has touched the ground. If this last provision is not in compliance, the
                    referee shall again drop the ball.</p>

            </div>
        </div >
    );
}

export default PlayerAnnouncementsPage;