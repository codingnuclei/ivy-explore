import {
  ɵdetectChanges,
  ɵrenderComponent,
  Injector,
  ApplicationRef,
  ComponentFactoryResolver,
  RendererFactory2
} from '@angular/core';
import { AppComponent } from './app.component';
import { ɵDomRendererFactory2, EventManager, ɵDomEventsPlugin, ɵDomSharedStylesHost } from '@angular/platform-browser';
import { CustomDomRendererFactory2 } from './custom/customDomRendererFactory2';

export class HelloWorldElement extends HTMLElement {
  static get observedAttributes() {
    return ['title'] as Array<keyof AppComponent>;
  }

  private component: AppComponent;

  constructor() {
    super();

    //  renderComponent$1 calls `rendererFactory.createRenderer` for host renderer and then again for `createRootComponentView`
    //  ɵDomRendererFactory2 for components with `ViewEncapsulation.Emulated` stores a reference to a components renderer
    // `let renderer = this.rendererByCompId.get(type.id);`
    // if the component already has a renderer it returns that renderer instead of creating a new one
    // ###
    // the above is not the same for `ViewEncapsulation.Native` or `ViewEncapsulation.ShadowDom`
    // Thus we get an error when two shadowDoms get attached
    // ###
    // To test go to the app.component and change ViewEncapsulation. Works for Emulated not for ShadowDom && Native
    // Solution: add the same logic as emulated => use CustomDomRendererFactory2 below

    this.component = ɵrenderComponent(AppComponent, {
      host: this,
      // injector: rootInjector,
      rendererFactory: new CustomDomRendererFactory2(
        new EventManager([new ɵDomEventsPlugin(document)], null),
        new ɵDomSharedStylesHost(document),
        null
      )

      // rendererFactory: new ɵDomRendererFactory2(
      //   new EventManager([new ɵDomEventsPlugin(document)], null),
      //   new ɵDomSharedStylesHost(document),
      //   null
      // )
    });
  }

  attributeChangedCallback(name: keyof AppComponent, oldValue: any, newValue: any) {
    switch (name) {
      case 'title':
        this.label = newValue;

        break;
    }
  }

  get label(): string {
    return this.component.title;
  }
  set label(value: string) {
    this.component.title = value;
    ɵdetectChanges(this.component);
  }
}
