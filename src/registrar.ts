type InterfaceIdentifier = symbol;

type constructor<T> = new(...args: any[]) => T;

class Registrar {
    private map: Map<any,any>;

    constructor() {
        this.map = new Map();
    }

    bind<T>(identifier:InterfaceIdentifier, constructor: constructor<T>) {
        this.map.set(identifier, constructor)
    }

    get<T>(identifier:InterfaceIdentifier, ...args) {
        let C = this.map.get(identifier);
        let c = new C(args);
        return c as T;
    }
}

var registrar = new Registrar();

export default registrar;

// var r = new Registar();
//
// interface ITest {
//     hello: string;
// }
//
// interface ITest2 {
//     help: string;
// }
//
// class Test implements ITest {
//     hello: 'test'
// }
//
// class Test2 implements ITest {
//     hello: 'test2'
// }
//
// class Test3 implements ITest {
//     help: 'test'
// }
//
// export let InterfaceSymbols = {
//     IGrid: Symbol('IGrid'),
//     IChat: Symbol('IChat')
// }
//
// r.bind<ITest>(InterfaceSymbols.IChat, Test2);
// let test2 = r.get<ITest>(InterfaceSymbols.IGrid);
