import * as React from 'react';

namespace interfaces {

    export type InterfaceIdentifier = symbol;

    export namespace chat {
        // concat of all actions
        export type ActionTypes = null;

        export const IChatSymbol:InterfaceIdentifier = Symbol('IChatSymbol');

        export interface IPassedProps {
            streamId: string;
        }

        export interface IChat {
            readonly Component: new(...args: any[]) => React.Component<IPassedProps>;
        }
    }

    export namespace grid {
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

        export const IGridSymbol:InterfaceIdentifier = Symbol('IGrid');

        export interface IPassedProps {
        }

        export interface IGrid {
            open(streamId: string): IOpenAction;
            close(streamId: string): ICloseAction;
            readonly Component: new(...args: any[]) => React.Component<IPassedProps>;
        }
    }

    export namespace nav {
        // concat of all actions
        export type ActionTypes = null;

        export const INavigationSymbol:InterfaceIdentifier = Symbol('INavigationSymbol');

        export interface IPassedProps {
            navItems: Array<string>;
        }

        export interface INavigation {
            readonly Component: new(...args: any[]) => React.Component<IPassedProps>;
        }
    }
}

export { interfaces }
