/* tslint:disable await-promise */
import Knex from 'knex'

import { Database } from '../config'

/**
 * Initialize a new Postgres provider
 */
export async function create() {
    const knex = Knex({
        client: 'postgresql',
        connection: {
            user: Database.user,
            password: Database.password,
            host: Database.host,
            port: Database.port,
            database: Database.database
        },
        pool: {
            min: Database.poolMin,
            max: Database.poolMax,
            //idleTimeoutMillis: Database.poolIdle
        },
        acquireConnectionTimeout: 2000
    })

    // Verify the connection before proceeding
    try {
        await knex.raw('SELECT now()')

        return knex
    } catch (error) {
        throw new Error('Unable to connect to Postgres via Knex. Ensure a valid connection.')
    }
}
