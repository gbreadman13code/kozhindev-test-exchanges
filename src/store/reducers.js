import {combineReducers} from 'redux';
import {getCourseReducer} from './getCourseReducer';

export const rootReducer = combineReducers({
    course: getCourseReducer,
})