import { STATE_NAME } from './constants';
import { interfaces } from './interfaces'

interface State {
    chats: Array<string>;
}

const INITIAL_STATE: State = {
    chats: []
}

function doOpen(s: State, action: interfaces.IOpenAction) {
    if (s.chats.indexOf(action.value) !== -1) {
        return s;
    }
    var newChats = s.chats.concat([action.value]);
    return {
        chats: newChats
    };
}

function doClose(s: State, action: interfaces.ICloseAction) {
    var newChats = s.chats.filter((name) => {
        return name !== action.value
    });
    return {
        chats: newChats
    };
}

function gridReducer(s: State = INITIAL_STATE, action: interfaces.ActionTypes) {
    switch(action.type) {
        case interfaces.ActionTypeKeys.OPEN:
            return doOpen(s, action);
        case interfaces.ActionTypeKeys.CLOSE:
            return doClose(s, action);
        default:
            return s;
    }
}

// exported so combineReducer can build
export default function() {
    return {
        [ STATE_NAME ]: gridReducer
    }
}
