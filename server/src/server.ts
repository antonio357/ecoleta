import express, { request, response } from "express" // deals with routes

const app = express()

/*
add json interpreter for express
so you when a json posted to the back-end
it can interpret
 */
app.use(express.json())

// route: request full adress
    // resource: system entity being accessed 

/* http requests */
// GET: search infos from back-end
// POST: create a new info int the back-end 
// PUT: update an info from back-end
// DELETE: remove an info from back-end

/*
 obs: browser only knows GET 
 so how so you need a third party aplication like Insomnia
 so you can see and test the others requests including get itself
*/

/* 
{request param ':requestparam'} are the params that comes written in the route that identifies a resource 
{Query Param '?queryparam'} are 'usually optional' params that comes written in the route for filters and pagination
{Request Body} for cration or update of infos 
*/
/* http requests */

const users = [
    "antonio carlos",
    "jose carlos",
    "emanuel carlos",
    "karla",
    "ribamar"
]

app.get("/users", (request, response) => {
    const search = request.query.search ? String(request.query.search) : ''
    const filteredUsers = search ? users.filter(user => user.includes(search)) : users
    return response.json(filteredUsers)
})

app.get("/users/:id", (request, response) => { 
    // : means a parameter
    const id = request.params.id
    const user = users[Number(id)]
    response.json(user)
})

app.post("/users", (request, response) => {
    const data = request.body
    console.log("data", data)

    const user = {
        name: data.name,
        email: data.email
    }

    users.push(user.name)

    return response.json(user)
})

app.listen(3333) // selecting the port