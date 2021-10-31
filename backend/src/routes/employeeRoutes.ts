import { Request, Response, Router } from "express";
import TitleController from "../controllers/titleController";
import EmployeeController from "../controllers/employeeController";

const router = Router()
const employeeController = new EmployeeController()
const titleController = new TitleController()

router.get('/:employeeId', async (req: Request, res: Response) => {
    const employee = await employeeController.getOneById(+req.params.employeeId)

    if (!employee)
        res.status(404).json({ error: "Missing User" })
    else
        res.json(employee)
})

router.get('/:employeeId/titles', async (req: Request, res: Response) => {
    const employee = await employeeController.getOneById(+req.params.employeeId)

    if (!employee)
        res.status(404).json({ error: "Missing User" })
    else
        res.json(
            await titleController.getTitlesFromEmployeeId(+req.params.employeeId)
        )
})

router.post('/add', async (req: Request, res: Response) => {
    try {
        await employeeController.create(req.body)
        res.json({
            status: "Succeded"
        })
    } catch(err) {
        res.status(400).json({
            error: err.sqlMessage
        })
    }
})

export default router