import {createStore, applyMiddleware, compose} from 'redux';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
import {createLogger} from 'redux-logger';
import rootReducer from './reducer';


const middlewares = [routerMiddleware(browserHistory)];

if(process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
}

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middlewares),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    return store;
}