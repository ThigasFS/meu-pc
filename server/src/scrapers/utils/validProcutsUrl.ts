export function isValidProductUrl(url: string, store: string) {
    if (!url) return false

    switch (store.toLowerCase()) {
        case "kabum":
            return url.includes("/produto/")

        case "pichau":
            return url.includes("/processador")

        case "terabyte":
            return url.includes("/produto/")

        default:
            return false
    }
}