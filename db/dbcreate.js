import db from '../db';

import Query from '../helpers/utils';
import data from './createData';

module.exports = (function create() {
    Query.createTable(data.tablesData);
}());
