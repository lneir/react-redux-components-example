import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { getStore } from './sdk/store';

import * as Nav from './navigation';
import * as Grid from './grid';

import { interfaces } from './sdk/interfaces';

import registrar from './registrar';

Promise.all([ Grid.init(), Nav.init() ]).then(() =>  {
    let store = getStore();

    let grid = registrar.get<interfaces.grid.IGrid>(interfaces.grid.IGridSymbol);
    let nav = registrar.get<interfaces.nav.INavigation>(interfaces.nav.INavigationSymbol);

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
}).catch((err) => { console.error('app failed to init with error: ' + err)});
