import http from "http"
import fs from "fs/promises"
import { Users } from "./interfaces/Users.js";
import dotenv from "dotenv";
dotenv.config();

const port = Number(process.env.PORT) || 8000;


const server = http.createServer(async (req, res) => {

    if (req.url === "/users") {

        try {

            const data = await fs.readFile("./mock-users.json", "utf-8")

            const users: Users[] = JSON.parse(data)

            res.writeHead(200, {
                "Content-Type": "application/json"
            })

            res.end(JSON.stringify(users))

        } catch (error) {
            console.error("ERROR:", error);
            res.writeHead(500)

            res.end("Server Error")
        }
    }
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})