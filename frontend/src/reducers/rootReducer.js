import { combineReducers } from 'redux';
import session from './sessionReducer';
import errors from './errorsReducer';


const RootReducer = combineReducers({
    errors,
    session

});

export default RootReducer;