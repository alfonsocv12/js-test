import { BehaviorSubject } from "rxjs";
import Employee from "src/app/models/employee";

class EmployeeState {
    private _employees = new BehaviorSubject<Employee[]>([]);
    
    readonly employees$ = this._employees.asObservable();

    get employees(): Employee[] {
        return this._employees.getValue()
    }

    set employees(data: Employee[]) {
        this._employees.next(data)
    }
}

export default new EmployeeState()