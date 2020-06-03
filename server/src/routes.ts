import express from "express";
import GarbagesController from './controllers/GarbagesController'
import LocationsController from './controllers/LocationsController'
import knex from "./database/connection"; // connecting the database with this route

const routes = express.Router(); // disattach the functionalities from the server.ts

const garbagesController = new GarbagesController()
const locationsController = new LocationsController()

routes.get("/garbage", garbagesController.index);

routes.post("/locations", locationsController.create)

routes.get('/locations/:id', locationsController.show)

export default routes; // so you can import to server.ts


// pattern for controllers methods index, show, create, update, delete