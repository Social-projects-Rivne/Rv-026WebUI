import {
    PROFILE_INIT,
    USER_INIT,
} from '../actions/actionTypes';

const INITIAL_STATE = { all: [], process: 'fetching' };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
    case PROFILE_INIT:
        return { ...state, all: action.payloadProfile, process: 'fetched' };
    default:
        return state;
    }
}
