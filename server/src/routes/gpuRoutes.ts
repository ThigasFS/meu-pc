import { Router } from "express"
import { getGpus } from "../services/gpuService"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const gpu = await getGpus()

        res.json(gpu)
    } catch (error) {
        console.error(error)

        res.status(500).json({
            erro: "Erro ao buscar GPUs"
        })
    }
})

export default router