import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getPlayers() {
    try {
        const response = yield axios.get('/api/player');
        console.log("players GET client side:", response.data)
        const allPlayers = response.data;
        console.log("allPlayers are now:", allPlayers);
        yield put({ type: 'SET_PLAYER_LIST', payload: allPlayers })
    }
    catch (error) {
        console.log("error with players GET on client side", error)
    }

}

function* playersSaga() {
    yield takeLatest('FETCH_PLAYERS', getPlayers)
}

export default playersSaga;