import Query from '../helpers/utils';
import data from './insertData';

module.exports = (function seed() {
    Query.insert(data.usersRoles);
    Query.insert(data.users);
    Query.insert(data.tags);
    Query.insert(data.ingredients);
    Query.insert(data.recipes);
    Query.insert(data.calcCard);
    Query.insert(data.recipeTag);
    Query.insert(data.ordersStatus);
    Query.insert(data.orders);
    Query.insert(data.ordersContext);
}());
