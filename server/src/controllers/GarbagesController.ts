import {Request, Response} from 'express'
import knex from '../database/connection'

class GarbagesController {
    async index(request: Request, response: Response) {
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
    }
}

export default GarbagesController