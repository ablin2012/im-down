import { combineReducers } from 'redux';
import session from './sessionReducer';
import errors from './errorsReducer';
import challenges from './challengesReducer'


const RootReducer = combineReducers({
    errors,
    session,
    challenges

});

export default RootReducer;