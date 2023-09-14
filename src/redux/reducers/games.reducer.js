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

const pastUserGames = (state = [], action) => {
    if (action.type === 'SET_PAST_USER_GAMES') {
        return action.payload;
    }
    return state;
}

const upcomingUserGames = (state = [], action) => {
    if (action.type === 'SET_UPCOMING_USER_GAMES') {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    pastGames,
    upcomingGames,
    pastUserGames,
    upcomingUserGames
});