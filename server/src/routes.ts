import express, { request, response } from "express";
import knex from "./database/connection"; // connecting the database with this route

const routes = express.Router(); // disattach the functionalities from the server.ts

routes.get("/garbage", async (request, response) => {
    const garbage = await knex("garbage").select("*");

    // serialized data means that the front-end will recive the data not in the original way from the database 'rawdata' but instead the data that will be send will be filtered
    const serializedGarbage = garbage.map((garbage) => {
        return {
            id: garbage.id,
            classification: garbage.classification,
            image_url: `http://localhost:3333/images/${garbage.image}`,
        };
    });
    return response.json(serializedGarbage);
});

routes.post("/locations", async (request, response) => {
    const {name, email, whatsapp, city, state_or_province, latitude, longitude, garbages} = request.body 

    /* 
    will use trx instead of knex
    cause we have two queries where the query 2 can only execute if previous query 1  was successful and
    query 1 can only execute if previous query 2 was successful 
    it makes sure the how post operation will work like {query 1 than query 2 if every query in the process works without any crashs}
     */
    const trx = await knex.transaction(); 

    // image: "none" cause the data table locations does not accept null on image_url
    // query 1
    const locationsIds = await trx('locations').insert({name, email, whatsapp, city, state_or_province, latitude, longitude, image_url: "none"}) // locationIds = array with all the new ids created at knex('locations') datatable

    const local_id = locationsIds[0]

    const localGarbage = garbages.map((garbage_id: number) => {
        return {
            garbage_id,
            local_id
        }
    })

    // query 2
    await trx('locations_with_garbage_pivot').insert(localGarbage)

    return response.json({ success: true })
})

export default routes; // so you can import to server.ts
