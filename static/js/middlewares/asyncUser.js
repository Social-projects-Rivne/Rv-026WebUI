export default function ({ dispatch }) {
    return next => action => {
        if (!action.payloadProfile || !action.payloadProfile.then) {
            return next(action);
        }
        action.payloadProfile
            .then((response) => {
                const profile = action.profile.concat(response.data);
                const newAction = {
                    payloadProfile: profile,
                    type: action.type,
                };
                dispatch(newAction);
            });
    };
}
