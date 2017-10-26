import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import * as Nav from './navigation';
import * as Grid from './grid';
import * as Chat from './chat';

import { interfaces as gridInterfaces } from './grid/interfaces';
import { interfaces as NavInterfaces } from './navigation/interfaces';

import registrar from './registrar';

let gridReducer = Grid.init();
let chatReducer = Chat.init();
let navReducer = Nav.init();

const reducers = Object.assign({}, navReducer, gridReducer, chatReducer)
const rootReducer = combineReducers(reducers);
let store = createStore(rootReducer);

let grid = registrar.get<gridInterfaces.IGrid>(gridInterfaces.IGridSymbol);
let nav = registrar.get<NavInterfaces.INavigation>(NavInterfaces.INavigationSymbol);

var navEl = document.getElementById('nav');

var navItems:Array<string> = [
    'chat1',
    'chat2',
    'chat3'
];

ReactDOM.render(
  <Provider store={store}>
    <nav.Component navItems={navItems}/>
  </Provider>,
  navEl
);

var gridEl = document.getElementById('grid');

ReactDOM.render(
  <Provider store={store}>
    <grid.Component/>
  </Provider>,
  gridEl
);
