import {
    GET_ALL_RECIPES,
    GET_RECIPES_BY_INGREDIENTS,
    GET_RECIPES_BY_TAG_ID,
    GET_RECIPES_BY_NAME,
    GET_RECIPES_BY_TAGTYPE,
    CLEAR_RECUPES,
} from '../actions/actionTypes';

const INITIAL_STATE = { all: [], process: 'fetching' };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
    case GET_ALL_RECIPES:
        return { ...state, all: action.payloadRecipes, process: 'fetched' };
    case GET_RECIPES_BY_INGREDIENTS:
        return { ...state, all: action.payloadRecipes, process: 'fetched' };
    case GET_RECIPES_BY_TAG_ID:
        return { ...state, all: action.payloadRecipes, process: 'fetched' };
    case GET_RECIPES_BY_NAME:
        return { ...state, all: action.payloadRecipes, process: 'fetched' };
    case GET_RECIPES_BY_TAGTYPE:
        return { ...state, all: action.payloadRecipes, process: 'fetched' };
    case CLEAR_RECUPES:
        return { ...state, all: action.payload, process: 'fetching' };
    default:
        return state;
    }
}
