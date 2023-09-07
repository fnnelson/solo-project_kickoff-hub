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
      id, 
      date,
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

/**
 * POST new announcement!
 */
router.post('/', (req, res) => {
    console.log("got the post over here on the server", req.body)
    const queryParams = [req.body.description];
    const sqlText = `
    INSERT INTO announcement (description)
    VALUES ($1);
    `;
    pool.query(sqlText, queryParams)
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log("error with announcements GET on server side", error);
            res.sendStatus(500);
        })
})

/**
 * DELETE announcement!
 */
router.delete('/:id', (req, res) => {
    console.log("got the param over here on the server", req.params.id)
    const announcementId = [req.params.id];
    const sqlText = `
    DELETE FROM announcement
    WHERE "id" = ($1);
    `;
    pool.query(sqlText, announcementId)
        .then(result => {
            res.sendStatus(200)
        })
        .catch(error => {
            console.log("error with announcements GET on server side", error);
            res.sendStatus(500);
        })
})

module.exports = router;