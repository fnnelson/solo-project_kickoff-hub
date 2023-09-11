const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("made it to server side GET")
    const sqlText = `
  SELECT 
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
  LEFT JOIN "team" ON team.id = team_id;
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


module.exports = router;