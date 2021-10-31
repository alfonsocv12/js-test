import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Employee from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import employeeState from 'src/app/services/employee/employee.state';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  private employeeService = new EmployeeService(this.http)
  public employees = employeeState.employees

  constructor(private router: Router, private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    if(this.employees.length === 0) {
      this.employees = (await this.employeeService.getEmployeExamples() as Employee[])
    }
  }

  /**
   * Function dedicated to load one employee
   * @param employee 
   */
  public selectOneEmployee(employee: any) {
    console.log(employee)
    this.router.navigate(['/employee', employee.emp_no])
    
  }
}
