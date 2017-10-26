import * as React from 'react';

namespace interfaces {

    export namespace chat {
        export interface IPassedProps {
            streamId: string;
        }

        // concat of all actions
        export type ActionTypes = null;

        export const IChatSymbol = Symbol('IChatSymbol');

        export interface IChat {
            readonly Component: new(...args: any[]) => React.Component<IPassedProps>;
        }
    }

    export namespace grid {
        export interface IPassedProps {
        }

        export enum ActionTypeKeys {
            OPEN = 'grid/OPEN',
            CLOSE = 'grid/CLOSE',
        }

        export interface IOpenAction {
            type: ActionTypeKeys.OPEN;
            value: string;
        }

        export interface ICloseAction {
            type: ActionTypeKeys.CLOSE;
            value: string;
        }

        // concat of all actions
        export type ActionTypes = IOpenAction | ICloseAction;

        export interface IGrid {
            open(streamId: string): IOpenAction;
            close(streamId: string): ICloseAction;
            readonly Component: new(...args: any[]) => React.Component<IPassedProps>;
        }

        export const IGridSymbol = Symbol('IGrid');
    }

    export namespace nav {
        export interface IPassedProps {
            navItems: Array<string>;
        }

        // concat of all actions
        export type ActionTypes = null;

        export const INavigationSymbol = Symbol('INavigationSymbol');

        export interface INavigation {
            readonly Component: new(...args: any[]) => React.Component<IPassedProps>;
        }
    }
}

export { interfaces }
