import { ActionCreator } from 'redux';
import { interfaces } from './interfaces';

export function open(streamId: string) : interfaces.IOpenAction {
    return {
        type: interfaces.ActionTypeKeys.OPEN,
        value: streamId
    };
}

export function close(streamId: string) : interfaces.ICloseAction {
    return {
        type: interfaces.ActionTypeKeys.CLOSE,
        value: streamId
    };
}
