import express from "express"
import cors from "cors"
import { createServer } from "http"
import { Server } from "socket.io"

const __cors = { origin: "*", credentials: true }
const app = express()
app.use(express.json())
app.use(cors(__cors))

const port = 5000
const server = createServer(app)
const io = new Server(server, { cors: __cors })

app.get("/", (req, res) => {
	res.send("NodeSocketServer is up and running.")
})

server.listen(port, () => {
	console.log(`Server running on port ${port}`)
})

io.on("connection", socket => {
	console.log(`Socket ${socket.id} connected`)

	socket.on("sendMessage", message => {
		console.log("MESSAGE RECEIVED:", { message })
		io.emit("message", message)
	})

	socket.on("disconnect", () => {
		console.log(`Socket ${socket.id} disconnected`)
	})
})
