import _ from 'lodash';

const createArrayObjectsFromArrays = (order_contex_id, recipes_id, recipes_title, count) => {
    const objects = [];
    for (let i = 0; i < recipes_id.length; i++) {
        objects.push(_.zipObject(
            ['order_contex_id', 'recipes_id', 'recipes_title', 'count'],
            [order_contex_id[i], recipes_id[i], recipes_title[i], count[i]],
        ));
    }
    return objects;
};

export default createArrayObjectsFromArrays;
