import '../config/env'
import pool from "./connection";

async function test() {

  const [produtos] = await pool.query("SELECT * FROM produtos where tipo = \"cpu\"");
  const [precos_produto] = await pool.query(`SELECT * FROM precos_produto`);

  console.table(produtos);

}

test();