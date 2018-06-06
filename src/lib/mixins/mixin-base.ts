import { Constructor } from '../interface';

export function mixinBase<T extends Constructor<{}>>(base: T): Constructor<{}> & T {
    return class extends base {
        constructor(...args: any[]) { super(...args); }
    };
}
