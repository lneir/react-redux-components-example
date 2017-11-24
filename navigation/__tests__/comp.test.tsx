import * as React from 'react';
import { Provider } from 'react-redux';

import * as  Enzyme from 'enzyme';
var Adapter = require('enzyme-adapter-react-16');
Enzyme.configure({ adapter: new Adapter() });

import Navigation from '../src/comp';
import { registry, interfaces, store } from 'sdk';

class MockGrid implements interfaces.grid.IGrid {
    open(streamId: string): interfaces.grid.IOpenAction {
        return {
            type: interfaces.grid.ActionTypeKeys.OPEN,
            value: streamId + 'mock-open'
        };
    }

    close(streamId: string): interfaces.grid.ICloseAction {
        return {
            type: interfaces.grid.ActionTypeKeys.CLOSE,
            value: streamId + 'mock-close'
        }
    }

    get Component(): new(...args: any[]) => React.Component<interfaces.grid.IPassedProps> {
        return null;
    }
}

describe('Navigation Components tests', () => {
    let grid:interfaces.grid.IGrid;
    beforeEach(() => {
        grid = new MockGrid();
        jest.spyOn(grid, 'open');
        registry.snapshot();
        registry.bind<interfaces.grid.IGrid>(interfaces.Symbols.IGrid, grid)
    });
    afterEach(() => {
        registry.restore();
    })
    it('clicking on navigation item shoudld invoke grid open action', () => {
        let navItems:Array<string> = [
            'chat1'
        ];

        let str = store.getStore();
        const nav = Enzyme.mount(
            <Provider store={str}>
                <Navigation navItems={navItems}/>
            </Provider>
        );

        nav.find('button').simulate('click');

        expect(grid.open).toHaveBeenCalledWith('chat1');
    });
});
