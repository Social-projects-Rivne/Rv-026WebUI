import { combineReducers } from 'redux';
import {
    RecipesReducer,
    TestReducer,
} from '../reducers';

const rootReducer = combineReducers({
    recipes: RecipesReducer,
    testData: TestReducer,
});

export default rootReducer;
