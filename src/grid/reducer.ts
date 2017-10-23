import { ActionTypes, ActionTypeKeys, IOpenAction, ICloseAction } from './actionTypes';

interface State {
    chats: Array<string>;
}

const INITIAL_STATE: State = {
    chats: []
}

function doOpen(s: State, action: IOpenAction) {
    if (s.chats.indexOf(action.value) !== -1) {
        return s;
    }
    var newChats = s.chats.concat([action.value]);
    return {
        chats: newChats
    };
}

function doClose(s: State, action: ICloseAction) {
    var newChats = s.chats.filter((name) => {
        return name !== action.value
    });
    return {
        chats: newChats
    };
}

export function gridReducer(s: State = INITIAL_STATE, action: ActionTypes) {
    switch(action.type) {
        case ActionTypeKeys.OPEN:
            return doOpen(s, action);
        case ActionTypeKeys.CLOSE:
            return doClose(s, action);
        default:
            return s;
    }
}
