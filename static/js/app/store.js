import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promice from 'redux-promise';
import asyncRecipes from '../middlewares/asyncRecipes';
import asyncSearch from '../middlewares/asyncSearch';
import asyncUser from '../middlewares/asyncUser';

import rootReducer from './reducer';

const middlewares = [promice, asyncRecipes, asyncSearch, asyncUser];

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(...middlewares),
          ),
    );

    return store;
}
