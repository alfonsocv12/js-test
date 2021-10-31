import env from '../env'

export const dbConfig: Record<string, unknown> = {
    host: env.host,
    port: env.port,
    username: env.username,
    password: env.password,
    database: env.database,
    logging: false,
    entities: [
        "src/entity/**/*.ts"
    ],
    migrations: [
        "src/migration/**/*.ts"
    ],
    subscribers: [
        "src/subscriber/**/*.ts"
    ],
    cli: {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
}