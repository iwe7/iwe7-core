import { BehaviorSubject } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';

// 显示隐藏状态切换控制
@Injectable()
export class CoreShowHide extends BehaviorSubject<boolean> implements OnDestroy {
    private _show: boolean = false;
    constructor() {
        super(false);
    }
    show() {
        this._show = true;
        this.next(this._show);
    }
    hide() {
        this._show = false;
        this.next(this._show);
    }
    switch() {
        this._show = !this._show;
        this.next(this._show);
    }
    ngOnDestroy() {
        this.complete();
    }
}
