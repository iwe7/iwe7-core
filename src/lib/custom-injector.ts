import { Iwe7CoreComponent } from './iwe7-core.component';
import { Injector, InjectionToken, InjectFlags } from '@angular/core';
// 自定义数据
export const CUSTOM_DATA = new InjectionToken<any>('CUSTOM_DATA');
export const CUSTOM_CLOSE = new InjectionToken<Function>('CUSTOM_CLOSE');
export const CUSTOM_CONTROL = new InjectionToken<any>('CUSTOM_CONTROL');


export class CustomInjector implements Injector {
    constructor(
        private _parentInjector: Injector,
        private _customTokens: WeakMap<any, any>
    ) { }
    get(token: any, notFoundValue?: any): any {
        const value = this._customTokens.get(token);
        if (typeof value !== 'undefined') {
            return value;
        }
        return this._parentInjector.get<any>(token, notFoundValue);
    }
}

export class CustomComponent<T> extends Iwe7CoreComponent {
    _customData: T;
    _customClose: Function;
    _customControl: any;
    constructor(injector: Injector) {
        super(injector);
        this._customData = injector.get<T>(CUSTOM_DATA, {} as T, InjectFlags.Optional);
        this._customClose = injector.get(CUSTOM_CLOSE, (_: any) => { }, InjectFlags.Optional);
        this._customControl = injector.get(CUSTOM_CONTROL, undefined, InjectFlags.Optional);
    }
    _customRefClose() {
        this._customClose(this._customData);
    }
}


