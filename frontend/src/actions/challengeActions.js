
// import { getChallenges, getUserChallenges, createChallenge } from "../util/challengesApiUtil";

import * as APIUtil from "../util/challengesApiUtil";

export const RECEIVE_CHALLENGES = "RECEIVE_CHALLENGES";
export const RECEIVE_USER_CHALLENGES = "RECEIVE_USER_CHALLENGES";
export const RECEIVE_NEW_CHALLENGE = "RECEIVE_NEW_CHALLENGE";
export const RECEIVE_CHALLENGE = "RECEIVE_CHALLENGE";
export const CLEAR_CHALLENGES = "CLEAR_CHALLENGES";
export const JOIN_CHALLENGE = "JOIN_CHALLENGE";

export const receiveChallenges = challenges => ({
    type: RECEIVE_CHALLENGES,
    challenges
});

export const receiveUserChallenges = challenges => ({
    type: RECEIVE_USER_CHALLENGES,
    challenges
});

export const receiveNewChallenge = challenge => ({
    type: RECEIVE_NEW_CHALLENGE,
    challenge
})

export const receiveChallenge = challenge => ({
    type: RECEIVE_CHALLENGE,
    challenge
})

export const clearChallenges = () => ({
    type: CLEAR_CHALLENGES
})

export const joinChallenge = (participation) => ({
    type: JOIN_CHALLENGE,
    participation
})

export const fetchChallenges = () => dispatch => (
    APIUtil.getChallenges()
        .then(challenges => dispatch(receiveChallenges(challenges)))
        .catch(err => console.log(err))
);

export const fetchUserChallenges = id => dispatch => (
    APIUtil.getUserChallenges(id)
        .then(challenges => dispatch(receiveUserChallenges(challenges)))
        .catch(err => console.log(err))
);

export const createChallenge = data => dispatch => (
    APIUtil.createChallenge(data)
        .then(challenge => dispatch(receiveNewChallenge(challenge)))
        .catch(err => console.log(err))
);

export const fetchChallenge = (id) => dispatch => (
    APIUtil.getChallenge(id)
        .then(challenge => dispatch(receiveChallenge(challenge)))
        .catch(err => console.log(err))
)

export const addParticipation = (id) => dispatch => {
    APIUtil.joinChallenge(id)
        .then(participation => dispatch(joinChallenge(participation)))
}