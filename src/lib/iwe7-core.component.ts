import { filter, tap, map } from 'rxjs/operators';
import { takeUntil, takeWhile, switchMap } from 'rxjs/operators';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import {
    OnInit, OnChanges,
    AfterViewInit, AfterContentChecked,
    SimpleChange, SimpleChanges, DoCheck,
    AfterContentInit, AfterViewChecked,
    OnDestroy
} from '@angular/core';
export class Iwe7CoreComponent implements
    OnInit, OnChanges,
    AfterViewInit, AfterContentChecked,
    DoCheck, AfterContentInit, AfterViewChecked,
    OnDestroy {
    _cyc: Map<string, Subject<any>> = new Map();

    // 常用处理
    getCyc(name: string): Observable<any> {
        if (!this._cyc.has(name)) {
            this.createCyc(name, name === 'onDestroy');
        }
        if (name === 'onDestroy') {
            return this._cyc.get(name);
        } else if (name === 'ngOnChanges') {
            // 等到ngOnInit之后,执行ngOnChanges
            return this._cyc.get(name).pipe(
                takeUntil(this.getCyc('onDestroy')),
                filter(res => !!res),
                switchMap((changes: SimpleChanges) => {
                    return this.getCyc('ngOnInit').pipe(
                        map(res => changes)
                    );
                })
            );
        } else {
            return this._cyc.get(name).pipe(
                takeUntil(this.getCyc('onDestroy')),
                filter(res => !!res)
            );
        }
    }
    setCyc(name: string, data: any) {
        if (!this._cyc.has(name)) {
            this.createCyc(name, name === 'onDestroy');
        }
        this._cyc.get(name).next(data);
        if (name === 'onDestroy') {
            this._cyc.get(name).complete();
        }
    }



    private createCyc(name: string, isSubject: boolean = false) {
        if (isSubject) {
            this._cyc.set(name, new Subject());
        } else {
            this._cyc.set(name, new BehaviorSubject(false));
        }
    }

    // 绑定属性发生变化的时候调用，第一次调用一定在ngOnInit之前。
    ngOnChanges(changes: SimpleChanges) {
        this.setCyc('ngOnChanges', changes);
    }
    // 第一轮ngChanges之后调用，本钩子只调用一次。
    // 当Angular初始化完成数据绑定的输入属性后，用来初始化指令或者组件。
    ngOnInit() {
        this.setCyc('ngOnInit', this);
    }
    // 在ngOnInit和ngDoCheck之后，会一直检查。
    // 用来检测所有变化（无论是Angular本身能检测还是无法检测的），并作出相应行动。
    // 在每次执行“变更检测”时被调用。
    ngDoCheck() {
        this.setCyc('ngDoCheck', this);
    }
    // 当内容投影进组件之后调用。第一次ngDoCheck之后调用，只调用一次，只适用于组件。
    // 父组件调用完成之后，所有子组件才会调用。
    ngAfterContentInit() {
        this.setCyc('ngAfterContentInit', this);
    }
    // 每完成被投影组件内容发生变化时调用。
    // ngAfterContentInit和ngDocheck之后调用，只适用于组件。
    // 父组件调用完成之后，所有子组件才会调用。
    ngAfterContentChecked() {
        this.setCyc('ngAfterContentChecked', this);
    }
    // 初始化完成组件试图及其子视图之后调用。
    // 第一次ngAfterContentChecked之后调用，只调用一次，只适用于组件。
    // 所有子组件调用完成之后，父组件才会调用。
    // 此阶段更改属性的值会报错，可在settimeout后运行。
    ngAfterViewInit() {
        this.setCyc('ngAfterViewInit', this);
    }
    // 每次做完组件视图和子组件视图的变更检测之后调用。
    // ngAfterViewInit和ngAfterContentChecked之后调用，只适用于组件。
    // 所有子组件调用完成之后，父组件才会调用。
    // 此阶段更改属性的值会报错，可在settimeout后运行。
    ngAfterViewChecked() {
        this.setCyc('ngAfterViewChecked', this);
    }
    // 组件销毁时调用，主要用于内存回收。
    // 路由跳转时组件会销毁。
    ngOnDestroy() {
        this.setCyc('ngOnDestroy', this);
    }
}
