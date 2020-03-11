import { enableProdMode } from '@angular/core';
import { HelloWorldElement } from './app/hello-world.element';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

customElements.define('h-w', HelloWorldElement);
