import { Component, ViewEncapsulation, ChangeDetectorRef, ɵdetectChanges, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CdTestDirective } from './directives/cd-test.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {
  title = 'angularElements';

  change = true;

  constructor(private cdr: ChangeDetectorRef) {
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
