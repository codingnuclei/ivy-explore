import { ɵdetectChanges, ɵrenderComponent } from '@angular/core';
import { EventManager, ɵDomEventsPlugin, ɵDomSharedStylesHost, ɵDomRendererFactory2 } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CustomDomRendererFactory2 } from './custom/customDomRendererFactory2';

export class HelloWorldElement extends HTMLElement {
  static get observedAttributes() {
    return ['title'] as Array<keyof AppComponent>;
  }

  private component: AppComponent;

  constructor() {
    super();
    // renderComponent$1 calls `rendererFactory.createRenderer` for host renderer and then again for `createRootComponentView`
    // ɵDomRendererFactory2 for components with `ViewEncapsulation.Emulated` stores a reference to a renderer and
    // if the component already has a renderer it returns that renderer instead of creating a new one

    // ###
    // the above is not the same for `ViewEncapsulation.Native` or `ViewEncapsulation.ShadowDom`
    // Thus we get an error when two shadowDoms get attached

    this.component = ɵrenderComponent(AppComponent, {
      host: this,
      rendererFactory: new CustomDomRendererFactory2(
        new EventManager([new ɵDomEventsPlugin(document)], null),
        new ɵDomSharedStylesHost(document),
        null
      )

      // Uncomment to see this work fine with Emulated components, and note that here we use the normal ɵDomRendererFactory2
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
        this.component.title = newValue;
        break;
    }
  }

  get title(): string {
    return this.component.title;
  }
  set title(value: string) {
    this.component.title = value;
    ɵdetectChanges(this.component);
  }
}
