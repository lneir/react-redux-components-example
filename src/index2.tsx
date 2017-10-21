import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

// import { printLabel } from './index';
import { Nav, navigation } from './navigation/index';

// import { navigationReducer } from './navigation/reducer';
// import Nav from './navigation/comp';
// printLabel({ label: 'testing'});

var navEl = document.getElementById('nav');
// ReactDOM.render(
//     <Component/>,
//     navEl
// );

const rootReducer = combineReducers({
    navigation
});

export let store = createStore(rootReducer);

function test(streamId: string) {}

ReactDOM.render(
  <Provider store={store}>
    <Nav/>
  </Provider>,
  navEl
);

//export function injectAsyncReducer(store, name, asyncReducer) {
//  store.asyncReducers[name] = asyncReducer;
//  store.replaceReducer(createReducer(store.asyncReducers));
//}
