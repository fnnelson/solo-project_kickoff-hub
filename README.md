
![Logo](./src/assets/images/readme_screenshots/KickOffHub_Banner.png)


# KickOff Hub

## Inspiration for App
I play in an adult rec soccer league where players sign up individually, rate their own skill level, and teams are randomized and balanced so you play with new people every season. The league is self-managed, so the administrators are usually participating in the league as well.

I developed a starter app to be a logistical resource for the players, giving them quick info for their next games, directions, announcements, and (when they have more time) to look at previous game scores and league standings.  It also serves as an easy way for the admin (who is usually a player too) to handle scheduling, add announcements, update scores, and use all the same features as the other players.

## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Background | ![#3a7259](https://via.placeholder.com/10/3a7259?text=+) #3a7259 |
| Accent | ![#fadf5e](https://via.placeholder.com/10/fadf5e?text=+) #fadf5e |
| Card Background / Text | ![#f7f7f7](https://via.placeholder.com/10/f7f7f7?text=+) #f7f7f7 |
| Text (Secondary) | ![#383838](https://via.placeholder.com/10/383838?text=+) #383838 |


## Tech Stack

**Client:** React.js, Redux/Sagas, JavaScript, HTML, CSS, Chakra UI, FontAwesome Icons

**Server:** Node.js, Express.js

**Database:** PostgreSQL, Postico

## Features

#### Player side
- Gives player quick info on next game details, including date, time, field, jersey to wear, record opponent, link for navigating to game
- Calendar to show scheduled games, past games and their scores, canceled games status
- League standings that update in real-time as admin updates scores
- Announcements and FAQs available to see for players

#### Admin side
- Admin usually plays in the league so they have access to all the features that the player has
- Admin can switch between Player view and Admin view of the app
- Admin can see how many games need scores from past games
- Admin can update scores (or edit errors on past games that have already been updated), add/delete games in the schedule, cancel games.
- Ability to assign or reassign players to different teams
- Add announcements for players to see.

### Prerequisites

- Install Node JS on computer
```bash
  npm install
```
- add database called "kickoff_hub" (or rename DB in pool.js) 
- database.sql has tables and starting data for use of app.  Game dates can be updated to be more relevant and to show all app features, I usually choose half in the past, half in the future.  Alternatively (as you will see below), games can be added by an administrator.

## Screenshots

#### Player Home Page (home button on nav bar)
<img src="./src/assets/images/readme_screenshots/Screenshot_1_PlayerHome.png" alt="Player Home Page" width="300"/>

#### Game Details Page (clicking on Next Game on home page)
<img src="./src/assets/images/readme_screenshots/Screenshot_2_GameDetails.png" alt="Game Details Page" width="300"/>

#### Upcoming Games / Past Games (calendar on nav bar)
<img src="./src/assets/images/readme_screenshots/Screenshot_3_UpcomingGames.png" alt="Upcoming Games Page" width="300"/>
<img src="./src/assets/images/readme_screenshots/Screenshot_4_PastGames.png" alt="Past Games Page" width="300"/>

#### League Standings (trophy on nav bar)
<img src="./src/assets/images/readme_screenshots/Screenshot_5_LeagueStandings.png" alt="League Standings" width="300"/>

#### Announcements / FAQ (clipboard on nav bar)
<img src="./src/assets/images/readme_screenshots/Screenshot_6_AnnouncementsAndFAQ.png" alt="Announcements and FAQ" width="300"/>

#### Admin Player-Side Home
<img src="./src/assets/images/readme_screenshots/Screenshot_7_AdminPlayerSideHome.png" alt="Admin Player-Side Home" width="300"/>

#### Admin Home (switch button in middle of nav bar for admin users only)
<img src="./src/assets/images/readme_screenshots/Screenshot_8_AdminHome.png" alt="Admin Home" width="300"/>

#### Admin Past Games, Scheduling Games, Upcoming Games (+ on nav bar or clicking Add Scores or Schedule Games on home page)
<img src="./src/assets/images/readme_screenshots/Screenshot_9_AdminPastGames.png" alt="Admin Past Games" width="300"/>
<img src="./src/assets/images/readme_screenshots/Screenshot_10_AdminScheduleGames.png" alt="Admin Schedule Games" width="300"/>
<img src="./src/assets/images/readme_screenshots/Screenshot_11_AdminUpcomingGames.png" alt="Admin Upcoming Games" width="300"/>

#### Admin Team Management Summary / Player Matching (team on nav bar)
<img src="./src/assets/images/readme_screenshots/Screenshot_12_AdminTeamManagementSummary.png" alt="Admin Team Management Summary" width="300"/>
<img src="./src/assets/images/readme_screenshots/Screenshot_13_Admin_PlayerMatching.png" alt="Admin Player Matching" width="300"/>

#### Admin Announcements (bullhorn on nav bar)
<img src="./src/assets/images/readme_screenshots/Screenshot_14_AdminAnnouncements.png" alt="Admin Announcements" width="300"/>

#### About Page / Special Thanks
<img src="./src/assets/images/readme_screenshots/Screenshot_15_AboutPage.png" alt="About Page" width="300"/>

## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/fnnelson)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/forrest-nelson/)
## 🚀 About Me
My name is Forrest and I am a college graduate with a Mathematics degree and 12 years of expertise in Mortgage Underwriting. Currently, I'm expanding my skill set in full-stack software engineering. My strengths are in analytical problem-solving and enjoying collaboration with colleagues and clientele, making me a valuable asset in the tech industry. Outside of work, I'm an avid traveler, concert enthusiast, and passionate soccer player and fan.

## Acknowledgements

Thanks to my instructor Key, all of the instructors and staff in Prime Digital Academy including Dane, Rachel, Andrew, Matt, and Aaron, as well as all of my amazing cohort-mates in the Iolite cohort.