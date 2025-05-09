import { Request, Response } from 'express';
import { db } from '../database';

export const listarPlacasMae = async (req: Request, res: Response) => {
    try {
        const [result] = await db.query(`
        SELECT 
          placasmae.id,
          placasmae.modelo,
          placasmae.potencia,
          CAST(placasmae.preco AS DECIMAL(10,2)) AS preco,
          placasmae.imagem,
          marcas.nome AS marca,
          sockets.nome AS socket,
          ddr.versao AS ddr,
          componente.tipo as tipo,
          componente.nome as nome
        FROM placasmae
        INNER JOIN marcas ON placasmae.marcaID = marcas.id
        INNER JOIN sockets ON placasmae.socketID = sockets.id
        INNER JOIN ddr ON placasmae.ddrID = ddr.id
        INNER JOIN componente on placasmae.componenteID = componente.id
      `);


        const resultadoFormatado = (result as any[]).map(item => ({
            ...item,
            preco: parseFloat(item.preco)
        }));

        res.json(resultadoFormatado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar placas-mãe com joins' });
    }
};

export const listarProcessadores = async (req: Request, res: Response) => {
    try {
        const [result] = await db.query(`
        SELECT
            processadores.id,
            processadores.modelo,
            processadores.potencia,
            CAST(processadores.preco AS DECIMAL(10,2)) AS preco,
            processadores.imagem,
            processadores.velocidade,
            processadores.videoIntegrado,
            marcas.nome AS marca,
            sockets.nome AS socket,
            componente.tipo as tipo,
            componente.nome as nome
        FROM processadores
        INNER JOIN marcas ON processadores.marcaID = marcas.id
        INNER JOIN sockets ON processadores.socketID = sockets.id
        INNER JOIN componente on processadores.componenteID = componente.id
        `);

        const resultadoFormatado = (result as any[]).map(item => ({
            ...item,
            preco: parseFloat(item.preco),
            videoIntegrado: Boolean(item.videoIntegrado)
        }));

        res.json(resultadoFormatado);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar processadores' });
    }
};

export const listarMemorias = async (req: Request, res: Response) => {
    try {
        const [result] = await db.query('SELECT * FROM memoriasram');
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar memórias RAM' });
    }
};