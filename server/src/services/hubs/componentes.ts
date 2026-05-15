import puppeteer from "puppeteer-extra"

import StealthPlugin from "puppeteer-extra-plugin-stealth"

import { scrapeKabum } from "../../scrapers/kabum"
import { scrapePichau } from "../../scrapers/pichau"
import { scrapeTerabyte } from "../../scrapers/terabyte"

import { salvarPrecoProduto } from "../../database/salvarProduto"

import {
    definirMarca,
    produtoEhKitUpgrade
} from "../../utils/componenteUtils"

import {
    gerarFingerprintProduto
} from "../../utils/fingerprint"

import {
    ConfigComponente
} from "../../interfaces/scraper"
import { getSeletor } from "../../utils/seletores"
import { extrairSpecs } from "../../utils/extrairSpecs"


puppeteer.use(
    StealthPlugin()
)

export async function atualizarComponente(
    config: ConfigComponente
) {

    const browser =
        await puppeteer.launch({

            headless: false, // ON

            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox"
            ]
        })

    try {

        const resultados =
            await Promise.all([

                scrapeKabum(
                    browser,
                    config.urls.Kabum,
                    getSeletor(
                        "Kabum",
                        config.tipo
                    )
                ),

                scrapePichau(
                    browser,
                    config.urls.Pichau,
                    getSeletor(
                        "Pichau",
                        config.tipo
                    )
                ),

                scrapeTerabyte(
                    browser,
                    config.urls.Terabyte,
                    getSeletor(
                        "Terabyte",
                        config.tipo
                    )
                )
            ])

        const produtos =
            resultados.flat()

        for (const produto of produtos) {

            try {

                if (
                    produtoEhKitUpgrade(
                        produto.nomeEncontrado
                    )
                ) {
                    continue
                }

                if (
                    !produto.valor ||
                    produto.valor.preco <= 0
                ) {
                    continue
                }

                const fingerprint =
                    gerarFingerprintProduto(
                        config.tipo,
                        produto.nomeEncontrado
                    )

                const specs = extrairSpecs(produto.nomeEncontrado, config.tipo)

                await salvarPrecoProduto({

                    nome:
                        produto.nomeEncontrado,

                    tipo:
                        config.tipo,

                    marca:
                        definirMarca(
                            produto.nomeEncontrado
                        ),

                    loja:
                        produto.valor.loja,

                    preco:
                        produto.valor.preco,

                    imagem:
                        produto.imagem,

                    url:
                        produto.valor.url,

                    fingerprint,

                    specs
                })

                console.log(
                    `✔ ${produto.valor.loja}: ${produto.nomeEncontrado}`
                )

            } catch (err) {

                console.error(
                    "Erro produto:",
                    err
                )
            }
        }

    } finally {

        await browser.close()
    }
}