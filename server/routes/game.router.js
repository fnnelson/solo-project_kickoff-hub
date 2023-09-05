const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // GET route code here
    console.log("get made it to the server side!");
    const sqlText = `SELECT * FROM "game";`;
    pool.query(sqlText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log("error with game GET");
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
});

module.exports = router;