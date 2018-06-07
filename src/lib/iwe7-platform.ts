import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
@Injectable({
    providedIn: 'root'
})
export class Iwe7Platform extends Platform {
    // 微信
    WECHAT: boolean = this.isBrowser && /(micromessenger)\/([\w\.]+)/i.test(navigator.userAgent);
    // 支付宝
    ALIPAY: boolean = this.isBrowser && /alipay/i.test(navigator.userAgent);
    // 新浪微博
    WEIBO: boolean = this.isBrowser && /weibo/i.test(navigator.userAgent);
    // QQ, aka ShouQ
    QQ: boolean = /(QQ)\/([\d\.]+)/i.test(navigator.userAgent);
    constructor() {
        super();
    }
}
