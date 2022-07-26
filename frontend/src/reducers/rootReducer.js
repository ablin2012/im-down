import { combineReducers } from 'redux';
import session from './sessionReducer';
import errors from './errorsReducer';
import challenges from './challengesReducer';
import uiReducer from './uiReducer';


const RootReducer = combineReducers({
    errors,
    session,
    challenges,
    ui: uiReducer
});



export default RootReducer;