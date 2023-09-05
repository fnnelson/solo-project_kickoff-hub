import { combineReducers } from "redux";

const allGames = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_GAMES':
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    allGames,
});