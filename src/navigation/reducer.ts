import { ActionTypes, ActionTypeKeys, OpenAction } from './actionTypes';

interface State {
    name: string;
}

const INITIAL_STATE: State = {
    name: 'not defined'
}

function doOpen(action: OpenAction) {
    return {
        name: action.value
    }
}

export function navigation(s: State = INITIAL_STATE, action: ActionTypes) {
    switch(action.type) {
        case ActionTypeKeys.OPEN:
            return doOpen(action);
        default:
            return s;
    }
}
