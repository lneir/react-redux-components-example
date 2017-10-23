import Chat from './comp';
import { chatReducer } from './reducer';
import * as selectors from './selectors';

// public interface for navigation connected component
export {
    Chat as component,
    chatReducer as reducer,
    selectors
}
