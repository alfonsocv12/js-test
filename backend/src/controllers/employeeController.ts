import Employee from "../entity/employee";
import { EntityTarget, getConnection } from "typeorm";

export default class EmployeeController {
    /**
     * Function dedicated to return the employees from 1 jan 1990 to 15 jan same
     * year based on the requirements for the test
     * @returns 
     */
    async getExample(): Promise<Employee[]> {
        return await getConnection()
            .getRepository(Employee)
            .createQueryBuilder()
            .where('hire_date >= :startDate', { startDate: '1990-01-01'})
            .andWhere('hire_date <= :endDate', { endDate: '1990-01-15' })
            .orderBy('last_name')
            .getMany()
    }

    /**
     * Function dedicated to return one employe by the employee id
     * @param employeeId 
     * @returns 
     */
    async getOneById(employeeId: number): Promise<Employee> {
        return await getConnection()
            .getRepository(Employee)
            .findOne({
                where: {
                    emp_no: employeeId
                }
            })
    }


    /**
     * Create a new employee
     * @param data 
     */
    async create(data: Employee): Promise<any> {
        data.emp_no = await this._getNextId()
        const employee = getConnection()
            .getRepository(Employee)
            .create(data)
        return await getConnection().manager.save(employee)

    }

    /**
     * Private function dedicated to return a number with the next id
     */
    private async _getNextId(): Promise<number> {
        const lastID = await getConnection()
            .getRepository(Employee)
            .createQueryBuilder()
            .orderBy('emp_no', 'DESC')
            .getOne()
        return lastID.emp_no + 1
    }
}