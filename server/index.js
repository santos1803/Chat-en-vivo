import express from "express"
import logger from "morgan"
import dotenv from "dotenv"
import { createClient } from "@libsql/client"

import { Server } from "socket.io"
import {createServer} from "node:http"

const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {
        
    }
})


const db = createClient({
    url:"libsql://wanted-bloodscream-santos1803.turso.io",
    authToken: process.env.DB_TOKEN
})

await db.execute (` 
CREATE TABLE IF NOT EXISTS users (



`)


io.on("connection", (socket)=>{
    console.log("Un usuario se ha conectado")

    socket.on("disconnect", () =>{
        console.log("Un usuario se ha desconectado")
    })

    socket.on("chat message", (msg)=> {
        io.emit("chat message", msg)
    })
})

app.use(logger("dev"))

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/client/index.html")
})

server.listen(port, ()=>{
    console.log(`Server runing on port ${port}`)
})