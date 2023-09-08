import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getAnnouncements() {
    try {
        const response = yield axios.get('/api/announcement');
        console.log("announcements GET client side:", response.data)
        const allAnnouncements = response.data;
        console.log("allAnnouncements are now:", allAnnouncements);

        for (let announcement of allAnnouncements) {
            // getting the dates from 2023-09-02T05:00:00.000Z format to just 09/02/2023
            const longDate = new Date(announcement.date);
            const mdyAnnouncementDate = longDate.toLocaleDateString();
            // console.log("announcement date is now:", mdyAnnouncementDate)
            announcement.date = mdyAnnouncementDate;
        }

        yield put({ type: 'SET_ANNOUNCEMENTS', payload: allAnnouncements })
    }
    catch (error) {
        console.log("error with GET on client side", error)
    }

}

function* announcementsSaga() {
    yield takeLatest('FETCH_ANNOUNCEMENTS', getAnnouncements)
}

export default announcementsSaga;