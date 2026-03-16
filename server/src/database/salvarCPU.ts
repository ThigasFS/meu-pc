import '../config/env'
import pool from "./connection"

export async function saveCpu(cpu: any) {

  const conn = await pool.getConnection()

  try {

    await conn.beginTransaction()

    const [produtoResult]: any = await conn.query(
      `
      INSERT INTO produtos
      (tipo, marca, modelo, fabricante, imagem, preco, url, lojaID)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)
      `,
      [
        "cpu",
        cpu.marca,
        cpu.modelo,
        cpu.marca,
        cpu.imagem,
        cpu.preco,
        cpu.url,
        cpu.loja_id
      ]
    )

    const produtoID = produtoResult.insertId

    await conn.query(
      `
      INSERT INTO cpu
      (produtoID, socket, velocidade, tdp, video_integrado)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      socket = VALUES(socket),
      velocidade = VALUES(velocidade),
      tdp = VALUES(tdp),
      video_integrado = VALUES(video_integrado)
      `,
      [
        produtoID,
        cpu.socket,
        cpu.clock,
        cpu.tdp,
        cpu.video_integrado
      ]
    )

    await conn.commit()

    console.log("CPU salva:", cpu.modelo)

  } catch (erro) {

    await conn.rollback()

    console.error("Erro ao salvar CPU:", erro)

  } finally {

    conn.release()

  }

}