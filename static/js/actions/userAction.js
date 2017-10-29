import axios from 'axios';

import {
    PROFILE_INIT,
} from './actionTypes';

export function getUserInfo(profile) {
    const url = '/api/user/';

    const response = axios.get(url);
    return {
        type: PROFILE_INIT,
        payloadProfile: response,
        profile,
    };
}
