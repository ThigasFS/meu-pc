import { Page } from "puppeteer"

export async function waitProducts(page: Page) {
    await page.waitForSelector("a[href]", {
        timeout: 10000
    })
}