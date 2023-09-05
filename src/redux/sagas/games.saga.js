import { put, takeLatest } from 'redux-saga/effects';

function* getGames(action) {
    const allGames = action.payload;
    console.log("allGames is:", allGames)
    yield put({ type: 'SET_ALL_GAMES', payload: allGames });
}

function* gamesSaga() {
    yield takeLatest('GET_GAMES', getGames);
}

export default gamesSaga;