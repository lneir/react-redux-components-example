import { interfaces } from '../../sdk/interfaces'
import { STATE_NAME } from './constants';

interface State {
}

const INITIAL_STATE: State = {
}

function chatReducer(s: State = INITIAL_STATE, action: interfaces.chat.ActionTypes) {
    return s;
}

// exported so combineReducer can build
export default function() {
    return {
        name: STATE_NAME,
        reducer: chatReducer
    };
}
