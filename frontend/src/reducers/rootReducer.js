import { combineReducers } from 'redux';
import session from './sessionReducer';
import errors from './errorsReducer';
import challenges from './challengesReducer';
import posts from './postsReducer';
import users from './usersReducer';
import uiReducer from './uiReducer';


const RootReducer = combineReducers({
    errors,
    session,
    challenges,
    posts,
    users,
    ui: uiReducer
});



export default RootReducer;