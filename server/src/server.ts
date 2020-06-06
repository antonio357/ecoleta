import express, { response, request } from "express" // deals with routes
import routes from './routes'
import path from 'path'
import cors from 'cors'
import { errors } from "celebrate";

const app = express()

app.use(cors())

/*
add json interpreter for express
so you when a json posted to the back-end
it can interpret
 */
app.use(express.json())

app.use(routes) // add routes to app

// express.static serve static files (files from the aplication it self) like images, pdf
app.use("/images", express.static(path.resolve(__dirname, '..', 'images')))

app.use(errors())

app.listen(3333) // selecting the port