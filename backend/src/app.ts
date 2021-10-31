import express, { Application } from "express";
import router from './routes'
import cors from 'cors';
import { createConnection } from "typeorm";
import { dbConfig } from "./config";

(async function init() {
    const app: Application = express()

    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.use(cors())
    router(app)

    await createConnection({
        type: "mysql",
        synchronize: false,
        ...dbConfig
    })

    app.listen(3000, () => {
        console.log('Listening on port 3000');
    })
})()

