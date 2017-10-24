import Grid from './comp';
import getReducer from './reducer';
import * as selectors from './selectors';
import * as actions from './actions';

// somewhat ackward method to export actionTypes which contains interfaces
export import actionTypes = require('./actionTypes');

// public interface for navigation connected component
export {
    Grid as component,
    selectors,
    actions,
    getReducer
}
