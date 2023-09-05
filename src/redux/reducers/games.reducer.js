import { combineReducers } from "redux";

const pastGames = (state = [], action) => {
    switch (action.type) {
        case 'SET_PAST_GAMES':
            return action.payload;
        default:
            return state;
    }
};
const upcomingGames = (state = [], action) => {
    switch (action.type) {
        case 'SET_UPCOMING_GAMES':
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    pastGames,
    upcomingGames,
});