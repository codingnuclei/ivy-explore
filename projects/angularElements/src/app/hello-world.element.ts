import { NgElementConstructor } from '@angular/elements';

import { createCustomIvyElement } from '../create-custom-ivy-element';
import { AppComponent } from './app.component';

export const HelloWorldElement: NgElementConstructor<AppComponent> = createCustomIvyElement(AppComponent);
