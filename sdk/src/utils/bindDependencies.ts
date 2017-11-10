import registrar from '../registrar';

export default function bindDependencies(func, dependencies) {
    let injections = dependencies.map((dependency) => {
        return () => { return registrar.get(dependency); }
    });
    return function() {
        return func.apply(func, Array.prototype.slice.call(arguments).concat(...injections));
    }
}
