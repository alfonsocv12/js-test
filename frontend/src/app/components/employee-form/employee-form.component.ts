import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { componentData } from 'src/app/pages/base/base.types';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import employeeState from 'src/app/services/employee/employee.state';
import { EmployeeListComponent } from '../employee-list/employee-list.component';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  public employeeForm = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    hire_date: ['', Validators.required],
    birth_date: ['', Validators.required],
    gender: ['']
  })
  private employeeService = new EmployeeService(this.http)
  @Output() changeComponent: EventEmitter<componentData> = new EventEmitter()

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    
  }

  public async submit(): Promise<void> {
    console.log(this.employeeForm.valid)
    if(this.employeeForm.valid) {
      const resp: any = await this.employeeService.createEmployee({
        first_name: (this.employeeForm.get('first_name')!.value as string),
        last_name: (this.employeeForm.get('last_name')!.value as string),
        hire_date: (this.employeeForm.get('hire_date')!.value as Date),
        birth_date: (this.employeeForm.get('birth_date')!.value as Date),
        gender: (this.employeeForm.get('gender')!.value as string),
      })
      
      if(resp.status === 'Succeded') {
        employeeState.employees = []
        this.changeComponent.emit({
          section: 0,
          component: EmployeeListComponent
        })
      }
    }
  }
}
