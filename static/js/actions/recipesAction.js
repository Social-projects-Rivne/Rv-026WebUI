import axios from 'axios';
import {
    GET_ALL_RECIPES,
    GET_RECIPES_BY_INGREDIENTS,
    GET_RECIPES_BY_TAG_ID,
    GET_RECIPES_BY_NAME,
    GET_RECIPES_BY_TAGTYPE,
    CLEAR_RECUPES,
} from './actionTypes';

const findMaxId = (arr) => {
    let maxId = 0;
    arr.forEach((el) => {
        if (el.id > maxId) {
            maxId = el.id;
        }
    });
    return maxId;
};

export function getAllRecipes(newRecipes) {
    const url = `/api/recipes/search?maxId=${findMaxId(newRecipes)}`;

    const response = axios.get(url);

    return {
        type: GET_ALL_RECIPES,
        payloadRecipes: response,
        newRecipes,
    };
}

export function getRecipesByIngredients(ingredients, newRecipes) {
    const url = `/api/recipes/ingredients/search?ingredients=${ingredients}&maxId=${findMaxId(newRecipes)}`;

    const response = axios.get(url);

    return {
        type: GET_RECIPES_BY_INGREDIENTS,
        payloadRecipes: response,
        newRecipes,
    };
}

export function getRecipesByTagId(tagId, newRecipes) {
    const url = `/api/recipes/tag/search?tag=${tagId}&maxId=${findMaxId(newRecipes)}`;

    const response = axios.get(url);

    return {
        type: GET_RECIPES_BY_TAG_ID,
        payloadRecipes: response,
        newRecipes,
    };
}

export function getRecipesByName(name, newRecipes) {
    const url = `/api/recipes/name/search?name=${name}&maxId=${findMaxId(newRecipes)}`;

    const response = axios.get(url);

    return {
        type: GET_RECIPES_BY_NAME,
        payloadRecipes: response,
        newRecipes,
    };
}

export function getRecipesByTagType(tagtype, newRecipes) {
    const url = `/api/recipes/tagtype/search?tagtype=${tagtype}&maxId=${findMaxId(newRecipes)}`;

    const response = axios.get(url);

    return {
        type: GET_RECIPES_BY_TAGTYPE,
        payloadRecipes: response,
        newRecipes,
    };
}

export function clearRecipes() {
    return {
        type: CLEAR_RECUPES,
        payload: [],
    };
}
