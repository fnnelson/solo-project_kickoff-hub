const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  console.log("made it to server side GET")
  const sqlText = `
  SELECT 
    "user"."id",
    "username", 
    "name", 
    "position", 
    "fav_team", 
    "interests", 
    "photo",
    "team_id",
    "team_name",
    "home_jersey",
    "away_jersey",
    "wins",
    "losses",
    "draws"
  FROM "user"
  LEFT JOIN "team" ON "team"."id" = "team_id";
    `;
  pool.query(sqlText)
    .then(result => {
      res.send(result.rows)
    })
    .catch(error => {
      console.log('error on GET player info')
      res.sendStatus(500)
    })
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log("made it to server side PUT:", req.body, "and its ID:", req.params.id)
  const queryParams = [req.params.id, req.body.newTeam];
  const sqlText = `
  UPDATE "user"
  SET "team_id" = $2
  WHERE "id" = $1;
    `;
  pool.query(sqlText, queryParams)
    .then(result => {
      res.sendStatus(200)
    })
    .catch(error => {
      console.log('error on PUT player new team')
      res.sendStatus(500)
    })
});


module.exports = router;