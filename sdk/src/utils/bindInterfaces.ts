import { interfaces } from '../interfaces'

/**
 * Returns a new function that is bound to the given function (func) with
 * additional arguments that provide access to given interfaces.
 * @param  {Function} func  Function that gets bound to new arguments.
 * @param  {Array<Symbols>} interfaces  Array of interfaces to bind against function.
 * @return {Function}  New function with additional argument functions.
 *
 * Example:
 * let myFunc = (getIGrid: () => interfaces.grid.IGrid, arg1:string, arg2: number) => {
 *   var grid:interfaces.grid.IGrid = getIGrid();
 *   ....do something...
 * }
 *
 * let newBoundMyFunc = bindInterfaces(myFunc, [ interfaces.Symbols.IGrid ]);
 *
 * // this will call myFunc with two args and additional bound argument: getIGrid.
 * newBoundMyFunc('hello', 1)
 *
 */
function makeBindInterfaces(registry) {
    return function bindInterfaces(func: (...args: Array<any>) => any,
            interfaces: Array<interfaces.InterfaceIdentifier>) {
        let injectedInterfaces = interfaces.map((dependency) => {
            return () => { return registry.get(dependency); }
        });
        return func.bind(func, ...injectedInterfaces);
    }
}

export { makeBindInterfaces }
