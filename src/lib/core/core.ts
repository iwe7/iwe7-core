import { BehaviorSubject } from 'rxjs';
import {
    OnChanges, AfterViewChecked,
    AfterContentChecked, AfterContentInit, SimpleChanges,
    OnInit, DoCheck, OnDestroy, AfterViewInit, Provider
} from '@angular/core';
export abstract class Core<State> extends BehaviorSubject<State> { }


export abstract class CoreCyc<State> extends Core<State>
    implements OnInit, OnDestroy, OnChanges,
    AfterViewChecked, AfterContentChecked,
    AfterContentInit, DoCheck, AfterViewInit {
    abstract ngOnInit(): void;
    abstract ngOnChanges(changes: SimpleChanges): void;
    abstract ngOnDestroy(): void;
    abstract ngAfterContentChecked(): void;
    abstract ngAfterContentInit(): void;
    abstract ngAfterViewChecked(): void;
    abstract ngAfterViewInit(): void;
    abstract ngDoCheck(): void;
}
