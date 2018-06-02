import { inject } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import {
    ViewChild, ComponentRef,
    EmbeddedViewRef, ElementRef,
    Injector, ɵComponentType as ComponentType,
    ViewContainerRef, TemplateRef, AfterViewInit,
    ComponentFactoryResolver, ApplicationRef, Renderer2
} from '@angular/core';
import {
    BasePortalOutlet, PortalHostDirective,
    ComponentPortal, TemplatePortal, DomPortalHost,
    Portal
} from '@angular/cdk/portal';

import { throwContentAlreadyAttachedError } from './util';

export class ElementRefPortal<T> extends Portal<T> {
    constructor(public ele: Element, public outletElement?: Element) {
        super();
    }
}

export class StringPortal<T> extends Portal<T> {
    constructor(
        public str: string,
        public outlet: string | Element = 'span',
        public classObj: { [key: string]: boolean } = {},
        public styleObj: { [key: string]: any } = {}
    ) {
        super();
    }
}


export abstract class CorePortalOutlet extends BasePortalOutlet {
    attach(portal: Portal<any>): any {
        if (portal instanceof ComponentPortal || portal instanceof TemplatePortal) {
            return super.attach(portal);
        } else if (portal instanceof ElementRefPortal) {
            return this.attachmentElementRefPortal(portal);
        } else if (portal instanceof StringPortal) {
            return this.attachStringPortal(portal);
        } else {
            return this.attachmentOther(portal);
        }
    }
    abstract attachStringPortal<T>(portal: StringPortal<T>): any;
    abstract attachmentOther<T>(portal: Portal<any>): any;
    abstract attachmentElementRefPortal<T>(portal: ElementRefPortal<T>): Element;
}

export class CoreDomPortalHost extends CorePortalOutlet {
    public elementRef: ElementRef;
    public componentFactoryResolver: ComponentFactoryResolver;
    public appRef: ApplicationRef;
    public render: Renderer2;
    public doc: Document;
    constructor(
        public injector: Injector,
        public outletElement: HTMLElement
    ) {
        super();
        this.elementRef = this.injector.get(ElementRef);
        this.appRef = this.injector.get(ApplicationRef);
        this.componentFactoryResolver = this.injector.get(ComponentFactoryResolver);
        this.render = this.injector.get(Renderer2);
        this.doc = this.injector.get(DOCUMENT);
    }
    attachmentOther<T>(portal: Portal<any>): Portal<any> {
        return portal;
    }
    attachStringPortal<T>(portal: StringPortal<any>): Element {
        let span: Element;
        if (portal.outlet) {
            if (typeof portal.outlet === 'string') {
                span = this.render.createElement(portal.outlet);
            } else {
                span = portal.outlet;
            }
        } else {
            span = this.render.createElement('span');
        }
        for (const key in portal.classObj) {
            if (portal.classObj[key]) {
                this.render.addClass(span, key);
            } else {
                this.render.removeClass(span, key);
            }
        }
        for (const key in portal.styleObj) {
            this.render.setStyle(span, key, portal.styleObj[key]);
        }
        span.innerHTML = portal.str;
        this.render.appendChild(this.outletElement, span);
        return span;
    }
    attachmentElementRefPortal<T>(portal: ElementRefPortal<T>): Element {
        if (portal.outletElement) {
            this.render.appendChild(portal.outletElement, portal.ele);
        } else {
            this.render.appendChild(this.outletElement, portal.ele);
        }
        return portal.ele;
    }
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(portal.component);
        let componentRef: ComponentRef<T>;
        if (portal.viewContainerRef) {
            componentRef = portal.viewContainerRef.createComponent(
                componentFactory,
                portal.viewContainerRef.length,
                portal.injector || portal.viewContainerRef.parentInjector);
            this.setDisposeFn(() => componentRef.destroy());
        } else {
            componentRef = componentFactory.create(portal.injector || this.injector);
            this.appRef.attachView(componentRef.hostView);
            this.setDisposeFn(() => {
                this.appRef.detachView(componentRef.hostView);
                componentRef.destroy();
            });
        }
        this.outletElement.appendChild(this._getComponentRootNode(componentRef));
        return componentRef;
    }
    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        const viewContainer = portal.viewContainerRef;
        const viewRef = viewContainer.createEmbeddedView(portal.templateRef, portal.context);
        viewRef.detectChanges();
        viewRef.rootNodes.forEach(rootNode => this.outletElement.appendChild(rootNode));
        this.setDisposeFn((() => {
            const index = viewContainer.indexOf(viewRef);
            if (index !== -1) {
                viewContainer.remove(index);
            }
        }));
        return viewRef;
    }

    dispose(): void {
        super.dispose();
        if (this.outletElement.parentNode != null) {
            this.outletElement.parentNode.removeChild(this.outletElement);
        }
    }
    private _getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
        return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }
}
