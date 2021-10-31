import Title from "../entity/title";
import { getConnection } from "typeorm";

export default class TitleController {
    async getTitlesFromEmployeeId(employeeId: number): Promise<Title[]> {
        return await getConnection()
            .getRepository(Title)
            .find({
                where: {
                    emp_no: employeeId
                }
            })
    }
}