import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Employee from 'src/app/models/employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  public async getEmployeExamples(): Promise<Object> {
    return await this.http.get(
      `${environment.employeeApiUrl}/employeesExample`
    ).toPromise()
  }

  public async createEmployee(data: Employee): Promise<Object> {
    return await this.http.post(
      `${environment.employeeApiUrl}/employee/add`, data
    ).toPromise()
  }

  public async getOneEmployee(employeeId: number): Promise<Object> {
    return await this.http.get(
      `${environment.employeeApiUrl}/employee/${employeeId}`
    ).toPromise()
  }
}
