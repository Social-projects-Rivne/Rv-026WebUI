import { combineReducers } from 'redux';
import {
    RecipesReducer,
    TestReducer,
    CartReducer,
    UserReducer,
} from '../reducers';

const rootReducer = combineReducers({
    recipes: RecipesReducer,
    testData: TestReducer,
    cart: CartReducer,
    profile: UserReducer,
});

export default rootReducer;
