import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { EmployeeFormComponent } from 'src/app/components/employee-form/employee-form.component';
import { EmployeeListComponent } from 'src/app/components/employee-list/employee-list.component';
import { DynamicDashBoardDirective } from 'src/app/directives/dynamic-dash-board.directive';
import { componentData } from './base.types';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  private bodys: componentData[] = [
    {
      section: 1,
      component: EmployeeListComponent
    },
    {
      section: 2,
      component: EmployeeFormComponent
    }
  ]
  public selectedBody: componentData = this.bodys[0]

  @ViewChild(
    DynamicDashBoardDirective, { static: true }
  ) appDirective!: DynamicDashBoardDirective

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.loadComponent(this.selectedBody.component, this.selectedBody.data)
  }

  private loadComponent(
    component: any, data: unknown | Record<string, unknown> = {}
  ): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      component
    )
    
    const viewContainerRef = this.appDirective.viewContainerRef;
    
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<any>(componentFactory);
    componentRef.instance.data = data;
    this._assignCustomComponent(
      componentRef.instance.changeComponent
    )
  }

  private _assignCustomComponent(event: any): void {
    if (event) {
      event.subscribe((customComponent: componentData) => {
        this.selectedBody = customComponent
        this.loadComponent(customComponent.component, customComponent.data)
      })
    }
  }

  public changeBody(index: number): void {
    this.selectedBody = this.bodys[index]

    this.loadComponent(this.selectedBody.component, this.selectedBody.data)
  }
}
