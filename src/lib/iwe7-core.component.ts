import { Injector, NgZone } from '@angular/core';
import { filter, tap, map, delay } from 'rxjs/operators';
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
    _zone: NgZone;
    _hasChange: boolean = false;
    constructor(public injector: Injector) {
        this._zone = this.injector.get(NgZone);
    }
    getCyc(name: string, isSubject: boolean = false): Observable<any> {
        if (!this._cyc.has(name)) {
            this.createCyc(name, isSubject);
        }
        if (name === 'onDestroy') {
            return this._cyc.get(name);
        } else if (name === 'ngOnChanges') {
            // 等到ngOnInit之后,执行ngOnChanges
            return this._cyc.get(name).pipe(
                takeUntil(this.getCyc('onDestroy', true)),
                filter(res => !!res),
                switchMap((changes: SimpleChanges) => {
                    return this.getCyc('ngOnInit').pipe(
                        map(res => changes)
                    );
                })
            );
        } else {
            return this._cyc.get(name).pipe(
                takeUntil(this.getCyc('onDestroy', true)),
                filter(res => !!res),
                delay(200)
            );
        }
    }
    setCyc(name: string, data: any, isSubject: boolean = false) {
        if (!this._cyc.has(name)) {
            this.createCyc(name, isSubject);
        }
        this._cyc.get(name).next(data);
        if (name === 'onDestroy') {
            this._cyc.get(name).complete();
        }
    }
    createCyc(name: string, isSubject: boolean = false) {
        if (isSubject) {
            this._cyc.set(name, new Subject());
        } else {
            this._cyc.set(name, new BehaviorSubject(false));
        }
    }
    runOutsideAngular(fn: any) {
        this._zone.runOutsideAngular(fn);
    }
    run(fn: any) {
        this._zone.run(fn);
    }
    ngOnChanges(changes: SimpleChanges) {
        this.runOutsideAngular(() => {
            this.setCyc('ngOnChanges', changes);
            this._hasChange = true;
        });
    }
    ngOnInit() {
        this.runOutsideAngular(() => {
            this.setCyc('ngOnInit', this);
            // 模拟没有@Input时触发ngOnChanges
            if (!this._hasChange) {
                this.setCyc('ngOnChanges', this);
            }
        });
    }
    ngDoCheck() {
        this.runOutsideAngular(() => {
            this.setCyc('ngDoCheck', this);
        });
    }
    ngAfterContentInit() {
        this.runOutsideAngular(() => {
            this.setCyc('ngAfterContentInit', this);
        });
    }
    ngAfterContentChecked() {
        this.runOutsideAngular(() => {
            this.setCyc('ngAfterContentChecked', this);
        });
    }
    ngAfterViewInit() {
        this.runOutsideAngular(() => {
            this.setCyc('ngAfterViewInit', this);
        });
    }
    ngAfterViewChecked() {
        this.runOutsideAngular(() => {
            this.setCyc('ngAfterViewChecked', this);
        });
    }
    ngOnDestroy() {
        this.runOutsideAngular(() => {
            this.setCyc('ngOnDestroy', this, true);
        });
    }
}
