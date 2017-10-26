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
            throw new Error('No registration found for: ' + identifier.toString())
        }
        let c = new C(args);
        return c as T;
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
