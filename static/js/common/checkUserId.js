import axios from 'axios';
import config from '../../../config';

const checkUserId = function checkUserId(nextState, replace, cb) {
    return axios.get(`${config.serverUrl}/api/checkLogin`)
    .then((res) => {
        if (res.data !== 'alreadyLoggedIn') {
            replace('/signin');
            cb();
        } else {
            cb();
        }
    })
    .catch(cb);
}

module.exports = checkUserId;
