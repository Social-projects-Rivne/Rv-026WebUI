import axios from 'axios';

const checkUserId = function checkUserId(nextState, replace, cb) {
    return axios.get('/api/checkLogin')
    .then((res) => {
        if (res.data !== 'alreadyLoggedIn') {
            replace('/');
            cb();
        } else {
            cb();
        }
    })
    .catch(cb);
};

module.exports = checkUserId;
