const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET all announcements!
 */
router.get('/', (req, res) => {
    // console.log("announcements GET made it to the server side!");
    const sqlText = `
    SELECT 
        TO_CHAR(date, 'mm/dd/yy') AS date,
        description 
    FROM announcement 
    ORDER BY date DESC;
`;
    pool.query(sqlText)
        .then(result => {
            // console.log(result.rows);
            res.send(result.rows);
        })
        .catch(error => {
            console.log("error with announcements GET on server side", error);
            res.sendStatus(500);
        })
})


module.exports = router;