import implMap from './implMap';

type InterfaceIdentifier = symbol;

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
     * Check if interface implementation is registered, if not then dynamically
     * load module and init.
     * @param  {InterfaceIdentifier} identifier [description]
     * @return {Promise}                         [description]
     */
    resolveOne(identifier:InterfaceIdentifier) {
        var pr = new Promise((resolve, reject) => {
            if (this.map.get(identifier)) {
                resolve(true);
                return;
            }
            if (implMap[identifier]) {
                const moduleName = implMap[identifier];
                // https://github.com/jquintozamora/react-typescript-webpack2-cssModules-postCSS/blob/master/app/src/components/AsyncLoading/AsyncLoading.tsx#L57-L68
                // use typescript dynamic import to async load module
                // import(/* webpackChunkName: "chat" */ "../chat")
                import('../comps/' + moduleName)
                .then(module => {
                    return module.init();
                }).then((reducer) => {
                    resolve(true);
                })
                .catch(err => {
                    reject('Can not load module: ' + moduleName);
                });
            } else {
                reject('No implementation exists: ' + identifier.toString());
            }
        });

        return pr;
    }

    resolve(identifiers: Array<InterfaceIdentifier>) {
        var promises = [];
        identifiers.forEach((identifier) => {
            promises.push(this.resolveOne(identifier));
        });

        return Promise.all(promises);
    }
}

var registrar = new Registrar();

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
