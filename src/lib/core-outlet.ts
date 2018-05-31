import { inject } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import {
    ViewChild, ComponentRef,
    EmbeddedViewRef, ElementRef,
    Injector, ɵComponentType as ComponentType,
    ViewContainerRef, TemplateRef, AfterViewInit,
    ComponentFactoryResolver, ApplicationRef
} from '@angular/core';
import {
    BasePortalOutlet, PortalHostDirective,
    ComponentPortal, TemplatePortal, DomPortalHost,
    Portal
} from '@angular/cdk/portal';

import { throwContentAlreadyAttachedError } from './util';

export abstract class CoreOutlet extends BasePortalOutlet {
    host: BasePortalOutlet;
    viewContainerRef: ViewContainerRef;
    constructor(public injector: Injector) {
        super();
        this.viewContainerRef = this.injector.get(ViewContainerRef);
    }

    attachComponent<T>(
        componentType: ComponentType<T>,
        viewContainerRef?: ViewContainerRef,
        injector?: Injector
    ): ComponentRef<T> {
        return this.attachComponentPortal(
            this.createComponentPortal(componentType, viewContainerRef, injector)
        );
    }

    attachTemplate<C>(
        template: TemplateRef<C>,
        viewContainerRef?: ViewContainerRef,
        context?: C
    ): EmbeddedViewRef<C> {
        return this.attachTemplatePortal(
            this.createTemplatePortal(template, viewContainerRef, context)
        );
    }

    createComponentPortal<T>(
        componentType: ComponentType<T>,
        viewContainerRef?: ViewContainerRef,
        injector?: Injector
    ): ComponentPortal<T> {
        return new ComponentPortal(
            componentType,
            viewContainerRef || this.viewContainerRef,
            injector || this.injector
        );
    }

    createTemplatePortal<C>(
        template: TemplateRef<C>,
        viewContainerRef?: ViewContainerRef,
        context?: C
    ): TemplatePortal<C> {
        return new TemplatePortal(template, viewContainerRef || this.viewContainerRef, context);
    }

    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        if (this.host.hasAttached()) {
            throwContentAlreadyAttachedError();
        }
        return this.host.attachComponentPortal(portal);
    }

    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        if (this.host.hasAttached()) {
            throwContentAlreadyAttachedError();
        }
        return this.host.attachTemplatePortal(portal);
    }
}

export abstract class CoreElementOutlet extends CoreOutlet {
    public componentFactoryResolver: ComponentFactoryResolver;
    public appRef: ApplicationRef;
    public ele: ElementRef;
    constructor(injector: Injector) {
        super(injector);
        this.componentFactoryResolver = this.injector.get(ComponentFactoryResolver);
        this.appRef = this.injector.get(ApplicationRef);
        this.ele = this.injector.get(ElementRef);
        this.host = new DomPortalHost(this.ele.nativeElement, this.componentFactoryResolver, this.appRef, this.injector);
    }
}

export abstract class DirectiveOutlet extends CoreElementOutlet {
    constructor(
        injector: Injector
    ) {
        super(injector);
    }
}

export abstract class ComponentOutlet extends DirectiveOutlet {
    constructor(
        injector: Injector
    ) {
        super(injector);
    }
}

export abstract class CoreRootDivOutlet extends CoreOutlet implements AfterViewInit {
    public componentFactoryResolver: ComponentFactoryResolver;
    public appRef: ApplicationRef;
    constructor(injector: Injector) {
        super(injector);
        this.componentFactoryResolver = this.injector.get(ComponentFactoryResolver);
        this.appRef = this.injector.get(ApplicationRef);
    }
    ngAfterViewInit() {
        if (!this.host) {
            const element = document.createElement('div');
            document.body.appendChild(element);
            this.host = new DomPortalHost(element, this.componentFactoryResolver, this.appRef, this.injector);
        }
    }
}

export abstract class CoreCdkOutlet extends CoreRootDivOutlet {
    @ViewChild(PortalHostDirective)
    set _portalHost(val: PortalHostDirective) {
        this.host = val;
    }
    get _portalHost() {
        return this.host as PortalHostDirective;
    }
    constructor(
        injector: Injector
    ) {
        super(injector);
    }
}
