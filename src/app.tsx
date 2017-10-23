import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

// use publc interfaces from components
import * as Nav from './navigation/index';
import * as Grid from './grid/index';
import * as Chat from './chat/index';

const reducers = Object.assign({}, Nav.getReducer(), Grid.getReducer(), Chat.getReducer())
const rootReducer = combineReducers(reducers);
let store = createStore(rootReducer);

var navEl = document.getElementById('nav');

var navItems:Array<string> = [
    'chat1',
    'chat2',
    'chat3'
];

ReactDOM.render(
  <Provider store={store}>
    <Nav.component navItems={navItems}/>
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
