import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promice from 'redux-promise';
import asyncRecipes from '../middlewares/asyncRecipes';

import rootReducer from './reducer';

const middlewares = [promice, asyncRecipes];

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
