import { Router } from "express";
import pool from "../database/connection";

const router = Router()

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT
                p.id,
                p.marca,
                p.modelo,
                p.preco,
                p.imagem,
                p.url,
                c.socket,
                c.velocidade,
                c.tdp,
                c.video_integrado
            FROM produtos p
            JOIN cpu c ON p.id = c.produtoID
            LIMIT 50    
        `)

        res.json(rows)
    }catch(err){
        console.error(err)
        res.status(500).json({erro: 'Erro ao buscar CPU'})
    }
})

export default router