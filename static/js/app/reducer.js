import { combineReducers } from 'redux';
import {
    RecipesReducer,
    TestReducer,
    CartReducer,
} from '../reducers';

const rootReducer = combineReducers({
    recipes: RecipesReducer,
    testData: TestReducer,
    cart: CartReducer,
});

export default rootReducer;
