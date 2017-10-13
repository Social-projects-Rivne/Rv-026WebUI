import { combineReducers } from 'redux';
import {
    TestReducer, 
} from '../reducers';

const rootReducer = combineReducers({
    testData: TestReducer,
});

export default rootReducer;
