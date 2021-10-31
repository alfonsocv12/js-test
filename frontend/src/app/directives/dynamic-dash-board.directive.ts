import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDirective]'
})
export class DynamicDashBoardDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
