import {
    CART_INIT,
    SHOW_CART,
    HIDE_CART,
} from '../actions/actionTypes';

const INITIAL_STATE = { all: [], status: false, process: 'fetching' };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
    case CART_INIT:
        return { ...state, all: action.all, process: 'fetched' };
    case SHOW_CART:
        return { ...state, status: action.status, process: 'fetched' };
    case HIDE_CART:
        return { ...state, status: action.status, process: 'fetched' };
    default:
        return state;
    }
}

