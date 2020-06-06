import express from "express";
import GarbagesController from './controllers/GarbagesController'
import LocationsController from './controllers/LocationsController'

import multer from "multer";
import multerConfig from "./config/multer";

const routes = express.Router(); // disattach the functionalities from the server.ts
const upload = multer(multerConfig)

const garbagesController = new GarbagesController()
const locationsController = new LocationsController()

routes.get("/garbage", garbagesController.index);
routes.get('/locations/:id', locationsController.show)
routes.get('/locations', locationsController.index)


routes.post("/locations", upload.single('image_url'), locationsController.create)


export default routes; // so you can import to server.ts


// pattern for controllers methods index, show, create, update, delete