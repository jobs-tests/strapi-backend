import dotenv from 'dotenv'
import path from 'path';

dotenv.config()


export const Database = {
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOSTNAME,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
    poolMin: Number(process.env.DATABASE_POOL_MIN || 0),
    poolMax: Number(process.env.DATABASE_POOL_MAX || 10),
    poolIdle: Number(process.env.DATABASE_POOL_IDLE || 10000),
}


export const Knex = {
    client: 'postgresql',
    connection: {
        host: process.env.DATABASE_HOSTNAME || Database.host,
        database: process.env.DATABASE_NAME || Database.database,
        user: process.env.DATABASE_USERNAME || Database.user,
        password: process.env.DATABASE_PASSWORD || Database.password,
        port: process.env.DATABASE_PORT || Database.port,
    },
    pool: {
        min: Number(process.env.DATABASE_POOL_MIN) || Database.poolMin,
        max: Number(process.env.DATABASE_POOL_MAX) || Database.poolMax,
        //idle: Number(process.env.DATABASE_POOL_IDLE) || Database.poolIdle,
    },
    migrations: {
        tableName: 'KnexMigrations',
        directory: path.join(__dirname, '../migrations'),

    },
    seeds: {
        directory: path.join(__dirname, '../seeds'),
    },
}
