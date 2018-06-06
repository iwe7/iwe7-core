import { Constructor } from './interface';
import { Injector, NgZone, ChangeDetectorRef } from '@angular/core';
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

export class Iwe7Base { }

export class Iwe7Zone extends Iwe7Base {
    _zone: NgZone;
    runOutsideAngular<T>(fn: (...args: any[]) => T): T {
        return this._zone.runOutsideAngular(fn);
    }
    run<T>(fn: (...args: any[]) => T, applyThis?: any, applyArgs?: any[]): T {
        return this._zone.run(fn, applyThis, applyArgs);
    }
}

export type Iwe7CycType =
    'ngOnChanges' | 'ngOnInit' | 'ngDoCheck' |
    'ngAfterContentInit' | 'ngAfterContentChecked' |
    'ngAfterViewInit' | 'ngAfterViewChecked' | 'ngOnDestroy' |
    'ngSetDisabledState' | 'ngWriteValue' | 'ngStyle' | 'ngLocation' |
    string;

export class Iwe7Cyc extends Iwe7Zone {
    _cyc: Map<Iwe7CycType, Subject<any>> = new Map();
    getCyc(name: Iwe7CycType, isSubject: boolean = false, hasTakeUntil: boolean = true): Observable<any> {
        if (!this._cyc.has(name)) {
            if (name === 'ngOnDestroy') {
                isSubject = true;
            }
            this.createCyc(name, isSubject);
        }
        if (name === 'onDestroy') {
            return this._cyc.get(name);
        } else if (name === 'ngOnChanges') {
            // 等到ngOnInit之后,执行ngOnChanges
            return this._cyc.get('ngOnChangess').pipe(
                filter(res => !!res),
                switchMap((changes: SimpleChanges) => {
                    return this.getCyc('ngOnInit', false, false).pipe(
                        map(res => changes)
                    );
                })
            );
        } else {
            const res = this._cyc.get(name).pipe(
                filter(res => !!res),
            );
            // 是否takeUntil
            if (hasTakeUntil) {
                return res.pipe(
                    takeUntil(this.getCyc('onDestroy', true)),
                    delay(5)
                );
            } else {
                return res;
            }
        }
    }
    // 没毛病
    setCyc(name: Iwe7CycType, data: any, isSubject: boolean = false): void {
        if (!this._cyc.has(name)) {
            this.createCyc(name, isSubject);
        }
        this._cyc.get(name).next(data);
        if (name === 'onDestroy') {
            this._cyc.get(name).complete();
        }
    }
    // 没毛病
    createCyc(name: Iwe7CycType, isSubject: boolean = false): void {
        if (isSubject) {
            this._cyc.set(name, new Subject());
        } else {
            this._cyc.set(name, new BehaviorSubject(false));
        }
    }
}

export class Iwe7Core extends Iwe7Cyc implements
    OnInit, OnChanges,
    AfterViewInit, AfterContentChecked,
    DoCheck, AfterContentInit, AfterViewChecked,
    OnDestroy {
    _cd: ChangeDetectorRef;
    _hasChange: boolean = false;
    constructor(public injector: Injector) {
        super();
        this._zone = this.injector.get(NgZone);
        this._cd = this.injector.get(ChangeDetectorRef);
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

export class Iwe7CoreComponent extends Iwe7Cyc { }
