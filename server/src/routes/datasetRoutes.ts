import { Router } from "express";

import { getDatasetSpecs } from "../services/datasetService";

const router = Router();

router.get("/specs", async (_req, res) => {
    try {
        const data = await getDatasetSpecs();

        res.json(data);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Erro ao analisar dataset",
        });
    }
});

export default router;