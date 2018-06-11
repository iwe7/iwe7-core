import { BehaviorSubject } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface CanSubjectData<T> {
    name: string;
    res: T;
}

export abstract class CanSubject<T> extends Subject<CanSubjectData<T>> implements OnDestroy {
    filter(name: string): Observable<CanSubjectData<T>> {
        return this.pipe(
            filter(res => res.name === name)
        );
    }

    ngOnDestroy() {
        this.complete();
    }
}


export abstract class CanBehaviorSubject<T> extends BehaviorSubject<CanSubjectData<T>> implements OnDestroy {
    constructor() {
        super({
            name: 'constructor',
            res: undefined
        });
    }

    filter(name: string): Observable<CanSubjectData<T>> {
        return this.pipe(
            filter(res => res.name === name)
        );
    }

    ngOnDestroy() {
        this.complete();
    }
}
