import { ChangeDetectorRef, Component, NgModule, ViewEncapsulation, ɵdetectChanges, ɵmarkDirty } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CdTestDirective } from './directives/cd-test.directive';
import { NestedComponentComponent } from './nested-component/nested-component.component';

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
    // Angular creates a new ChangeDetectorRef a.k.a ViewRef for every componentView.
    // Which makes sense as it isolates change detection to the view down
    // When we mark a view as markForCheck(), it traverses up the view tree marking all components as dirty.
    // We can monkey patch this method and use the private api ɵmarkDirty() method instead.
    // This calls scheduleTick() unlike markForCheck() (although comments suggest it is suppose to).
    // This runs change detection from this root component?
    // Possibly we add to as an IVY feature???

    // @ts-ignore
    this.cdr.__proto__.markForCheck = () => ɵmarkDirty(this);
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
  declarations: [AppComponent, CdTestDirective, NestedComponentComponent],
  imports: [BrowserModule],
  providers: []
})
export class AppModule {}
