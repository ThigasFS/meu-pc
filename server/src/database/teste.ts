import '../config/env'
import pool from "./connection";

async function test() {

  const [rows] = await pool.query("SELECT * from cpu");

  console.log(rows);

}

test();