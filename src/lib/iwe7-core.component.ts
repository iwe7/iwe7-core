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
    constructor(public injector: Injector) {
        this._zone = this.injector.get(NgZone);
    }
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
                filter(res => !!res),
                delay(200)
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
    createCyc(name: string, isSubject: boolean = false) {
        if (isSubject) {
            this._cyc.set(name, new Subject());
        } else {
            this._cyc.set(name, new BehaviorSubject(false));
        }
    }
    ngOnChanges(changes: SimpleChanges) {
        this._zone.runOutsideAngular(() => {
            this.setCyc('ngOnChanges', changes);
        });
    }
    ngOnInit() {
        this._zone.runOutsideAngular(() => {
            this.setCyc('ngOnInit', this);
        });
    }
    ngDoCheck() {
        this._zone.runOutsideAngular(() => {
            this.setCyc('ngDoCheck', this);
        });
    }
    ngAfterContentInit() {
        this._zone.runOutsideAngular(() => {
            this.setCyc('ngAfterContentInit', this);
        });
    }
    ngAfterContentChecked() {
        this._zone.runOutsideAngular(() => {
            this.setCyc('ngAfterContentChecked', this);
        });
    }
    ngAfterViewInit() {
        this._zone.runOutsideAngular(() => {
            this.setCyc('ngAfterViewInit', this);
        });
    }
    ngAfterViewChecked() {
        this._zone.runOutsideAngular(() => {
            this.setCyc('ngAfterViewChecked', this);
        });
    }
    ngOnDestroy() {
        this.setCyc('ngOnDestroy', this);
    }
}
