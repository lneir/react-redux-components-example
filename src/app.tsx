import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import * as Nav from './comps/navigation';
import * as Grid from './comps/grid';

import { interfaces, registrar, store } from './sdk';

Promise.all([ Grid.init(), Nav.init() ]).then(() =>  {
    let str = store.getStore();

    let grid = registrar.get<interfaces.grid.IGrid>(interfaces.grid.IGridSymbol);
    let nav = registrar.get<interfaces.nav.INavigation>(interfaces.nav.INavigationSymbol);

    let navEl = document.getElementById('nav');

    let navItems:Array<string> = [
        'chat1',
        'chat2',
        'chat3'
    ];

    ReactDOM.render(
      <Provider store={str}>
        <nav.Component navItems={navItems}/>
      </Provider>,
      navEl
    );

    let gridEl = document.getElementById('grid');

    ReactDOM.render(
      <Provider store={str}>
        <grid.Component/>
      </Provider>,
      gridEl
    );
}).catch((err) => { console.error('app failed to init with error: ' + err)});
