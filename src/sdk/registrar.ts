import loadComponent from './loadComponent';
import { interfaces } from './interfaces'

type InterfaceIdentifier = interfaces.InterfaceIdentifier;

type constructor<T> = new(...args: any[]) => T;

class Registrar {
    private map: Map<InterfaceIdentifier,any>;

    constructor() {
        this.map = new Map();
    }

    bind<T>(identifier:InterfaceIdentifier, constructor: constructor<T>) {
        this.map.set(identifier, constructor)
    }

    get<T>(identifier:InterfaceIdentifier, ...args) {
        let C = this.map.get(identifier);
        if (!C) {
                throw new Error('No registration found for: ' + identifier.toString());
        }
        let c = new C(args);
        return (c as T);
    }

    /**
     * Checks if interface implementation is registered, if not then dynamically
     * load module and init.
     * @param  {InterfaceIdentifier} identifier  Symbol interface
     * @return {Promise}                         Promise resolved when component is loaded, else rejected.
     */
    resolveOne(identifier:InterfaceIdentifier) {
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
}

const registrar = new Registrar();

export default registrar;

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
