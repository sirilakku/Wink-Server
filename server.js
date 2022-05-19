const express = require("express")
const app = express()
const projectRoutes = require("./server/routes/ProjectRoutes")

app.use(express.json())
app.use("/api", projectRoutes)

const PORT=4000
function echoPortNumber(){
    console.log(`Listening on port ${PORT}`)
}

app.listen(PORT,echoPortNumber)