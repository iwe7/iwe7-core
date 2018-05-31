import { DomPortalHost, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import {
    Injectable, Optional,
    Inject, ComponentFactoryResolver,
    Injector,
    ApplicationRef,
    ɵComponentType as ComponentType,
    ViewContainerRef,
    ComponentRef,
    TemplateRef,
    EmbeddedViewRef
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { throwContentAlreadyAttachedError } from './util';

@Injectable({
    providedIn: 'root'
})
export class Iwe7DomService {
    private element: HTMLElement;
    private _portalHost: DomPortalHost;
    private _viewContainerRef: ViewContainerRef;
    constructor(
        @Optional()
        @Inject(DOCUMENT) public _doc: Document,
        public componentFactoryResolver: ComponentFactoryResolver,
        public injector: Injector,
        public appRef: ApplicationRef,
    ) {
        this.element = document.createElement('div');
        document.body.appendChild(this.element);
        this._portalHost = new DomPortalHost(this.element, this.componentFactoryResolver, this.appRef, this.injector);
        console.log(this._portalHost);
    }

    attachComponent<T>(
        componentType: ComponentType<T>,
        viewContainerRef?: ViewContainerRef,
        injector?: Injector
    ): ComponentRef<T> {
        return this.attachComponentPortal(
            this.createComponentPortal(componentType)
        );
    }

    attachTemplate<C>(
        template: TemplateRef<C>,
        viewContainerRef?: ViewContainerRef,
        context?: C
    ): EmbeddedViewRef<C> {
        return this.attachTemplatePortal(
            this.createTemplatePortal(template)
        );
    }

    private createComponentPortal<T>(
        componentType: ComponentType<T>,
        viewContainerRef?: ViewContainerRef,
        injector?: Injector
    ): ComponentPortal<T> {
        return new ComponentPortal(
            componentType,
            viewContainerRef || this._viewContainerRef,
            injector || this.injector
        );
    }

    private createTemplatePortal<C>(
        template: TemplateRef<C>,
        viewContainerRef?: ViewContainerRef,
        context?: C
    ): TemplatePortal<C> {
        return new TemplatePortal(template, viewContainerRef || this._viewContainerRef, context);
    }

    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        if (this._portalHost.hasAttached()) {
            throwContentAlreadyAttachedError();
        }
        return this._portalHost.attachComponentPortal(portal);
    }

    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        if (this._portalHost.hasAttached()) {
            throwContentAlreadyAttachedError();
        }
        return this._portalHost.attachTemplatePortal(portal);
    }
}
