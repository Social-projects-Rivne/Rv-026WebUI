import axios from 'axios';
import config from '../../../config';

const checkLogin = function checkLogin(nextState, replace, cb) {
    return axios.get(`${config.serverUrl}/api/checkLogin`)
    .then((res) => {
        if (res.data === 'alreadyLoggedIn') {
            replace('/');
            cb();
        } else {
            cb();
        }
    })
    .catch(cb);
}

module.exports = checkLogin;
