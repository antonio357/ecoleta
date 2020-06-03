import Knex from 'knex'

const tableName = 'locations_with_garbage_pivot'

export async function up(knex: Knex) {
    return knex.schema.createTable(tableName, table => {
        table.increments("id").primary();
        table.integer('local_id').notNullable()
        .references('id') // foreign key
        .inTable('locations'); // foreign table
        table.integer('garbage_id').notNullable()
        .references('id')
        .inTable('garbage'); 
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(tableName)
}