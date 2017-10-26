import {
    CART_INIT,
    SHOW_CART,
    HIDE_CART,
} from './actionTypes';

export function cartInit() {
    let cart = [];
    if (JSON.parse(localStorage.getItem('cart') === null)) {
        localStorage.setItem('cart', JSON.stringify(cart));
    } else {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
    return {
        type: CART_INIT,
        all: cart,
    };
}

export function showCart(status) {
    let flag = status;
    if (flag === false) {
        flag = true;
    }
    return {
        type: SHOW_CART,
        status: flag,
    };
}
export function hideCart(status) {
    let flag = status;
    if (flag === true) {
        flag = false;
    }
    return {
        type: HIDE_CART,
        status: flag,
    };
}

