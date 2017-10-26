import {
    CART_INIT,
} from './actionTypes';

export function cartInit() {
    let cart = [];
    if (JSON.parse(localStorage.getItem('cart') === 'undefined')) {
        localStorage.setItem('cart', JSON.stringify(cart));
    } else {
        cart = JSON.parse(localStorage.getItem('cart'));
        console.log(cart);
    }
    return {
        type: CART_INIT,
        all: cart,
    };
}
