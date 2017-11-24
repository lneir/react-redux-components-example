import * as React from 'react';

namespace interfaces {

    export type InterfaceIdentifier = symbol;

    // define Symbols for each interface below.
    export const Symbols = {
        IChat: Symbol('IChatSymbol'),
        IGrid: Symbol('IGridSymbol'),
        INavigation: Symbol('INavigationSymbol')
    }

    export type constructor<T> = new(...args: any[]) => T;

    export namespace chat {
        // concat of all actions
        export type ActionTypes = null;

        export interface IPassedProps {
            streamId: string;
        }

        // define dependent interfaces
        export const deps:Array<InterfaceIdentifier> = [ Symbols.IGrid ];

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

        export interface IPassedProps {
        }

        // define dependent interfaces
        export const deps:Array<InterfaceIdentifier> = [ Symbols.IChat ];

        export interface IGrid {
            open(streamId: string): IOpenAction;
            close(streamId: string): ICloseAction;
            readonly Component: new(...args: any[]) => React.Component<IPassedProps>;
        }
    }

    export namespace nav {
        // concat of all actions
        export type ActionTypes = null;

        export interface IPassedProps {
            navItems: Array<string>;
        }

        // define dependent interfaces
        export const deps:Array<InterfaceIdentifier> = [ Symbols.IGrid ];

        export interface INavigation {
            readonly Component: new(...args: any[]) => React.Component<IPassedProps>;
        }
    }

    export type ComponentloaderFunc = (identifier:symbol) => Promise<any>;

    export interface IRegistry {
        bind<T>(identifier:InterfaceIdentifier, constructorOrInstance: constructor<T>|T): void;
        unbind<T>(identifier:InterfaceIdentifier): void;
        get<T>(identifier:InterfaceIdentifier, ...args): T;
        resolve(identifiers: Array<InterfaceIdentifier>): Promise<Array<boolean>>;
        setComponentLoader(componentLoader: ComponentloaderFunc): void;
        snapshot(): void;
        restore(): void;
    }
}

export { interfaces }
