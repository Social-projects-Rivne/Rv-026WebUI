export default function ({ dispatch }) {
    return next => action => {
        if (!action.payloadRecipes || !action.payloadRecipes.then) {
            return next(action);
        }
        action.payloadRecipes
            .then((response) => {
                const recipes = action.newRecipes.concat(response.data);
                const newAction = {
                    payloadRecipes: recipes,
                    type: action.type,
                };
                dispatch(newAction);
            });
    };
}
