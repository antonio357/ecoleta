import knex from "../database/connection"; // connecting the database with this route
import {Request, Response} from 'express'

class LocationsController {
    async show(request: Request, response: Response) {
        const { id } = request.params

        const location = await knex('locations').where('id', id).first()

        if (!location) {
            return response.status(400).json({message: "location not found"})
        }

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
            location
        })
    }

    async create(request: Request, response: Response) {
        const {name, email, whatsapp, city, state_or_province, latitude, longitude, garbages} = request.body 
    
        /* 
        will use trx instead of knex
        cause we have two queries where the query 2 can only execute if previous query 1  was successful and
        query 1 can only execute if previous query 2 was successful 
        it makes sure the how post operation will work like {query 1 than query 2 if every query in the process works without any crashs}
         */
        // const trx = await knex.transaction() // this is generating a bug
        
        const location = {name, email, whatsapp, city, state_or_province, latitude, longitude, image_url: "none"}

        // image: "none" cause the data table locations does not accept null on image_url
        // query 1
        const locationsIds = await knex('locations').insert(location) // locationIds = array with all the new ids created at knex('locations') datatable
    
        const local_id = locationsIds[0]
    
        const localGarbage = garbages.map((garbage_id: number) => {
            return {
                garbage_id,
                local_id
            }
        })
    
        // query 2
        await knex('locations_with_garbage_pivot').insert(localGarbage)
    
        return response.json({
            id: local_id,
            ...location
        })
    }
}

export default LocationsController