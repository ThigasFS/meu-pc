import { Router } from 'express';
import { listarPlacasMae, listarProcessadores, listarMemorias, listarPlacasVideo, listarArmazenamento, listarFontes, listarGabinetes } from '../controllers/componentesController';

const router = Router();

router.get('/placasmae', listarPlacasMae);
router.get('/processadores', listarProcessadores);
router.get('/placasvideo', listarPlacasVideo);
router.get('/memoriasram', listarMemorias);
router.get('/armazenamento', listarArmazenamento);
router.get('/fontes', listarFontes);
router.get('/gabinetes', listarGabinetes);

export default router;