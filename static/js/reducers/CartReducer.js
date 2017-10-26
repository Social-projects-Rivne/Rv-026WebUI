import {
    CART_INIT,
} from '../actions/actionTypes';

const INITIAL_STATE = { all: [], process: 'fetching' };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
    case CART_INIT:
        return { ...state, all: action.all, process: 'fetched' };
    default:
        return state;
    }
}

