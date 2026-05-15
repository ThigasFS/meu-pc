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
                seletor: "a[href*='/produto/']"
            },
            {
                tipo: 'placamae',
                seletor: "a[href*='/produto/']"
            },
            {
                tipo: 'gpu',
                seletor: "a[href*='/produto/']"
            },
            {
                tipo: 'ram',
                seletor: "a[href*='/produto/']"
            },
            {
                tipo: 'armazenamento',
                seletor: "a[href*='/produto/']"
            },
            {
                tipo: 'fonte',
                seletor: "a[href*='/produto/']"
            },
            {
                tipo: 'gabinete',
                seletor: "a[href*='/produto/']"
            }
        ]
    },

    {
        loja: 'Pichau',

        seletores: [
            {
                tipo: 'cpu',
                seletor: 'a[data-cy="list-product"]'
            },
            {
                tipo: 'placamae',
                seletor: 'a[data-cy="list-product"]'
            },
            {
                tipo: 'gpu',
                seletor: 'a[data-cy="list-product"]'
            },
            {
                tipo: 'ram',
                seletor: 'a[data-cy="list-product"]'
            },
            {
                tipo: 'armazenamento',
                seletor: 'a[data-cy="list-product"]'
            },
            {
                tipo: 'fonte',
                seletor: 'a[data-cy="list-product"]'
            },
            {
                tipo: 'gabinete',
                seletor: 'a[data-cy="list-product"]'
            }
        ]
    },

    {
        loja: 'Terabyte',

        seletores: [
            {
                tipo: 'cpu',
                seletor: ".product-item__box"
            },
            {
                tipo: 'placamae',
                seletor: ".product-item__box"
            },
            {
                tipo: 'gpu',
                seletor: ".product-item__box"
            },
            {
                tipo: 'ram',
                seletor: ".product-item__box"
            },
            {
                tipo: 'armazenamento',
                seletor: ".product-item__box"
            },
            {
                tipo: 'fonte',
                seletor: ".product-item__box"
            },
            {
                tipo: 'gabinete',
                seletor: '.product-item__box'
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