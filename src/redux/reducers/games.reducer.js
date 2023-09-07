import { combineReducers } from "redux";

const pastGames = (state = [], action) => {
    if (action.type === 'SET_PAST_GAMES') {
        return action.payload;
    }
    return state;
};

const upcomingGames = (state = [], action) => {
    if (action.type === 'SET_UPCOMING_GAMES') {
        return action.payload;
    }
    return state;
};

export default combineReducers({
    pastGames,
    upcomingGames,
});