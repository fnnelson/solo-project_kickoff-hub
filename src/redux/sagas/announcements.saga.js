import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getAnnounements() {
    try {
        const response = yield axios.get('/api/announcement');
        console.log("announcements GET client side:", response.data)
        const allAnnouncements = response.data;
        console.log("allAnnouncements are now:", allAnnouncements);
        yield put({ type: 'SET_ANNOUNCEMENTS', payload: allAnnouncements })
    }
    catch (error) {
        console.log("error with GET on client side", error)
    }

}

function* announcementsSaga() {
    yield takeLatest('FETCH_ANNOUNCEMENTS', getAnnounements)
}

export default announcementsSaga;