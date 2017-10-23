import { ActionTypeKeys, IOpenAction, ICloseAction } from './actionTypes';
import { ActionCreator } from 'redux';

export function open(streamId: string) : IOpenAction {
    return {
        type: ActionTypeKeys.OPEN,
        value: streamId
    };
}

export function close(streamId: string) : ICloseAction {
    return {
        type: ActionTypeKeys.CLOSE,
        value: streamId
    };
}
