import "../config/env"
import connection from "./connection"

interface PrecoDb {
    nome: string
    tipo: string
    marca: string
    loja: string
    preco: number
    imagem: string
    url: string

    tdp?: number | null
    gddr?: number | null

    velocidadeLeitura?: number | null
    velocidadeGravacao?: number | null

    qtdFans?: number | null

    pcieConectores?: number | null
    sataConectores?: number | null
    epsConectores?: number | null
}

export async function salvarPrecoProduto(
    dados: PrecoDb
) {
    const [produtoRows] = await connection.execute(
        `
        SELECT id
        FROM produtos
        WHERE nome = ?
        LIMIT 1
        `,
        [dados.nome]
    )

    const produtos = produtoRows as any[]

    let produtoId: number

    if (produtos.length > 0) {
        produtoId = produtos[0].id

        await connection.execute(
            `
            UPDATE produtos
            SET
                imagem = ?,
                gddr = ?,
                tdp = ?,
                velocidade_leitura = ?,
                velocidade_gravacao = ?,
                qtd_fans = ?,
                pcie_conectores = ?,
                sata_conectores = ?,
                eps_conectores = ?
            WHERE id = ?
            `,
            [
                dados.imagem,
                dados.gddr ?? null,
                dados.tdp ?? null,

                dados.velocidadeLeitura ?? null,
                dados.velocidadeGravacao ?? null,

                dados.qtdFans ?? null,

                dados.pcieConectores ?? null,
                dados.sataConectores ?? null,
                dados.epsConectores ?? null,

                produtoId
            ]
        )
    } else {
        const [insertResult] =
            await connection.execute(
                `
                INSERT INTO produtos
                (
                    nome,
                    tipo,
                    marca,
                    imagem,

                    gddr,
                    tdp,

                    velocidade_leitura,
                    velocidade_gravacao,

                    qtd_fans,

                    pcie_conectores,
                    sata_conectores,
                    eps_conectores
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `,
                [
                    dados.nome,
                    dados.tipo,
                    dados.marca,
                    dados.imagem,

                    dados.gddr ?? null,
                    dados.tdp ?? null,

                    dados.velocidadeLeitura ??
                    null,
                    dados.velocidadeGravacao ??
                    null,

                    dados.qtdFans ?? null,

                    dados.pcieConectores ??
                    null,
                    dados.sataConectores ??
                    null,
                    dados.epsConectores ??
                    null
                ]
            )

        produtoId = (insertResult as any).insertId
    }

    await connection.execute(
        `
        INSERT INTO precos_produto
        (
            produto_id,
            loja,
            preco,
            url,
            atualizado_em
        )
        VALUES (?, ?, ?, ?, NOW())
        ON DUPLICATE KEY UPDATE
            preco = VALUES(preco),
            url = VALUES(url),
            atualizado_em = NOW()
        `,
        [
            produtoId,
            dados.loja,
            dados.preco,
            dados.url
        ]
    )
}