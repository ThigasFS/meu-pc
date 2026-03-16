import './config/env'
import { scrapeKabumCPU } from "./scrapers/kabum/cpuScraper"
import { parseCpu } from "./parser/cpuParser";
import { saveCpu } from "./database/salvarCPU";
import pool from "./database/connection";

async function run() {

    console.log("🚀 Iniciando scraper Kabum...\n")

    const produtos = await scrapeKabumCPU()
    
    for (const produto of produtos) {

        const cpu = parseCpu(produto)

        await saveCpu(cpu)

    }

    await pool.end()
}

run()