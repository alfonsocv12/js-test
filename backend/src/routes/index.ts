import { Application, Request, Response } from "express";

import enmployeeRouter from './employeeRoutes'
import EmployeeController from "../controllers/employeeController";

const employeeController = new EmployeeController()

export default (app: Application) => {
    app.get('/', (req: Request, res: Response) => {
        res.json({
            works: 'yes'
        })
    })

    /**
     * Not Ideal this was required because I need to add / to the suffix of employee
     * without it the route dissapears
     */
    app.get('/employeesExample', async (req: Request, res: Response) => {
        res.json(await employeeController.getExample())
    })

    app.use('/employee', enmployeeRouter)
    
}