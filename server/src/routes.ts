import express from "express"
import knex from './database/connection' // connecting the database with this route

const routes = express.Router() // disattach the functionalities from the server.ts

routes.get("/garbage", async (request, response) => {
    const garbages = await knex('garbage').select('*')
    return response.json(garbages)
})

export default routes // so you can import to server.ts