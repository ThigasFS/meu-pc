import express from "express"
import cors from "cors"
import cpuRoutes from "./routes/cpuRoutes"
import motherboardRoutes from './routes/motherboardRoutes'
import gpuRoutes from './routes/gpuRoutes'
import ramsRoutes from './routes/ramRoutes'
import storageRoutes from './routes/storageRoutes'
import "./database/connection"
import { loadAllData } from "./services/dataLoader"

const app = express()

app.use(cors())
app.use(express.json())

loadAllData()

app.use("/api/cpu", cpuRoutes)
app.use("/api/motherboard", motherboardRoutes)
app.use("/api/gpu", gpuRoutes)
app.use("/api/ram", ramsRoutes)
app.use("/api/storage", storageRoutes)

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})