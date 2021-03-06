import knex from "../database/connection"; // connecting the database with this route
import {Request, Response} from 'express'

class LocationsController {
    async index(request: Request, response: Response) {
        const {city, state_or_province, garbages} = request.query
        
        const parsedGarbages = String(garbages)
        .split(',')
        .map(garbage => Number(garbage.trim()))

        const locations = await knex('locations')
        .join('locations_with_garbage_pivot', 'locations.id', '=', 'locations_with_garbage_pivot.local_id')
        .whereIn('locations_with_garbage_pivot.garbage_id', parsedGarbages)
        .where('city', String(city))
        .where('state_or_province', String(state_or_province))
        .distinct()
        .select('locations.*')
        
        const serializedLocations = locations.map((location) => {
            return {
                ...location,
                image_url: `http://192.168.25.128:3333/images/${location.image_url}`,
            };
        });
        
        return response.json(serializedLocations)
    }

    async show(request: Request, response: Response) {
        const { id } = request.params

        const location = await knex('locations').where('id', id).first()

        if (!location) {
            return response.status(400).json({message: "location not found"})
        }

        const serializedLocation = {
            ...location,
            image_url: `http://192.168.25.128:3333/images/${location.image_url}`,
        };

        /* 
        SELECT * FROM  garbage
            JOIN locations_with_garbage_pivot ON garbage.id = locations_with_garbage_pivot.garbage_id
            WHERE locations_with_garbage_pivot.local_id = {id}
        */
        const garbages = await knex('garbage')
        .join('locations_with_garbage_pivot', 'garbage.id', '=', 'locations_with_garbage_pivot.garbage_id')
        .where('locations_with_garbage_pivot.local_id', id)
        .select('garbage.classification')

        return response.json({
            garbages,
            location: serializedLocation
        })
    }

    async create(request: Request, response: Response) {
        const {name, 
            email, 
            whatsapp, 
            city, 
            state_or_province, 
            latitude, 
            longitude, 
            garbages} = request.body 
    
        /* 
        will use trx instead of knex
        cause we have two queries where the query 2 can only execute if previous query 1  was successful and
        query 1 can only execute if previous query 2 was successful 
        it makes sure the how post operation will work like {query 1 than query 2 if every query in the process works without any crashs}
         */
        const trx = await knex.transaction() // trx
        
        const location = {name, 
            email, 
            whatsapp, 
            city, 
            state_or_province, 
            latitude, 
            longitude, 
            image_url: request.file.filename}

        // image: "none" cause the data table locations does not accept null on image_url
        // query 1
        const locationsIds = await trx('locations').insert(location) // locationIds = array with all the new ids created at knex('locations') datatable
    
        const local_id = locationsIds[0]
    
        const localGarbage = garbages
        .split(',')
        .map((item : string) => Number(item.trim()))
        .map((garbage_id: number) => {
            return {
                garbage_id,
                local_id
            }
        })
    
        // query 2
        await trx('locations_with_garbage_pivot').insert(localGarbage)
        
        await trx.commit() // trx // make the queries get done without it it does not works

        return response.json({
            id: local_id,
            ...location
        })
    }
}

export default LocationsController