import Grid from './comp';
import getReducer from './reducer';
import * as selectors from './selectors';
import * as actions from './actions';

//import * as actionTypes from './actionTypes';
// ToDo: need to figure better way to re-export interfaces, above doesn't work.
import { ICloseAction, IOpenAction } from './actionTypes';

// public interface for navigation connected component
export {
    Grid as component,
    selectors,
    actions,
    ICloseAction,
    IOpenAction,
    getReducer
}
