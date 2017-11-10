import loadComponent from './loadComponent';
import { interfaces } from './interfaces'

export type InterfaceIdentifier = interfaces.InterfaceIdentifier;

export class Registrar implements interfaces.IRegistrar {
    private map: Map<InterfaceIdentifier,any>;

    private clonedMap: Map<InterfaceIdentifier,any>;
    private waitingForRestore: boolean;

    constructor() {
        this.map = new Map();
    }

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
     * @return {Promise}                         Promise resolved when component is loaded, else rejected.
     */
    private resolveOne(identifier:InterfaceIdentifier) {
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

    resolve(identifiers: Array<InterfaceIdentifier>) {
        let promises = [];
        identifiers.forEach((identifier) => {
            promises.push(this.resolveOne(identifier));
        });

        return Promise.all(promises);
    }

    /**
     * snapshot and restore are intended to be used for testing purposes...
     * registrar.snapshot();
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

export default new Registrar();

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
// registrar.bind<ITest>(InterfaceSymbols.ITest, Test);
// let test2 = registrar.get<ITest>(InterfaceSymbols.ITest);
// console.log(test2.hello)
