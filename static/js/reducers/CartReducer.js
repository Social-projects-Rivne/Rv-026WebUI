import {
    CART_INIT,
    SHOW_CART,
    HIDE_CART,
    ADD_ITEM,
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
    case ADD_ITEM:
        return { ...state, all: action.all, process: 'added' };
    default:
        return state;
    }
}

