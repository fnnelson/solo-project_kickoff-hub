import { combineReducers } from "redux";

const allAnnouncements = (state = [], action) => {
    if (action.type === 'SET_ANNOUNCEMENTS') {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    allAnnouncements,
});