import './config/env'
import express from 'express'
import cors from 'cors'
import cpuRoutes from './routes/cpuRoutes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/cpus', cpuRoutes)

app.listen(3000, () => {
    console.log('API rodando na porta: 3000')
})