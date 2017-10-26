import * as React from 'react';
import { IPassedProps } from './comp';

namespace interfaces {
    // concat of all actions
    export type ActionTypes = null;

    export const IChatSymbol = Symbol('IChatSymbol');

    export interface IChat {
        readonly Component: new(...args: any[]) => React.Component<IPassedProps>;
    }
}

export { interfaces }
