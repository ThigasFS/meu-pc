import { Router } from "express"
import { getCPUs } from "../services/cpuService"

const router = Router()

router.get("/", async (_req, res) => {
    try {
        const cpus = await getCPUs()

        res.json(cpus)
    } catch (error) {
        console.error("Erro ao obter CPUs:", error)

        res.status(500).json({
            error: "Erro ao obter CPUs"
        })
    }
})

export default router