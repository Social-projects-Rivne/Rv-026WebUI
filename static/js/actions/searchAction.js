import axios from 'axios';
import {
    TYPE_CHANGE,
    INPUT_CHANGE,
    REQUEST_TO_AUTOCOMPLETE,
    CHANGE_PROCESS,
    CHANGE_TYPE,
} from './actionTypes';

export function typeChange(searchType) {
    const payload = {
        searchType,
        elements: [],
        item: '',
    };
    return {
        type: TYPE_CHANGE,
        payload,
    };
}

export function inputChange(item, searchType) {
    const payload = {
        item,
        searchType,
    };
    return {
        type: INPUT_CHANGE,
        payload,
    };
}

export function requestToAutocomplete(item, searchType) {
    const url = `/api/recipes/autocomplete?item=${item}&&searchparam=${searchType}`;

    const response = axios.get(url);

    return {
        type: REQUEST_TO_AUTOCOMPLETE,
        payloadSearch: response,
        item,
    };
}

export function changeProcess(item, searchType, elements) {
    const newProcess = 'fetched';
    const payload = {
        item,
        searchType,
        elements,
        process: newProcess,
    };
    return {
        type: CHANGE_PROCESS,
        payload,
    };
}

export function changeType() {
    const payload = {
        searchType: 'searchByName',
        item: '',
        elements: [],
    };
    return {
        type: CHANGE_TYPE,
        payload,
    };
}
