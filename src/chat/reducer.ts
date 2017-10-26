import { interfaces } from './interfaces'
import { STATE_NAME } from './constants';

interface State {
}

const INITIAL_STATE: State = {
}

function chatReducer(s: State = INITIAL_STATE, action: interfaces.ActionTypes) {
    return s;
}

// exported so combineReducer can build
export default function() {
    return {
        [ STATE_NAME ]: chatReducer
    }
}
