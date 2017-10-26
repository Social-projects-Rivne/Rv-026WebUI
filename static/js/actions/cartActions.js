import {
    CART_INIT,
    SHOW_CART,
    HIDE_CART,
    ADD_ITEM,
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
export function addItem(item) {
    let orderList = [];
    if (!localStorage.getItem('cart')) {
        orderList.push(item);
        localStorage.setItem('cart', JSON.stringify(orderList));
    } else {
        orderList = (JSON.parse(localStorage.getItem('cart')));
        const found = orderList.find((value, index) => {
            if (value.id === item.id) {
                orderList[index].count += 1;
                return true;
            }
            return false;
        });
        if (!found) {
            orderList.push(item);
        }
        localStorage.setItem('cart', JSON.stringify(orderList));
    }
    return {
        type: ADD_ITEM,
        all: orderList,
    };
}

