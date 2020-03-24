import { ChangeDetectorRef, Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCdTest]'
})
export class CdTestDirective {
  private view: EmbeddedViewRef<any>;
  private hasView = false;
  @Input() set appCdTest(condition: boolean) {
    if (!condition && !this.hasView) {
      this.view = this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;

      setTimeout(() => {
        this.view.context['$implicit'] = `${Math.random()}`;
        this.cdr.markForCheck();
      }, 3000);
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) {
    console.log('CdTestDirective loaded');
  }
}
