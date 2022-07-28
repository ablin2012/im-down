import {RECEIVE_CHALLENGE_POSTS, RECEIVE_NEW_POST, RECEIVE_POSTS, RECEIVE_USER_POSTS} from '../actions/postActions';

const PostsReducer = (state = { all: {}, user: {}, challenge: [], new: undefined}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_POSTS:
            newState.all = action.posts.data;
            return newState;
        case RECEIVE_USER_POSTS:
            newState.user = action.posts.data;
            return newState;
        case RECEIVE_CHALLENGE_POSTS:
            console.log("reducer receive challenge posts",action.posts.data)
            newState.challenge = action.posts.data;
            return newState;
        case RECEIVE_NEW_POST:
            newState.new = action.post.data;
            return newState;
        default:
            return state;
    }
}

export default PostsReducer;
