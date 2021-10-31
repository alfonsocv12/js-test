import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private http: HttpClient) { }

  public async getTitlesOfEmployee(employeeId: number): Promise<Object> {
    return await this.http.get(
      `${environment.employeeApiUrl}/employee/${employeeId}/titles`
    ).toPromise()
  }
}
