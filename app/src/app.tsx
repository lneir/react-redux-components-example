import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import * as Nav from 'navigation';
import * as Grid from 'grid';

import { interfaces, registry, store } from 'sdk';

import loadComponent from './loadComponent';

registry.setComponentLoader(loadComponent);

Promise.all([ Grid.init(), Nav.init() ]).then(() =>  {
    let str = store.getStore();

    let grid = registry.get<interfaces.grid.IGrid>(interfaces.Symbols.IGrid);
    let nav = registry.get<interfaces.nav.INavigation>(interfaces.Symbols.INavigation);

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
