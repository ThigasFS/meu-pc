export function cleanProductName(nome: string) {
    return nome
        .replace(/Avaliação.*?/g, "")
        .replace(/R\$.*$/g, "")
        .replace(/Desconto.*$/g, "")
        .replace(/No PIX.*$/g, "")
        .replace(/Restam.*$/g, "")
        .trim()
}