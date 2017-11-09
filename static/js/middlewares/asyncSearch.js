export default function ({ dispatch }) {
    return next => action => {
        if (!action.payloadSearch || !action.payloadSearch.then) {
            return next(action);
        }

        action.payloadSearch.then((response) => {
            const newElements = action.item ? response.data : [];
            const process = action.item ? 'fetching' : 'fetched';
            const newAction = {
                payloadSearch: { newElements, process },
                type: action.type,
            };

            dispatch(newAction);
        });
    };
}
