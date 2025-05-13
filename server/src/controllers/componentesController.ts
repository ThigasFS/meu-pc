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

export const listarPlacasVideo = async (req: Request, res: Response) => {
    try {
        const [result] = await db.query(`
        SELECT
            placasvideo.id,
            placasvideo.modelo,
            placasvideo.potencia,
            CAST(placasvideo.preco AS DECIMAL(10,2)) AS preco,
            placasvideo.imagem,
            placasvideo.vram,
            placasvideo.gddr,
            marcas.nome AS marca,
            componente.tipo as tipo,
            componente.nome as nome
        FROM placasvideo
        INNER JOIN marcas ON placasvideo.marcaID = marcas.id
        INNER JOIN componente ON placasvideo.componenteID = componente.id
        `);

        const resultadoFormatado = (result as any[]).map(item => ({
            ...item,
            preco: parseFloat(item.preco)
        }));

        res.json(resultadoFormatado);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar placa de vídeo' });
    }
};

export const listarMemorias = async (req: Request, res: Response) => {
    try {
        const [result] = await db.query(`
        SELECT
            memoriasram.id,
            CONCAT(memoriasram.modelo,' ',memoriasram.quantidade) as modelo,
            memoriasram.potencia,
            CAST(memoriasram.preco AS DECIMAL(10,2)) AS preco,
            memoriasram.imagem,
            memoriasram.velocidade,
            memoriasram.cl,
            memoriasram.memoria,
            ddr.versao as ddr,
            marcas.nome AS marca,
            componente.tipo as tipo,
            componente.nome as nome
        FROM memoriasram
        INNER JOIN marcas ON memoriasram.marcaID = marcas.id
        INNER JOIN componente ON memoriasram.componenteID = componente.id
        INNER JOIN ddr ON memoriasram.ddrID = ddr.id
        `);

        const resultadoFormatado = (result as any[]).map(item => ({
            ...item,
            preco: parseFloat(item.preco)
        }));

        res.json(resultadoFormatado);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar memórias RAM' });
    }
};

export const listarArmazenamento = async (req: Request, res: Response) => {
    try {
        const [result] = await db.query(`
        SELECT
            armazenamento.id,
            armazenamento.modelo,
            armazenamento.potencia,
            CAST(armazenamento.preco AS DECIMAL(10,2)) AS preco,
            armazenamento.imagem,
            armazenamento.capacidade,
            armazenamento.unidade,
            armazenamento.tipoArmazenamento,
            armazenamento.tipoConexao,
            armazenamento.velocidadeLeitura,
            armazenamento.velocidadeGravacao,
            marcas.nome AS marca,
            componente.tipo as tipo,
            componente.nome as nome
        FROM armazenamento
        INNER JOIN marcas ON armazenamento.marcaID = marcas.id
        INNER JOIN componente ON armazenamento.componenteID = componente.id
        `);

        const resultadoFormatado = (result as any[]).map(item => ({
            ...item,
            preco: parseFloat(item.preco)
        }));

        res.json(resultadoFormatado);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar armazenamento' });
    }
};

export const listarFontes = async (req: Request, res: Response) => {
    try {
        const [result] = await db.query(`
        SELECT
            fontes.id,
            fontes.modelo,
            fontes.potencia,
            CAST(fontes.preco AS DECIMAL(10,2)) AS preco,
            fontes.imagem,
            fontes.certificacao,
            marcas.nome AS marca,
            componente.tipo as tipo,
            componente.nome as nome,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                'tipo', cabos.tipo,
                'quantidade', cabos.quantidade
                )
            ) AS cabos
        FROM fontes
        INNER JOIN marcas ON fontes.marcaID = marcas.id
        INNER JOIN componente ON fontes.componenteID = componente.id
        INNER JOIN cabos ON fontes.id = cabos.fonteID
        GROUP BY fontes.id
        `);

        const resultadoFormatado = (result as any[]).map(item => ({
            ...item,
            preco: parseFloat(item.preco)
        }));

        res.json(resultadoFormatado);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar armazenamento' });
    }
};

export const listarGabinetes = async (req: Request, res: Response) => {
    try {
        const [result] = await db.query(`
        SELECT
            gabinetes.id,
            gabinetes.modelo,
            CAST(gabinetes.preco AS DECIMAL(10,2)) AS preco,
            gabinetes.imagem,
            gabinetes.cor,
            gabinetes.qtdFans,
            marcas.nome AS marca,
            componente.tipo as tipo,
            componente.nome as nome
        FROM gabinetes
        INNER JOIN marcas ON gabinetes.marcaID = marcas.id
        INNER JOIN componente ON gabinetes.componenteID = componente.id
        `);

        const resultadoFormatado = (result as any[]).map(item => ({
            ...item,
            preco: parseFloat(item.preco)
        }));

        res.json(resultadoFormatado);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar armazenamento' });
    }
};