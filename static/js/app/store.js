import { createStore, applyMiddleware, compose } from 'redux';
import promice from 'redux-promise';
import asyncRecipes from '../middlewares/asyncRecipes';

import rootReducer from './reducer';

const middlewares = [promice, asyncRecipes];

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middlewares),
        ),
    );

    return store;
}
