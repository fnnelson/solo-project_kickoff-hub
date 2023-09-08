const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET all games!
 */
router.get('/', (req, res) => {
    // GET route code here
    // console.log("get made it to the server side!");
    const sqlText = `
        SELECT
        game.id,
        game.game_date,
        CASE
            WHEN EXTRACT(DOW FROM game.game_date) = 0 THEN 'Sun'
            WHEN EXTRACT(DOW FROM game.game_date) = 1 THEN 'Mon'
            WHEN EXTRACT(DOW FROM game.game_date) = 2 THEN 'Tue'
            WHEN EXTRACT(DOW FROM game.game_date) = 3 THEN 'Wed'
            WHEN EXTRACT(DOW FROM game.game_date) = 4 THEN 'Thu'
            WHEN EXTRACT(DOW FROM game.game_date) = 5 THEN 'Fri'
            WHEN EXTRACT(DOW FROM game.game_date) = 6 THEN 'Sat'
        END AS day_of_week,
        TO_CHAR(game.game_time, 'HH:MI pm') AS game_time,
        game.home_team_score,
        game.away_team_score,
        home_team.team_name AS home_team_name,
        home_team.home_jersey,
        home_team.wins AS home_team_wins,
        home_team.losses AS home_team_losses,
        home_team.draws AS home_team_draws,
        away_team.team_name AS away_team_name,
        away_team.away_jersey,
        away_team.wins AS away_team_wins,
        away_team.losses AS away_team_losses,
        away_team.draws AS away_team_draws,
        field.field_name,
        field.address,
        field.field_photo,
        field.maps_link
    FROM game
    JOIN team AS home_team ON game.home_team_id = home_team.id
    JOIN team AS away_team ON game.away_team_id = away_team.id
    JOIN field ON game.field_id = field.id
    ORDER BY game_date, game_time;
    `;
    pool.query(sqlText)
        .then(result => {
            // console.log("success getting all games!", result.rows)
            res.send(result.rows);
        })
        .catch(error => {
            console.log("error with all games GET");
            res.sendStatus(500);
        })
});

/**
 * GET single game..
 */
router.get('/:id', (req, res) => {
    const gameId = [req.params.id];
    console.log('gameId on server side:', gameId)
    const sqlText = `
        SELECT
        game.game_date,
        CASE
            WHEN EXTRACT(DOW FROM game.game_date) = 0 THEN 'Sun'
            WHEN EXTRACT(DOW FROM game.game_date) = 1 THEN 'Mon'
            WHEN EXTRACT(DOW FROM game.game_date) = 2 THEN 'Tue'
            WHEN EXTRACT(DOW FROM game.game_date) = 3 THEN 'Wed'
            WHEN EXTRACT(DOW FROM game.game_date) = 4 THEN 'Thu'
            WHEN EXTRACT(DOW FROM game.game_date) = 5 THEN 'Fri'
            WHEN EXTRACT(DOW FROM game.game_date) = 6 THEN 'Sat'
        END AS day_of_week,
        TO_CHAR(game.game_time, 'HH:MI pm') AS game_time,
        home_team.team_name AS home_team_name,
        home_team.home_jersey,
        home_team.wins AS home_team_wins,
        home_team.losses AS home_team_losses,
        home_team.draws AS home_team_draws,
        away_team.team_name AS away_team_name,
        away_team.away_jersey,
        away_team.wins AS away_team_wins,
        away_team.losses AS away_team_losses,
        away_team.draws AS away_team_draws,
        field.field_name,
        field.address,
        field.field_photo,
        field.maps_link
    FROM game
    JOIN team AS home_team ON game.home_team_id = home_team.id
    JOIN team AS away_team ON game.away_team_id = away_team.id
    JOIN field ON game.field_id = field.id
    WHERE game.id = $1;
    `;
    pool.query(sqlText, gameId)
        .then(result => {
            // console.log(result.rows)
            res.send(result.rows) // array with 1 item
        })
        .catch(error => {
            console.log('error on 1 game GET server', error)
            res.sendStatus(500)
        })
})


/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
});

module.exports = router;