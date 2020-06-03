import express from "express";
import knex from "./database/connection"; // connecting the database with this route

const routes = express.Router(); // disattach the functionalities from the server.ts

routes.get("/garbage", async (request, response) => {
    const garbage = await knex("garbage").select("*");

    // serialized data means that the front-end will recive the data not in the original way from the database 'rawdata' but instead the data that will be send will be filtered
    const serializedGarbage = garbage.map((garbage) => {
        return {
            classification: garbage.classification,
            image_url: `http://localhost:3333/images/${garbage.image}`,
        };
    });
    return response.json(serializedGarbage);
});

export default routes; // so you can import to server.ts
