import { ActionCreator } from 'redux';
import { interfaces } from '../sdk/interfaces';

export function open(streamId: string) : interfaces.grid.IOpenAction {
    return {
        type: interfaces.grid.ActionTypeKeys.OPEN,
        value: streamId
    };
}

export function close(streamId: string) : interfaces.grid.ICloseAction {
    return {
        type: interfaces.grid.ActionTypeKeys.CLOSE,
        value: streamId
    };
}
