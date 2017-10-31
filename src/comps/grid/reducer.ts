import { interfaces } from '../../sdk/interfaces'
import { STATE_NAME } from './constants';

interface State {
    chats: Array<string>;
}

const INITIAL_STATE: State = {
    chats: []
}

function doOpen(s: State, action: interfaces.grid.IOpenAction) {
    if (s.chats.indexOf(action.value) !== -1) {
        return s;
    }
    let newChats = s.chats.concat([action.value]);
    return {
        chats: newChats
    };
}

function doClose(s: State, action: interfaces.grid.ICloseAction) {
    let newChats = s.chats.filter((name) => {
        return name !== action.value
    });
    return {
        chats: newChats
    };
}

function gridReducer(s: State = INITIAL_STATE, action: interfaces.grid.ActionTypes) {
    switch(action.type) {
        case interfaces.grid.ActionTypeKeys.OPEN:
            return doOpen(s, action);
        case interfaces.grid.ActionTypeKeys.CLOSE:
            return doClose(s, action);
        default:
            return s;
    }
}

// exported so combineReducer can build
export default function() {
    return {
        name: STATE_NAME,
        reducer: gridReducer
    };
}
