
import { getChallenges, getUserChallenges, createChallenge } from "../util/challengesApiUtil";

export const RECEIVE_CHALLENGES = "RECEIVE_CHALLENGES";
export const RECEIVE_USER_CHALLENGES = "RECEIVE_USER_CHALLENGES";
export const RECEIVE_NEW_CHALLENGE = "RECEIVE_NEW_CHALLENGE";

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

export const fetchChallenges = () => dispatch => (
    getChallenges()
        .then(challenges => dispatch(receiveChallenges(challenges)))
        .catch(err => console.log(err))
);

export const fetchUserchallenges = id => dispatch => (
    getUserChallenges(id)
        .then(challenges => dispatch(receiveUserChallenges(challenges)))
        .catch(err => console.log(err))
);

export const createChallenge = data => dispatch => (
    createChallenge(data)
        .then(challenge => dispatch(receiveNewChallenge(challenge)))
        .catch(err => console.log(err))
);