import { Router, Request, Response } from "express"

import {
    getDataset,
    getDatasetCategories,
    getDatasetByCategory,
    getDatasetRecord
} from "../services/datasetService"

const router = Router()

router.get("/", async (req: Request, res: Response) => {
    try {
        const dataset = await getDataset()

        res.json(dataset)
    } catch (error) {
        console.error("Erro ao carregar dataset:", error)

        res.status(500).json({
            error: "Erro ao carregar dataset"
        })
    }
})

router.get("/categories", async (req: Request, res: Response) => {
    try {
        const categories = await getDatasetCategories()

        res.json(categories)
    } catch (error) {
        console.error("Erro ao obter categorias:", error)

        res.status(500).json({
            error: "Erro ao obter categorias"
        })
    }
})

router.get(
    "/category/:category",
    async (req: Request, res: Response) => {
        try {
            const { category } = req.params

            const records = await getDatasetByCategory(category)

            res.json(records)
        } catch (error) {
            console.error("Erro ao obter categoria:", error)

            res.status(500).json({
                error: "Erro ao obter categoria"
            })
        }
    }
)

router.get(
    "/record/:sourceId",
    async (req: Request, res: Response) => {
        try {
            const { sourceId } = req.params

            const record = await getDatasetRecord(sourceId)

            if (!record) {
                res.status(404).json({
                    error: "Registro não encontrado"
                })

                return
            }

            res.json(record)
        } catch (error) {
            console.error("Erro ao obter registro:", error)

            res.status(500).json({
                error: "Erro ao obter registro"
            })
        }
    }
)

export default router