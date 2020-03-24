import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  NgModule,
  OnInit,
  ViewEncapsulation,
  ɵdetectChanges,
  ɵmarkDirty
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CdTestDirective } from './directives/cd-test.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
  // encapsulation: ViewEncapsulation.Emulated,
  // https://github.com/angular/angular/blob/master/packages/core/src/render3/interfaces/view.ts#L330
  // changeDetection: 32
})
export class AppComponent {
  title = 'renderComponentCE';

  change = true;

  constructor(private cdr: ChangeDetectorRef) {
    console.log(this.cdr);

    // Angular creates a new ChangeDetectorRef a.k.a ViewRef for every componentView.
    // Which makes sense as it isolates change detection to the view down
    // When we mark a view as as dirty markForCheck() it traverses up the view tree marking all components a dirty.
    // We can monkey patch this method and use the private api ɵmarkDirty() method as this does call scheduleTick() unlike  markForCheck()
    // (although comments suggest it is suppose to).
    // This runs change detection from this root component...performance impact?

    // we add to as an IVY feature???
    // @ts-ignore
    // this.cdr.__proto__.markForCheck = () => ɵmarkDirty(this);

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
