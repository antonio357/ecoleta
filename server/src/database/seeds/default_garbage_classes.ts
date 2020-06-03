import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('garbage').insert([
        { classification: 'lamps', image: 'lamps.svg'  },
        { classification: 'batteries', image: 'batteries.svg'  },
        { classification: 'papers', image: 'papers.svg'  },
        { classification: 'electronics waste', image: 'electronics.svg'  },
        { classification: 'organics waste', image: 'organics.svg'  },
        { classification: 'cooking oils', image: 'oils.svg'  }
    ]) // insert to add rows in the table
}