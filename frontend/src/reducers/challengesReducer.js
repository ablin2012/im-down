
import { RECEIVE_CHALLENGES, RECEIVE_USER_CHALLENGES, RECEIVE_NEW_CHALLENGE, RECEIVE_CHALLENGE, CLEAR_CHALLENGES, RECEIVE_CHALLENGE_PARTICIPANTS} from "../actions/challengeActions";


const ChallengesReducer = (state = { all: {}, user: {}, new: undefined, index: {}, participants: {} }, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_CHALLENGES:
            newState.all = action.challenges.data;
            return newState;
        case RECEIVE_CHALLENGE:
            newState.index[action.challenge.data._id] = action.challenge.data
            return newState
        case RECEIVE_USER_CHALLENGES:
            const userChallenges = {}
            action.challenges.data.forEach((challenge) => {
                userChallenges[challenge._id] = challenge
            })
            newState.user = userChallenges;
            return newState;
        case RECEIVE_NEW_CHALLENGE:
            newState.new = action.challenge.data;
            return newState;
        case CLEAR_CHALLENGES:
            newState.index = {};
            return newState;
        case RECEIVE_CHALLENGE_PARTICIPANTS:
            newState.participants = action.participants.data
            return newState;
        default:
            return state;
    }
};

export default ChallengesReducer;