import { Component, ViewEncapsulation, NgModule, ɵdetectChanges } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CdTestDirective } from './directives/cd-test.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
  // encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent {
  title = 'renderComponentCE';

  change = true;

  constructor() {
    setTimeout(() => {
      this.change = false;
      ɵdetectChanges(this);
    }, 2000);
  }
  manualTrigger() {
    ɵdetectChanges(this);
  }
}

@NgModule({
  declarations: [AppComponent, CdTestDirective],
  imports: [BrowserModule],
  providers: []
})
export class AppModule {}
