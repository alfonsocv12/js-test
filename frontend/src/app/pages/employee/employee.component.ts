import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faBirthdayCake, faExclamationTriangle, faFileSignature } from '@fortawesome/free-solid-svg-icons';
import Employee from 'src/app/models/employee';
import Title from 'src/app/models/title';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { TitleService } from 'src/app/services/title/title.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  public faBirthdayCake = faBirthdayCake
  public faFileSignature = faFileSignature
  public faExclamationTriangle = faExclamationTriangle

  private employeeService = new EmployeeService(this.http)
  private titleService = new TitleService(this.http)
  public currentEmployee!: Employee;
  public employeeTitles!: Title[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  async ngOnInit(): Promise<void> {
    const routeSnap = this.route.snapshot
    this.currentEmployee = (
      await this.employeeService.getOneEmployee(routeSnap.params.empId) as Employee
    )

    this.employeeTitles = (
      await this.titleService.getTitlesOfEmployee(routeSnap.params.empId) as Title[]
    )
  }

  public backButton() {
    this.router.navigate(['/'])
  }

}
