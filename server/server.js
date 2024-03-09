import express, { json } from "express"
import dotenv from "dotenv"
import cors from "cors"

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 7777

app.get("/" , (req, res) => {
  res.send("Hello Shiva")
})

app.listen(port, () => {
  console.log(`App is running on port http://localhost:${port}`)
})