import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getGames() {
    try {
        const response = yield axios.get('/api/game');
        const allGames = response.data;
        console.log("allGames is:", allGames)
        
        let oldGames = [];
        let newGames = [];

        const date = new Date(); // Create a new Date object with the current date and time
        let day = date.getDate();
        let month = date.getMonth() + 1; // month plus 1 since it does 0-11
        let year = date.getFullYear();
        let currentDate = `${month}/${day}/${year}`;
        let todaysDate = new Date(currentDate); // this was done to zero out the time associated with today's date - I want ALL of todays games to still show up in upcoming games plus the database dates automatically have midnight as the associated time

        for (let game of allGames) {
            const longGameDate = new Date(game.game_date);
            const mdyGameDate = longGameDate.toLocaleDateString();

            let dbTime = game.game_time;
            console.log('DB time is:', dbTime)
            if (dbTime[0] == '0') {
                dbTime = dbTime.slice(1);
            }
            console.log('newTime is:', dbTime);

            game.game_date = mdyGameDate;
            game.game_time = dbTime;

            if (longGameDate < todaysDate) {
                console.log('soccer game was in the past')
                oldGames.push(game);
            } else if (longGameDate >= todaysDate) {
                console.log('soccer game is in the future')
                newGames.push(game);
            }
            console.log('old games:', oldGames)
            console.log('new games:', newGames)
        }
        console.log('oldGames:', oldGames, 'and newGames:', newGames);
        yield put({ type: 'SET_PAST_GAMES', payload: oldGames })
        yield put({ type: 'SET_UPCOMING_GAMES', payload: newGames });
    } catch (error) {
        console.log("error with GET on client side", error)
    }
}

function* gamesSaga() {
    yield takeLatest('FETCH_GAMES', getGames);
}

export default gamesSaga;