import express from "express";
import GarbagesController from './controllers/GarbagesController'
import LocationsController from './controllers/LocationsController'
import {celebrate, Joi} from 'celebrate'

import multer from "multer";
import multerConfig from "./config/multer";

const routes = express.Router(); // disattach the functionalities from the server.ts
const upload = multer(multerConfig)

const garbagesController = new GarbagesController()
const locationsController = new LocationsController()

routes.get("/garbage", garbagesController.index);
routes.get('/locations/:id', locationsController.show)
routes.get('/locations', locationsController.index)


routes.post(
    "/locations", 
    upload.single('image_url'), 
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            state_or_province: Joi.string().required().max(2),
            garbages: Joi.string().required()
        },)
    }, {abortEarly: false}),
    locationsController.create)


export default routes; // so you can import to server.ts


// pattern for controllers methods index, show, create, update, delete