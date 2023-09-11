import { combineReducers } from "redux";

const allTeams = (state = [], action) => {
    if (action.type === 'SET_TEAM_LIST') {
        return action.payload;
    }
    return state;
}

export default combineReducers({
    allTeams,
});