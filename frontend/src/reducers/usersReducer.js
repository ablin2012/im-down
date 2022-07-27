import { RECEIVE_USER } from "../actions/userActions";

const UsersReducer = (state = {all: {}, index: {}}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_USER:
            newState.index[action.user.data._id] = action.user.data;
            return newState;
        default:
            return state;
    }
};

export default UsersReducer;