import Knex from 'knex'

const tableName = 'garbage'

export async function up(knex: Knex) {
    return knex.schema.createTable(tableName, table => {
        table.increments("id").primary();
        table.string('classification').notNullable(); 
        table.string('image').notNullable(); 
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(tableName)
}