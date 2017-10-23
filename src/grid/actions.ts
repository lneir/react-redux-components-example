import { ActionTypeKeys, OpenAction, CloseAction } from './actionTypes';
import { ActionCreator } from 'redux';

export function open(streamId: string) : OpenAction {
    return {
        type: ActionTypeKeys.OPEN,
        value: streamId
    };
}

export function close(streamId: string) : CloseAction {
    return {
        type: ActionTypeKeys.CLOSE,
        value: streamId
    };
}
