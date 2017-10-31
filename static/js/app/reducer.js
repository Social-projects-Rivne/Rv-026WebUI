import { combineReducers } from 'redux';
import {
    RecipesReducer,
    CartReducer,
    SearchReducer,
    UserReducer,
} from '../reducers';

const rootReducer = combineReducers({
    recipes: RecipesReducer,
    cart: CartReducer,
    search: SearchReducer,
    profile: UserReducer,
});

export default rootReducer;
