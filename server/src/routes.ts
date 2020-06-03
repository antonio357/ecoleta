import express from "express"

const routes = express.Router() // disattach the functionalities from the server.ts

routes.get("/", (request, response) => {
    return response.json({message: "Hello World"})
})

export default routes // so you can import to server.ts