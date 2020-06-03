// knex is an database instance acess

/* 
Knex (in upperCase) means the type of variable 
different from knex (in lowerCase) means the variable
*/
import Knex from 'knex';

const tableName = 'locations'

// CREATE INFO in TABLE
export async function up(knex: Knex) { // especifying the type of the variable using typescript allows the intelliSense on the IDE
    return knex.schema.createTable(tableName, table => { // table is the reference to the table 
        table.increments("id").primary();
        /* 
        id is gona be the name of the column 
        every time increments is called it return a number from a global and then increments this number 
        primary means that this will be used as the primary key of the table 
        */
       table.string('name').notNullable(); 
       // string means the data will be saved as string
       // notNullable means it has to have a value
       table.string('email').notNullable();
       table.string('whatsapp'); // it may be notNullable
       table.string('city').notNullable(); 
       table.string('state_or_province').notNullable();
       table.decimal('latitude').notNullable();
       table.decimal('longitude').notNullable();
       table.string('image_url').notNullable(); 
    });
}

// DELETE INFO in TABLE in case you created the table in with wrong data
export async function down(knex: Knex) {
    return knex.schema.dropTable(tableName);
}