import { combineReducers } from "redux";

const allPlayers = (state = [], action) => {
    if (action.type === 'SET_PLAYER_LIST') {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    allPlayers,
});