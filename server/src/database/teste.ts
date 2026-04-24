import '../config/env'
import pool from "./connection";

async function test() {

  const [cpu] = await pool.query("SELECT * from cpu WHERE produtoID = 728");
  const [produtos] = await pool.query("SELECT * FROM produtos WHERE id = 728");

  console.log(cpu, produtos);

}

test();