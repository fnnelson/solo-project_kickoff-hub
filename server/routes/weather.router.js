const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // GET route code here
    // console.log("My weather api key:", process.env.WEATHER_API_KEY)
    const apiKey = process.env.WEATHER_API_KEY;

    axios.get(`https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=44.98&lon=-93.26&dt=1693872000&units=imperial&appid=${apiKey}`)
        .then(response => {
            console.log("success retrieving weather");
            res.send(response.data);
        })
        .catch(error => {
            console.log('error retrieving weather', error)
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
