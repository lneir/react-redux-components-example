import { ActionTypeKeys, OpenAction } from './actionTypes';
import { ActionCreator } from 'redux';

export function open(streamId: string) : OpenAction {
    // return function(dispatch) {
    debugger;
        return {
            type: ActionTypeKeys.OPEN,
            value: streamId
        };
    // }
}
