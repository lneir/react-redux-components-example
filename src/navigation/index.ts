import Navigation from './comp';
import getReducer from './reducer';
import * as selectors from './selectors';

// public interface for navigation connected component
export {
    Navigation as component,
    selectors,
    getReducer
}
