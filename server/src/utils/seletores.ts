interface SeletorLoja {
    tipo: string,
    seletor: string
}

interface SeletoresLojas {
    loja: 'Kabum' | 'Pichau' | 'Terabyte'
    seletores: SeletorLoja[]
}


const seletoresLojas: SeletoresLojas[] = [
    {
        loja: 'Kabum',
        seletores: [
            {
                tipo: 'cpu',
                seletor: 'a[href*="processador-"]'
            }
        ]
    },
    {
        loja: 'Pichau',
        seletores: [
            {
                tipo: 'cpu',
                seletor: 'a[href*="processador-"]'
            }
        ]
    },
    {
        loja: 'Terabyte',
        seletores: [
            {
                tipo: 'cpu',
                seletor: 'a[href*="processador-"]'
            }
        ]
    }
]

export function getSeletor(
    loja: 'Kabum' | 'Pichau' | 'Terabyte',
    tipo: string
) {

    const lojaEncontrada =
        seletoresLojas.find(
            l => l.loja === loja
        )

    if (!lojaEncontrada) {
        return ""
    }

    const seletor =
        lojaEncontrada.seletores.find(
            s => s.tipo === tipo
        )

    return seletor?.seletor ?? ""
}