import { Router } from "express"
import { getCpus } from "../services/hubs/cpu"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const cpus = await getCpus()

        res.json(cpus)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            erro: "Erro ao buscar CPUs"
        })
    }
})

export default router