import { RECEIVE_CHALLENGES, 
        RECEIVE_USER_CHALLENGES, 
        RECEIVE_NEW_CHALLENGE,
        RECEIVE_CHALLENGE } from "../actions/challengeActions";

const ChallengesReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_CHALLENGES:
            newState.all = action.challenges.data;
            return newState;
        case RECEIVE_CHALLENGE:
            newState[action.challenge.data._id] = action.challenge.data
            return newState
        case RECEIVE_USER_CHALLENGES:
            newState.user = action.challenges.data;
            return newState;
        case RECEIVE_NEW_CHALLENGE:
            newState.new = action.challenge.data
            return newState;
        default:
            return state;
    }
};

export default ChallengesReducer;