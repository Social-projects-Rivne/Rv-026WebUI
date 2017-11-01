import { SEARCH_BY_NAME } from '../../../config';

import {
    TYPE_CHANGE,
    INPUT_CHANGE,
    REQUEST_TO_AUTOCOMPLETE,
    CHANGE_PROCESS,
    CHANGE_TYPE,
} from '../actions/actionTypes';

const INITIAL_STATE = { searchType: SEARCH_BY_NAME, elements: [], item: '', process: '' };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
    case TYPE_CHANGE:
        return { ...state, item: action.payload.item, searchType: action.payload.searchType, elements: action.payload.elements, process: 'fetched' };
    case INPUT_CHANGE:
        return { ...state, item: action.payload.item, searchType: action.payload.searchType, process: 'fetching' };
    case REQUEST_TO_AUTOCOMPLETE:
        return { ...state, elements: action.payloadSearch.newElements, process: action.payloadSearch.process };
    case CHANGE_PROCESS:
        return { ...state, item: action.payload.item, searchType: action.payload.searchType, elements: action.payload.elements, process: action.payload.process };
    case CHANGE_TYPE:
        return { ...state, searchType: action.payload.searchType, item: action.payload.item, elements: action.payload.elements };
    default:
        return state;
    }
}
