import {
    STATUS_NEW, STATUS_TAKEN, STATUS_READY, STATUS_DELIVERED, STATUS_PAID, STATUS_CANCELED, STATUS_REOPENED,
    BUTTON_NEW, BUTTON_TAKE, BUTTON_READY, BUTTON_DELIVER, BUTTON_PAY, BUTTON_CANCEL, BUTTON_REOPEN,
} from '../../../../config';

const switchButtonToStatus = (button) => {
    let status = null;
    switch (button) {
    case BUTTON_NEW:
        status = STATUS_NEW;
        break;
    case BUTTON_TAKE:
        status = STATUS_TAKEN;
        break;
    case BUTTON_READY:
        status = STATUS_READY;
        break;
    case BUTTON_DELIVER:
        status = STATUS_DELIVERED;
        break;
    case BUTTON_PAY:
        status = STATUS_PAID;
        break;
    case BUTTON_CANCEL:
        status = STATUS_CANCELED;
        break;
    case BUTTON_REOPEN:
        status = STATUS_REOPENED;
        break;
    default:
        break;
    }
    return status;
};

export default switchButtonToStatus;
