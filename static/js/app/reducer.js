import { combineReducers } from 'redux';
import {
    RecipesReducer,
    TestReducer,
    CartReducer,
    SearchReducer,
} from '../reducers';

const rootReducer = combineReducers({
    recipes: RecipesReducer,
    testData: TestReducer,
    cart: CartReducer,
    search: SearchReducer,
});

export default rootReducer;
