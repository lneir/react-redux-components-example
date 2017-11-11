import registry from '../registry';
import { interfaces } from '../interfaces'

/**
 * Calls given function (func) with extra functions that return instances of interfaces.
 * @param  {Function} func         Function to call with new
 * @param  {Array<Symbols>} interfaces  Array of interfaces to get bound to function.
 * @return {Function}  New function with additional argument functions.
 *
 * Example:
 * let myFunc = (x,y) => { ...do something... }
 * myNewFunc = bindInterfaces(myFunc, [ interface.grid.IGrid ])
 * when myNewFunc is called it will have new signature: (x,y,getIGrid). Calling getIGrid()
 * will return instance of IGrid.
 */
export default function bindInterfaces(func: (...args) => any, interfaces: Array<interfaces.InterfaceIdentifier>) {
    let injectedInterfaces = interfaces.map((dependency) => {
        return () => { return registry.get(dependency); }
    });
    return function() {
        return func.apply(func, Array.prototype.slice.call(arguments).concat(...injectedInterfaces));
    }
}
