import { ControlValueAccessor, DefaultValueAccessor } from '@angular/forms';
import { Constructor } from '../interface';
import { Iwe7Core } from '../iwe7-core.component';
export function mixinControlValueAccessor<T extends Constructor<Iwe7Core>>(base: T): Constructor<{}> & T {
    return class extends base implements ControlValueAccessor {
        _onChange: any = (_: any) => { };
        _onTouched: any = (_: any) => { };
        constructor(...args: any[]) { super(...args); }
        writeValue(obj: any): void {
            if (obj) {
                this.setCyc('ngWriteValue', obj);
            }
        }
        registerOnChange(fn: any): void {
            this._onChange = fn;
        }
        registerOnTouched(fn: any): void {
            this._onTouched = fn;
        }
        setDisabledState(isDisabled: boolean): void {
            this.setCyc('ngSetDisabledState', isDisabled);
        }
    };
}
