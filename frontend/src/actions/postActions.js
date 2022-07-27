import {getPosts, getChallengePosts, getUserPosts, createPost} from '../util/postsApiUtil';

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_USER_POSTS = "RECEIVE_USER_POSTS";
export const RECEIVE_CHALLENGE_POSTS = "RECEIVE_CHALLENGE_POSTS";
export const RECEIVE_NEW_POST = "RECEIVE_NEW_POST";

export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
})

export const receiveUserPosts = posts => ({
    type: RECEIVE_USER_POSTS,
    posts
})

export const receiveChallengePosts = posts => ({
    type: RECEIVE_CHALLENGE_POSTS,
    posts
})

export const receiveNewPost = post => ({
    type: RECEIVE_NEW_POST,
    post
})

export const fetchPosts = () => dispatch => (
    getPosts()
        .then(posts => dispatch(receivePosts(posts)))
        .catch(err => console.log(err))
);

export const fetchUserPosts = id => dispatch => (
    getUserPosts(id)
        .then(posts => dispatch(receiveUserPosts(posts)))
        .catch(err => console.log(err))
)

export const fetchChallengePost = id => dispatch => (
    getChallengePosts(id)
        .then(posts => dispatch(receiveChallengePosts(posts)))
        .catch(err => console.log(err))
)

export const composePost = ({post, challengeId}) => dispatch => (
    createPost({post, challengeId})
        .then(post => dispatch(receiveNewPost(post)))
        .catch(err => console.log(err))
)