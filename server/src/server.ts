import express, { request, response, json } from "express" // deals with routes
import routes from './routes'

const app = express()

/*
add json interpreter for express
so you when a json posted to the back-end
it can interpret
 */
app.use(express.json())

app.use(routes) // add routes to app

app.listen(3333) // selecting the port