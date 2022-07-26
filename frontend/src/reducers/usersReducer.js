import { RECEIVE_USER, RECEIVE_ACHIEVEMENTS, RECEIVE_PARTICIPATIONS, RECEIVE_FRIENDSHIPS, RECEIVE_FRIEND_REQUESTS, RECEIVE_INCOMING_FRIEND_REQUESTS, RECEIVE_OUTGOING_FRIEND_REQUESTS, RECEIVE_FRIEND_REQUEST, REMOVE_FRIEND_REQUEST } from "../actions/userActions";
import { JOIN_CHALLENGE, LEAVE_CHALLENGE  } from "../actions/challengeActions";

const UsersReducer = (state = {index: {}, participations: [], achievements: []}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_USER:
            newState.index[action.user.data._id] = action.user.data;
            newState["achievements"] = []
            newState["participations"] = []
            newState["friendships"] = []
            newState["friendRequests"] = []
            newState["CUOutgoingFR"] = []
            newState["CUIncomingFR"] = []
            return newState;
        case RECEIVE_ACHIEVEMENTS:
            console.log("this is reducer achievements",action.achievements.data)
            // newState.index[action.achievements.data[0].user]["achievements"] = action.achievements.data;
            newState.achievements = action.achievements.data;
            return newState;
        case RECEIVE_PARTICIPATIONS:
            console.log("THIS IS REDUCER PARTICIPATIONS",action.participations.data)
            newState.participations = action.participations.data;
            return newState;
        case RECEIVE_FRIENDSHIPS:
            console.log("this is reducer friendships",action.friendships.data)
            newState.friendships = action.friendships.data;
            return newState;
        case RECEIVE_FRIEND_REQUESTS:
            console.log("this is reducer receive friend requests",action.friendRequests.data)
            newState.friendRequests = action.friendRequests.data;
            return newState;
        case RECEIVE_INCOMING_FRIEND_REQUESTS:
            console.log("this is reducer receive incomoing friend requests",action.friendRequests.data)
            newState.CUIncomingFR = action.friendRequests.data;
            return newState;
        case RECEIVE_OUTGOING_FRIEND_REQUESTS:
                console.log("this is reducer receive  outgoing friend requests",action.friendRequests.data)
                newState.CUOutgoingFR = action.friendRequests.data;
                return newState;
        case RECEIVE_FRIEND_REQUEST:
            console.log("this is reducer receive friendRequest",action.friendRequest.data)
            newState.friendRequests = action.friendRequest.data;
            return newState;
        case REMOVE_FRIEND_REQUEST:
            console.log("this is reducer remove friendshipRequest",action.friendRequestId)
            newState.CUOutgoingFR.filter((request) => request.receiver !== action.friendshipRequestId )
            return newState;
        case JOIN_CHALLENGE:
            // newState["participations"].push(action.participation.data);
            return newState;
        case LEAVE_CHALLENGE:
            // let index = newState["participations"].indexOf(action.participation.data);
            // newState["participations"].splice(index, 1);
            return newState;
        default:
            return state;
    }
};

export default UsersReducer;