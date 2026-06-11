interface ResultadoTDP {
    valor: number,
    estimado: boolean
}

export function validarTDP(
    tipo: "cpu" | "gpu",
    tdp?: number
): ResultadoTDP {

    if (tipo === "cpu") {

        if (
            tdp &&
            tdp >= 35 &&
            tdp <= 250
        ) {
            return {
                valor: tdp,
                estimado: false
            }
        }

        return {
            valor: 65,
            estimado: true
        }
    }

    if (
        tdp &&
        tdp >= 50 &&
        tdp <= 600
    ) {
        return {
            valor: tdp,
            estimado: false
        }
    }

    return {
        valor: 180,
        estimado: true
    }
}