import express from "express"

const app = express()

app.get("/users", (request, response) => {
    console.log("users list")

    response.json([
        "antonio",
        "jose",
        "emanuel",
        "karla",
        "ribamar"
    ])
})

app.listen(3333)