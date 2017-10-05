import {
    STATUS_NEW, STATUS_TAKEN, STATUS_READY, STATUS_DELIVERED, STATUS_PAID, STATUS_CANCELED,
    COLOR_NEW, COLOR_TAKEN, COLOR_READY, COLOR_DELIVERED, COLOR_PAID, COLOR_CANCELED,
    BUTTON_NEW, BUTTON_TAKE, BUTTON_READY, BUTTON_DELIVER, BUTTON_PAY, BUTTON_CANCEL,
} from '../../../../config';

const switchColorToElement = (button) => {
    let currentColor = null;
    switch (button) {
    case STATUS_NEW:
    case BUTTON_NEW:
        currentColor = COLOR_NEW;
        break;
    case STATUS_TAKEN:
    case BUTTON_TAKE:
        currentColor = COLOR_TAKEN;
        break;
    case STATUS_READY:
    case BUTTON_READY:
        currentColor = COLOR_READY;
        break;
    case STATUS_DELIVERED:
    case BUTTON_DELIVER:
        currentColor = COLOR_DELIVERED;
        break;
    case STATUS_PAID:
    case BUTTON_PAY:
        currentColor = COLOR_PAID;
        break;
    case STATUS_CANCELED:
    case BUTTON_CANCEL:
        currentColor = COLOR_CANCELED;
        break;
    default:
        break;
    }
    return currentColor;
};

export default switchColorToElement;
