import axios from 'axios';

const checkLoginCook = function checkLoginCook(nextState, replace, cb) {
    axios.get('/api/checkLoginCook')
    .then((res) => {
        if (res.data !== 'alreadyLoggedInCook') {
            replace('/');
            cb();
        } else {
            cb();
        }
    })
    .catch(cb);
};

module.exports = checkLoginCook;
