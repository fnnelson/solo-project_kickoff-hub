const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
console.log("made it to server side GET")
    const sqlText = `
    SELECT * 
    FROM "team"
    ORDER BY "total_points" DESC, "goal_differential" DESC;
    `;
    pool.query(sqlText)
        .then(result => {
            res.send(result.rows)
        })
        .catch(error => {
            console.log('error on GET rankings')
            res.sendStatus(500)
        })
});


module.exports = router;