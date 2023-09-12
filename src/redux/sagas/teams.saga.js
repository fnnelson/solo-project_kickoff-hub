import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getTeams() {
    try {
        const response = yield axios.get('/api/team');
        console.log("teams GET client side:", response.data)
        const allTeams = response.data;
        console.log("allTeams are now:", allTeams);

        yield put({ type: 'SET_TEAM_LIST', payload: allTeams })
    }
    catch (error) {
        console.log("error with GET on client side", error)
    }

}

function* teamsSaga() {
    yield takeLatest('FETCH_TEAMS', getTeams)
}

export default teamsSaga;