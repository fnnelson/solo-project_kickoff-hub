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
        game.home_team_id,
        game.home_team_score,
        game.home_team_result,
        game.away_team_id,
        game.away_team_score,
        game.away_team_result,
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
 * GET single game (only used for upcoming games)..
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
 * GET all of the user's games..
 */
router.get('/usergames/:id', (req, res) => {
    console.log("user GET made it to the server side!");
    const userTeamId = [req.params.id];
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
    game.home_team_id,
    game.home_team_score,
    game.home_team_result,
    game.away_team_id,
    game.away_team_score,
    game.away_team_result,
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
WHERE game.home_team_id = $1 OR game.away_team_id = $1
ORDER BY game_date, game_time;
    `;
    pool.query(sqlText, userTeamId)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log("error with user's games GET");
            res.sendStatus(500);
        })
});

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
 * PUT - transaction type PUT!
 */
router.put('/score/:id', async (req, res) => {
    console.log('req.body is:', req.body, 'and req.params.id is:', req.params.id)
    const queryParams = [
        req.params.id, // $1
        req.body.homeScore, // $2
        req.body.awayScore, // $3
        req.body.homeResult, // $4
        req.body.awayResult, // $5
    ];
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN');
        const sqlText = `
UPDATE "game"
SET "home_team_score" = $2, "away_team_score" = $3, "home_team_result" = $4, "away_team_result" = $5 
WHERE "id" = $1;
    `;
        const sqlText2 = `
    UPDATE team
    SET wins = (
      SELECT COUNT(*) FROM game 
      WHERE (game.home_team_id = team.id AND game.home_team_result = 'W')
         OR (game.away_team_id = team.id AND game.away_team_result = 'W')
    ),
    losses = (
      SELECT COUNT(*) FROM game 
      WHERE (game.home_team_id = team.id AND game.home_team_result = 'L')
         OR (game.away_team_id = team.id AND game.away_team_result = 'L')
    ),
    draws = (
      SELECT COUNT(*) FROM game 
      WHERE (game.home_team_id = team.id AND game.home_team_result = 'D')
         OR (game.away_team_id = team.id AND game.away_team_result = 'D')
    ),
    goal_differential = (
      SELECT SUM(
        CASE
          WHEN game.home_team_id = team.id THEN game.home_team_score - game.away_team_score
          WHEN game.away_team_id = team.id THEN game.away_team_score - game.home_team_score
          ELSE 0
        END
      ) FROM game
      WHERE (game.home_team_id = team.id OR game.away_team_id = team.id)
    );
    `;
        // first run query to update game results
        await connection.query(sqlText, queryParams);
        // then run query to update team table using info from game table
        await connection.query(sqlText2);
        await connection.query('COMMIT');
        res.sendStatus(200);
    } catch (error) {
        await connection.query('ROLLBACK');
        console.log('Transaction Error - Rolling back transfer', error)
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});

/**
 * PUT - updating whether a game is cancelled! Flipping boolean of cancel_status for specific game ID
 */
router.put('/cancel/:id', (req, res) => {
    // console.log('req.body is:', req.body, 'and req.params.id is:', req.params.id)
    const queryParams = [req.params.id];
    const sqlText = `
    UPDATE "game"
    SET "cancel_status" = NOT "cancel_status"
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