import Chat from './comp';
import getReducer from './reducer';
import * as selectors from './selectors';

// public interface for navigation connected component
export {
    Chat as component,
    selectors,
    getReducer
}
