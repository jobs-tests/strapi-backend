import { Knex } from "knex";


export async function up(knex: Knex): Promise<void[]> {
    return Promise.all([
        knex.schema.createTable('planet', table => {
            table.increments("id");
            table.string("name").notNullable().unique();
            table.string("code").notNullable().unique();
        }),
        knex.schema.createTable('space_center', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string("uid").notNullable().unique();
            table.string("description", 500).notNullable().unique();
            table.float("latitude").notNullable();
            table.float("longitude").notNullable();
            table.string('planet_code').notNullable().references("planet.code");
        }),

        knex.schema.createTable('flight', (table) => {
            table.increments('id').primary();
            table.string('code').notNullable().unique();
            table.datetime('departure_at').notNullable();
            table.integer('seat_count').unsigned().notNullable();
            table.string('launch_site').notNullable().references("space_center.uid");
            table.string('landing_site').notNullable().references("space_center.uid");
        }),

        knex.schema.createTable('booking', (table) => {
            table.increments('id').primary();
            table.string('code').notNullable().unique();
            table.string('flight_code').notNullable().references("flight_code");
            table.datetime('booking_time').notNullable();
            table.string('name').notNullable();
            table.string('email').notNullable();
        })

    ]);
}


export async function down(knex: Knex): Promise<void[]> {
    return Promise.all([
        knex.schema.dropTable('booking'),
        knex.schema.dropTable('flight'),
        knex.schema.dropTable('space_center'),
        knex.schema.dropTable('planet'),
    ]);
}

