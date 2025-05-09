import { Router } from 'express';
import { listarPlacasMae, listarProcessadores, listarMemorias } from '../controllers/componentesController';

const router = Router();

router.get('/placasmae', listarPlacasMae);
router.get('/processadores', listarProcessadores);
router.get('/memoriasram', listarMemorias);

export default router;