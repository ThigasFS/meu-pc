import express from "express"
import cors from "cors"
import cpuRoutes from "./routes/cpuRoutes"
import motherboardRoutes from './routes/motherboardRoutes'
import "./database/connection"
import { loadAllData } from "./services/dataLoader"

const app = express()

app.use(cors())
app.use(express.json())

loadAllData()

app.use("/api/cpu", cpuRoutes)
app.use("/api/motherboard", motherboardRoutes)

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})