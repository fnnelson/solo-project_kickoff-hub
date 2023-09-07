import React, { useEffect, useState } from 'react';

import axios from 'axios';

function WeatherPage() {


    const [search, setSearch] = useState('');
    const [weather, setWeather] = useState('');

    const apiKey = process.env.WEATHER_API_KEY

    const api = {
        key: apiKey,
        base: "https://api.openweathermap.org/data/2.5/",
    };

    // Note: how to convert from readable date to UNIX timestamp:
    // parseInt((new Date('2012.08.10').getTime() / 1000).toFixed(0))
    // not yet sure how to get a date I want for static weather data at a certain time of the game

    // https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=39.099724&lon=-94.578331&dt=1643803200&appid={API key}

    // UNIX date/time for 9/4/2023 at 7pm - 1693872000
    // https://stackoverflow.com/questions/11893083/convert-normal-date-to-unix-timestamp

    const [forecast, setForecast] = useState('');

    // useEffect(() => {
    //     fetchCurrentWeather();
    // }, [])

    const fetchCurrentWeather = () => {
        console.log("in fetchCurrentWeather")
        axios.get('/api/weather')
            .then(response => {
                console.log("GET weather successful", response.data.data[0]);
                // still need to find out how to get precipitation % data!!
                // and how to access date and time in my request??
                const weatherData = response.data.data[0];
                const weatherObj = {
                    temp: weatherData.temp,
                    feelsLike: weatherData.feels_like,
                    description: weatherData.weather[0].description
                }
                setForecast(weatherObj);
            })
            .catch(error => {
                console.log("error with GET", error);
            })
    }

    const handleSearch = () => {
        console.log("searching city", search)
        // The fetch method is used to fetch a resource from a server and returns a Promise that resolves to a Response object.
        fetch(`${api.base}weather?q=${search}&units=imperial&appid=${api.key}`)
            // The .then(res => res.json()) is a chained Promise that parses the response body as JSON.
            .then(res => res.json())
            // The following block updates the local weather state with the obtained JSON results.
            .then(result => {
                console.log(result);
                setWeather(result);
            });
    };

    // More notes on the above fetch and what a Promise is/does:

    // A Promise in JavaScript connects producing code (code that takes some time) with consuming code (code that waits for the result).

    // In this case, fetch is making an HTTP request to the OpenWeatherMap (OWM) API, requesting specific weather data from their server.
    // The fetch function returns a Promise that encapsulates the HTTP response from the server.

    // Producing Code: fetch(...) initiates the HTTP request and returns a Promise, and .then(res => res.json()) continues the chain by processing the response.
    // Consuming Code: The .then(result => { setWeather(result); }) block waits for the result of the fetch operation (i.e., the weather data) and updates the application's state when the data is available.


    return (

        <div className="container">
            <p>Info Page</p>
            <hr />
            {/* Header */}
            <h1>Weather API Testing</h1>

            {/* Forecast for Minneapolis on Sept 4 at 7pm */}
            <p>Minneapolis, 9/4 at 7pm</p>
            <p>Temp: {forecast.temp}°</p>
            <p>Feels Like: {forecast.feelsLike}°</p>
            <p>Description: {forecast.description}</p>

            {/* Search Box */}
            <div>
                <input type="text"
                    placeholder='enter city...'
                    onChange={(event) => setSearch(event.target.value)}
                    value={search}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {weather.main &&
                <div>
                    <p>Current Weather:</p>
                    {/* Location */}
                    < p > Location: {search}</p>
                    {/* Temperature F/C */}
                    <p>Temp: {weather.main.temp}°</p>
                    {/* Conditions (Sunny) */}
                    <p>Description: {weather.weather[0].description}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    {/* <p>Rain: {weather.rain.1h}</p> */}
                </div>
            }



        </div >
    );
}

export default WeatherPage;