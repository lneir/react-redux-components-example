import { interfaces } from './interfaces';
import { Registry, default as registry } from './registry';
import * as store from './store';
import { injectInterface } from './utils/decorators';
import bindInterfaces from './utils/bindInterfaces';

export {
    interfaces,
    registry,
    Registry,
    store,
    injectInterface,
    bindInterfaces
}
