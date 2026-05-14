import "../config/env"
import connection from "./connection"

interface PrecoDb {
    nome: string
    tipo: string
    marca: string

    loja: string
    preco: number
    url: string

    imagem: string
    fingerprint: string

    specs?: Record<string, any>
}

export async function salvarPrecoProduto(
    dados: PrecoDb
) {

    const [produtoRows] =
        await connection.execute(
            `
            SELECT id
            FROM produtos
            WHERE fingerprint = ?
            LIMIT 1
            `,
            [dados.fingerprint]
        )

    const produtos =
        produtoRows as any[]

    let produtoId: number

    if (produtos.length > 0) {

        produtoId =
            produtos[0].id

        await connection.execute(
            `
            UPDATE produtos
            SET
                imagem = ?,
                specs = ?
            WHERE id = ?
            `,
            [
                dados.imagem,
                JSON.stringify(
                    dados.specs ?? {}
                ),
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
                    fingerprint,
                    specs
                )
                VALUES (?, ?, ?, ?, ?, ?)
                `,
                [
                    dados.nome,
                    dados.tipo,
                    dados.marca,
                    dados.imagem,
                    dados.fingerprint,

                    JSON.stringify(
                        dados.specs ?? {}
                    )
                ]
            )

        produtoId =
            (insertResult as any)
                .insertId
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