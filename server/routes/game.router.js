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
        game.cancel_status,
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
    console.log('gameId on server side:', gameId);
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
        game.cancel_status,
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
            res.send(result.rows); // array with 1 item?
        })
        .catch(error => {
            console.log('error on 1 game GET server', error);
            res.sendStatus(500);
        })
})


/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log("made it to the server side POST new game", req.body)
    const queryParams = [
        req.body.gameDate,
        req.body.gameTime,
        req.body.fieldId,
        req.body.homeTeamId,
        req.body.awayTeamId
    ]
    const sqlText = `
      INSERT INTO "game" ("game_date", "game_time", "field_id", "home_team_id", "away_team_id")
      VALUES ($1, $2, $3, $4, $5);
    `;
    pool.query(sqlText, queryParams)
        .then(result => {
            console.log('POST worked!');
            res.sendStatus(201);
        })
        .catch(error => {
            console.log("error on POST", error);
        })

});


/**
 * PUT - changing scores here!
 */
router.put('/score/:id', (req, res) => {
    console.log('req.body is:', req.body, 'and req.params.id is:', req.params.id)
    const queryParams = [req.params.id, req.body.homeScore, req.body.awayScore];
    const sqlText = `
    UPDATE "game"
    SET "home_team_score" = $2, "away_team_score" = $3
    WHERE "id" = $1;
    `;
    pool.query(sqlText, queryParams)
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log("error on PUT of scores", error);
            res.sendStatus(500);
        })
});

/**
 * PUT - updating whether a game is cancelled!
 */
router.put('/cancel/:id', (req, res) => {
    console.log('req.body is:', req.body, 'and req.params.id is:', req.params.id)
    const queryParams = [req.params.id, req.body.cancelStatus];
    const sqlText = `
    UPDATE "game"
    SET "cancel_status" = $2
    WHERE "id" = $1;
    `;
    pool.query(sqlText, queryParams)
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log("error on PUT of scores", error);
            res.sendStatus(500);
        })
});

/**
* DELETE route
*/

router.delete('/:id', (req, res) => {
    console.log('req.params.id is:', req.params.id)
    const deletedGameId = [req.params.id];
    const sqlText = `
            DELETE FROM "game"
            WHERE "id" = $1;
            `;
    pool.query(sqlText, deletedGameId)
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log("error on PUT of scores", error);
            res.sendStatus(500);
        })
});



module.exports = router;