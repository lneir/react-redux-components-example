import { interfaces } from '../sdk/interfaces'
import { STATE_NAME } from './constants';

interface State {
}

const INITIAL_STATE: State = {
}

function navigationReducer(s: State = INITIAL_STATE, action: interfaces.nav.ActionTypes) {
    return s;
}

// exported so combineReducer can build
export default function() {
    return {
        [ STATE_NAME ]: navigationReducer
    }
}
