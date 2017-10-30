import { combineReducers } from 'redux';
import {
    RecipesReducer,
    TestReducer,
    CartReducer,
    SearchReducer,
    UserReducer,
} from '../reducers';

const rootReducer = combineReducers({
    recipes: RecipesReducer,
    testData: TestReducer,
    cart: CartReducer,
    search: SearchReducer,
    profile: UserReducer,
});

export default rootReducer;
