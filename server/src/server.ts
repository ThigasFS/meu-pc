import express from "express"
import cors from "cors"
import cpuRoutes from "./routes/cpuRoutes"
import { loadAllData } from "./services/dataLoader"
import "./database/connection"

const app = express()

app.use(cors())
app.use(express.json())

loadAllData()

app.use("/api/cpu", cpuRoutes)

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})