import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

// use publc interfaces from component
import * as Nav from './navigation/index';
import * as Grid from './grid/index';
import * as Chat from './chat/index';

const rootReducer = combineReducers({
    navigation: Nav.reducer,
    grid: Grid.reducer,
    chat: Chat.reducer
});

export let store = createStore(rootReducer);

var navEl = document.getElementById('nav');

var initialChats:Array<string> = [
    'chat1',
    'chat2',
    'chat3'
];

ReactDOM.render(
  <Provider store={store}>
    <Nav.component initialChats={initialChats}/>
  </Provider>,
  navEl
);

var gridEl = document.getElementById('grid');

ReactDOM.render(
  <Provider store={store}>
    <Grid.component/>
  </Provider>,
  gridEl
);

//export function injectAsyncReducer(store, name, asyncReducer) {
//  store.asyncReducers[name] = asyncReducer;
//  store.replaceReducer(createReducer(store.asyncReducers));
//}
