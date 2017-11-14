import loadComponent from './loadComponent';
import { interfaces } from './interfaces'

export type InterfaceIdentifier = interfaces.InterfaceIdentifier;

export class Registry implements interfaces.IRegistry {
    private map: Map<InterfaceIdentifier,any>;
    private clonedMap: Map<InterfaceIdentifier,any>;
    private waitingForRestore: boolean;

    constructor() {
        this.map = new Map();
    }

    /**
     * Binds an interface to either a constructor or instance (i.e., singleton).
     * @param  {Sybmol} identifier  Symbol identifying the interface
     * @param  {constructor or T} constructorOrInstance  Can be either.
     */
    bind<T>(identifier:InterfaceIdentifier, constructorOrInstance: interfaces.constructor<T> | T): void {
        this.map.set(identifier, constructorOrInstance);
    }

    /**
     * Removes a previously bound interface.  Primarily intended for testing
     * and used in conjuction with snapshot/restore.
     * @param  {InterfaceIdentifier} identifier Identifier to be removed (if exists)
     */
    unbind<T>(identifier:InterfaceIdentifier): void {
        if (this.map.has(identifier)) {
            this.map.delete(identifier);
        }
    }

    /**
     * Returns an instance for a given interface. Will throw exception no
     * registration found.
     * @param  {Symbol} identifier  Symbol identifying the interface.
     * @param  {Object} args  Arguments to constructor of instance.
     * @return {T}            Instance of given interface.
     */
    get<T>(identifier:InterfaceIdentifier, ...args): T {
        let constructorOrInstance = this.map.get(identifier);
        if (!constructorOrInstance) {
            throw new Error('No registration found for: ' + identifier.toString());
        }
        let instance;
        if (typeof constructorOrInstance === "function") {
            instance = new constructorOrInstance(args);
        } else {
            instance = constructorOrInstance;
        }

        return (instance as T);
    }

    /**
     * Checks if interface implementation is registered, if not then dynamically
     * load module and init.
     * @param  {InterfaceIdentifier} identifier  Symbol interface
     * @return {Promise}  Promise resolved when component is loaded, else rejected.
     */
    private resolveOne(identifier:InterfaceIdentifier): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.map.get(identifier)) {
                resolve(true);
                return;
            }
            loadComponent(identifier)
            .then(() => { resolve(true); })
            .catch(err => {
                reject('Can not load module: ' + identifier.toString());
            });
        });
    }

    /**
     * Resolves an array of interfaces...if given interface is not found
     * then attempt to dynamically load component.
     * @param  {Array<InterfaceIdentifier>} identifiers  Array of Interfaces to be resolved.
     * @return {Promise}  when all identifiers are resolved.
     */
    resolve(identifiers: Array<InterfaceIdentifier>): Promise<Array<boolean>> {
        let promises = [];
        identifiers.forEach((identifier) => {
            promises.push(this.resolveOne(identifier));
        });

        return Promise.all(promises);
    }

    /**
     * snapshot and restore are intended to be used for testing purposes...
     * registry.snapshot();
     * registar.unbind<T1>(T1Symbol);
     * reigstar.bind<T1>(T1Symbol, mockT1);
     * ...do testing...
     * registar.restore();
     */
    snapshot(): void {
        if (this.waitingForRestore) {
            throw new Error('Must call restore before calling snapshot again.');
        }
        this.waitingForRestore = true;
        this.clonedMap = new Map(this.map);
    }

    restore(): void {
        if (this.clonedMap) {
            this.map = this.clonedMap;
            this.clonedMap = null;
            this.waitingForRestore = false;
        } else {
            throw new Error('No cloned map exists.')
        }
    }
}

// example:
// interface ITest {
//     hello: string;
// }
//
// class Test implements ITest {
//     hello: 'test'
// }
//
// export let InterfaceSymbols = {
//     ITest: Symbol('ITest'),
// }
//
// Note: in typescript use Symbols to define interface since
// interfaces do not exist at runtime.
//
// registry.bind<ITest>(InterfaceSymbols.ITest, Test);
// let test2 = registry.get<ITest>(InterfaceSymbols.ITest);
// console.log(test2.hello)
