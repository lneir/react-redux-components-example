import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

let reducers = {
    dummy: () => ({})
};
const rootReducer = combineReducers(reducers);
let store = createStore(rootReducer);

/**
 * Allow dynamically added new reducers.
 * @param  {String} name    State name
 * @param  {[type]} reducer Function that returns reducer state.
 */
export function addReducer(name:string, reducer) {
    reducers[name] = reducer;
    var newReducers = combineReducers(reducers);
    store.replaceReducer(newReducers);
}

export function getStore() {
    return store;
}
