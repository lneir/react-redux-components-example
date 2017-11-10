import registrar from '../registrar';
import { interfaces } from '../interfaces'

/**
 * Calls given function (func) with extra functions that return instance of interface.
 * @param  {Function} func         Function to call with new
 * @param  {Array<Symbols>} dependencies  Array of interfaces to get bound to function.
 * @return {Function}  New function with additional argument functions.
 *
 * Example:
 * let myFunc = (x,y) => { ...do somethign }
 * myNewFunc = bindDependencies(myFunc, [ interface.grid.IGrid])
 * when myNewFunc is called it will have new signature: (x,y,getIGrid). Calling getIGrid()
 * will return instance of IGrid.
 */
export default function bindDependencies(func: (...args) => any, dependencies: Array<interfaces.InterfaceIdentifier>) {
    let injections = dependencies.map((dependency) => {
        return () => { return registrar.get(dependency); }
    });
    return function() {
        return func.apply(func, Array.prototype.slice.call(arguments).concat(...injections));
    }
}
