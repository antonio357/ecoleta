/*
write queris in knex so it 
does not need to use sql notation
you just wirte everything in javascript instead
 */
import knex from "knex"
import path from "path" // normalize the path so it gets translated for any operating system

// database configuration
const connection = knex({ // metodo do diego
    client: "sqlite3",
    connection: {
        // __dirname means the directory that this file is
        // database.sqlite file that will be crated
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault: true
});

export default connection;

/* 
Migrations from knex: is a database history
that allows many developers to merge their database tables
when they need to share their database
*/