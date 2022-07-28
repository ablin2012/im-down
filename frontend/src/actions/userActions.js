import * as usersApiUtil from "../util/usersApiUtil";

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_ACHIEVEMENTS = "RECEIVE_ACHIEVEMENTS";
export const REMOVE_USER = "REMOVE_USER";
export const RECEIVE_FRIENDSHIPS = "RECEIVE_FRIENDSHIPS";
export const RECEIVE_FRIEND_REQUESTS = "RECEIVE_FRIEND_REQUESTS";
export const RECEIVE_FRIEND_REQUEST = "RECEIVE_FRIEND_REQUEST";
export const REMOVE_FRIEND_REQUEST = "REMOVE_FRIEND_REQUEST";
export const RECEIVE_PARTICIPATIONS = "RECEIVE_PARTICIPATIONS";
// export const RESPOND_TO_FRIEND_REQUEST = "RESPOND_TO_FRIEND_REQUEST";

export const receiveUser = user => ({
    type: RECEIVE_USER,
    user
})

export const receiveAchievements = achievements => ({
    type: RECEIVE_ACHIEVEMENTS,
    achievements
})

//array of participating challenges
export const receiveParticipations = participations => ({
    type: RECEIVE_PARTICIPATIONS,
    participations
})

export const removeUser = (userId) => ({
    type: REMOVE_USER,
    userId
})

export const receiveFriendships = userId => ({
    type: RECEIVE_FRIENDSHIPS,
    userId
})

export const receiveFriendRequests = (friendRequests) => ({
    type: RECEIVE_FRIEND_REQUESTS,
    friendRequests
})

export const receiveFriendRequest = (friendRequest) => ({
    type: RECEIVE_FRIEND_REQUEST,
    friendRequest
})

export const removeFriendRequest = friendRequestId => ({
    type: REMOVE_FRIEND_REQUEST,
    friendRequestId
})

// export const respondToFriendRequest = (friendRequestId, response) => ({
//     type: RESPOND_TO_FRIEND_REQUEST,
//     friendRequestId,
//     response
// })


export const fetchUser = (id) => dispatch => (
    usersApiUtil.getUser(id)
        .then(user => {
            // console.log("returned get user",user)
            // console.log("trying to get id",user.data._id)
            dispatch(receiveUser(user))
            dispatch(fetchUserAchievements(user.data._id))
        })
        .catch(err => console.log(err))
)

export const fetchUserAchievements = (id) => dispatch => (
    usersApiUtil.getUserAchievements(id)
        .then(achievements => {
            // console.log("get back achievements", achievements)
            dispatch(receiveAchievements(achievements))
        })
        .catch(err => console.log(err))
)

export const fetchUserParticipations = (id) => dispatch => (
    usersApiUtil.getUserParticipations(id)
        .then(participations => {

            dispatch(receiveParticipations(participations))
        })
        .catch(err => console.log(err))
)

export const updateCurrentUser = (user) => dispatch => (
    usersApiUtil.patchCurrentUser(user)
        .then(user => dispatch(receiveUser(user)))
        .catch(err => console.log(err))
)

export const deleteCurrentUser = () => dispatch => (
    usersApiUtil.deleteCurrentUser()
        .then(user => dispatch(removeUser(user)))
        .catch(err => console.log(err))
)

export const fetchUserFriendships = (id) => dispatch => (
    usersApiUtil.getUserFriendships(id)
        .then(friendships => dispatch(receiveFriendships(friendships)))
        .catch(err => console.log(err))
)


