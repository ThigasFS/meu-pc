import PC from "../interfaces/pc"

export const preBuilds: PC[] = [
    {
        id: 1,
        nome: "Educação Essencial",
        categoria: "Educação",

        videoIntegrado: true,

        processador: {
            id: 1,
            tipo: "cpu",
            nome: "Ryzen 5 8600G",
            marca: "AMD",
            socket: "AM5",
            velocidade: 4.3,
            tdp: 65,
            videoIntegrado: true,
            imagem: "",
            preco: 1299
        },

        placaMae: {
            id: 1,
            tipo: "placamae",
            nome: "B650M Gaming",
            marca: "MSI",
            socket: "AM5",
            chipset: "B650",
            formato: "MicroATX",
            maxRam: 192,
            ddr: 5,
            imagem: "",
            preco: 799,
            valores: []
        },

        memoriaRam: {
            id: 1,
            tipo: "memoriaram",
            marca: "Kingston",
            nome: "Fury Beast",
            capacidade: 16,
            modulos: [8, 8],
            velocidade: 5600,
            ddr: 5,
            cl: 36,
            imagem: "",
            preco: 329,
            url: "",
            valores: []
        },

        armazenamento: {
            id: 1,
            tipo: "armazenamento",
            marca: "Kingston",
            nome: "NV3",
            capacidade: 1,
            unidade: "TB",
            tipoArmazenamento: "SSD",
            interface: "NVME",
            formato: "M2",
            velocidadeLeitura: 6000,
            velocidadeGravacao: 4000,
            imagem: "",
            preco: 399,
            valores: []
        },

        fonte: {
            id: 1,
            tipo: "fonte",
            marca: "MSI",
            nome: "MAG A650BN",
            potencia: 650,
            certificacao: "80 Plus Bronze",
            pcieConectores: 2,
            sataConectores: 6,
            epsConectores: 1,
            modularidade: "Não",
            formato: "ATX",
            imagem: "",
            preco: 299,
            valores: []
        },

        valorTotal: 3125
    },

    {
        id: 2,
        nome: "Gamer Full HD",
        categoria: "Jogar",

        videoIntegrado: false,

        processador: {
            id: 2,
            tipo: "cpu",
            nome: "Ryzen 5 7600",
            marca: "AMD",
            socket: "AM5",
            velocidade: 3.8,
            tdp: 65,
            videoIntegrado: true,
            imagem: "",
            preco: 1399
        },

        placaVideo: {
            id: 1,
            tipo: "gpu",
            nome: "RTX 5060",
            marca: "NVIDIA",
            vram: 8,
            tdp: 145,
            gddr: 7,
            imagem: "",
            preco: 2099,
            valores: []
        },

        placaMae: {
            id: 2,
            tipo: "placamae",
            nome: "B650M DS3H",
            marca: "Gigabyte",
            socket: "AM5",
            chipset: "B650",
            formato: "MicroATX",
            maxRam: 192,
            ddr: 5,
            imagem: "",
            preco: 899,
            valores: []
        },

        memoriaRam: {
            id: 2,
            tipo: "memoriaram",
            marca: "Kingston",
            nome: "Fury Beast",
            capacidade: 32,
            modulos: [16,16],
            velocidade: 6000,
            ddr: 5,
            cl: 36,
            imagem: "",
            preco: 649,
            url: "",
            valores: []
        },

        armazenamento: {
            id: 2,
            tipo: "armazenamento",
            marca: "WD",
            nome: "SN770",
            capacidade: 1,
            unidade: "TB",
            tipoArmazenamento: "SSD",
            interface: "NVME",
            formato: "M2",
            velocidadeLeitura: 5150,
            velocidadeGravacao: 4900,
            imagem: "",
            preco: 499,
            valores: []
        },

        fonte: {
            id: 2,
            tipo: "fonte",
            marca: "Corsair",
            nome: "CX650",
            potencia: 650,
            certificacao: "80 Plus Bronze",
            pcieConectores: 2,
            sataConectores: 6,
            epsConectores: 1,
            modularidade: "Não",
            formato: "ATX",
            imagem: "",
            preco: 369,
            valores: []
        },

        valorTotal: 5915
    },

    {
        id: 3,
        nome: "Profissional Dev",
        categoria: "Profissional",

        videoIntegrado: true,

        processador: {
            id: 3,
            tipo: "cpu",
            nome: "Intel Core i5-14600K",
            marca: "Intel",
            socket: "LGA1700",
            velocidade: 3.5,
            tdp: 125,
            videoIntegrado: true,
            imagem: "",
            preco: 1799
        },

        placaMae: {
            id: 3,
            tipo: "placamae",
            nome: "B760M",
            marca: "ASUS",
            socket: "LGA1700",
            chipset: "B760",
            formato: "MicroATX",
            maxRam: 128,
            ddr: 5,
            imagem: "",
            preco: 999,
            valores: []
        },

        memoriaRam: {
            id: 3,
            tipo: "memoriaram",
            marca: "Corsair",
            nome: "Vengeance",
            capacidade: 32,
            modulos: [16,16],
            velocidade: 6000,
            ddr: 5,
            cl: 36,
            imagem: "",
            preco: 699,
            url: "",
            valores: []
        },

        armazenamento: {
            id: 3,
            tipo: "armazenamento",
            marca: "Samsung",
            nome: "990 EVO",
            capacidade: 1,
            unidade: "TB",
            tipoArmazenamento: "SSD",
            interface: "NVME",
            formato: "M2",
            velocidadeLeitura: 5000,
            velocidadeGravacao: 4200,
            imagem: "",
            preco: 579,
            valores: []
        },

        fonte: {
            id: 3,
            tipo: "fonte",
            marca: "Cooler Master",
            nome: "MWE 650",
            potencia: 650,
            certificacao: "80 Plus Bronze",
            pcieConectores: 2,
            sataConectores: 6,
            epsConectores: 1,
            modularidade: "Semi",
            formato: "ATX",
            imagem: "",
            preco: 399,
            valores: []
        },

        valorTotal: 4475
    },

    {
    id: 4,
    nome: "Educação Universitária",
    categoria: "Educação",

    videoIntegrado: true,

    processador: {
        id: 4,
        tipo: "cpu",
        nome: "Ryzen 5 5600GT",
        marca: "AMD",
        socket: "AM4",
        velocidade: 3.6,
        tdp: 65,
        videoIntegrado: true,
        imagem: "",
        preco: 899
    },

    placaMae: {
        id: 4,
        tipo: "placamae",
        nome: "B550M DS3H",
        marca: "Gigabyte",
        socket: "AM4",
        chipset: "B550",
        formato: "MicroATX",
        maxRam: 128,
        ddr: 4,
        imagem: "",
        preco: 599,
        valores: []
    },

    memoriaRam: {
        id: 4,
        tipo: "memoriaram",
        marca: "Kingston",
        nome: "Fury Beast",
        capacidade: 16,
        modulos: [8, 8],
        velocidade: 3200,
        ddr: 4,
        cl: 16,
        imagem: "",
        preco: 269,
        url: "",
        valores: []
    },

    armazenamento: {
        id: 4,
        tipo: "armazenamento",
        marca: "Kingston",
        nome: "NV2",
        capacidade: 1,
        unidade: "TB",
        tipoArmazenamento: "SSD",
        interface: "NVME",
        formato: "M2",
        velocidadeLeitura: 3500,
        velocidadeGravacao: 2800,
        imagem: "",
        preco: 319,
        valores: []
    },

    fonte: {
        id: 4,
        tipo: "fonte",
        marca: "MSI",
        nome: "MAG A550BN",
        potencia: 550,
        certificacao: "80 Plus Bronze",
        pcieConectores: 2,
        sataConectores: 5,
        epsConectores: 1,
        modularidade: "Não",
        formato: "ATX",
        imagem: "",
        preco: 249,
        valores: []
    },

    valorTotal: 2336
    },

    {
    id: 5,
    nome: "Home Office",
    categoria: "Casual",

    videoIntegrado: true,

    processador: {
        id: 5,
        tipo: "cpu",
        nome: "Ryzen 5 8500G",
        marca: "AMD",
        socket: "AM5",
        velocidade: 3.5,
        tdp: 65,
        videoIntegrado: true,
        imagem: "",
        preco: 1099
    },

    placaMae: {
        id: 5,
        tipo: "placamae",
        nome: "A620M-E",
        marca: "ASUS",
        socket: "AM5",
        chipset: "A620",
        formato: "MicroATX",
        maxRam: 96,
        ddr: 5,
        imagem: "",
        preco: 649,
        valores: []
    },

    memoriaRam: {
        id: 5,
        tipo: "memoriaram",
        marca: "Kingston",
        nome: "Fury Beast",
        capacidade: 16,
        modulos: [8,8],
        velocidade: 5200,
        ddr: 5,
        cl: 40,
        imagem: "",
        preco: 299,
        url: "",
        valores: []
    },

    armazenamento: {
        id: 5,
        tipo: "armazenamento",
        marca: "Kingston",
        nome: "NV3",
        capacidade: 1,
        unidade: "TB",
        tipoArmazenamento: "SSD",
        interface: "NVME",
        formato: "M2",
        velocidadeLeitura: 6000,
        velocidadeGravacao: 4000,
        imagem: "",
        preco: 399,
        valores: []
    },

    fonte: {
        id: 5,
        tipo: "fonte",
        marca: "Cooler Master",
        nome: "MWE 550",
        potencia: 550,
        certificacao: "80 Plus Bronze",
        pcieConectores: 2,
        sataConectores: 6,
        epsConectores: 1,
        modularidade: "Não",
        formato: "ATX",
        imagem: "",
        preco: 299,
        valores: []
    },

    valorTotal: 2745
    },

    {
    id: 6,
    nome: "Streaming Casual",
    categoria: "Casual",

    videoIntegrado: true,

    processador: {
        id: 6,
        tipo: "cpu",
        nome: "Intel Core i5-14400",
        marca: "Intel",
        socket: "LGA1700",
        velocidade: 2.5,
        tdp: 65,
        videoIntegrado: true,
        imagem: "",
        preco: 1299
    },

    placaMae: {
        id: 6,
        tipo: "placamae",
        nome: "B760M DS3H",
        marca: "Gigabyte",
        socket: "LGA1700",
        chipset: "B760",
        formato: "MicroATX",
        maxRam: 128,
        ddr: 5,
        imagem: "",
        preco: 849,
        valores: []
    },

    memoriaRam: {
        id: 6,
        tipo: "memoriaram",
        marca: "Corsair",
        nome: "Vengeance",
        capacidade: 32,
        modulos: [16,16],
        velocidade: 5600,
        ddr: 5,
        cl: 36,
        imagem: "",
        preco: 599,
        url: "",
        valores: []
    },

    armazenamento: {
        id: 6,
        tipo: "armazenamento",
        marca: "WD",
        nome: "SN770",
        capacidade: 1,
        unidade: "TB",
        tipoArmazenamento: "SSD",
        interface: "NVME",
        formato: "M2",
        velocidadeLeitura: 5150,
        velocidadeGravacao: 4900,
        imagem: "",
        preco: 499,
        valores: []
    },

    fonte: {
        id: 6,
        tipo: "fonte",
        marca: "Corsair",
        nome: "CX650",
        potencia: 650,
        certificacao: "80 Plus Bronze",
        pcieConectores: 2,
        sataConectores: 6,
        epsConectores: 1,
        modularidade: "Não",
        formato: "ATX",
        imagem: "",
        preco: 369,
        valores: []
    },

    valorTotal: 3615
    },

    {
    id: 7,
    nome: "Gamer Entrada",
    categoria: "Jogar",

    videoIntegrado: false,

    processador: {
        id: 7,
        tipo: "cpu",
        nome: "Ryzen 5 5600",
        marca: "AMD",
        socket: "AM4",
        velocidade: 3.5,
        tdp: 65,
        videoIntegrado: false,
        imagem: "",
        preco: 749
    },

    placaVideo: {
        id: 7,
        tipo: "gpu",
        nome: "RX 7600",
        marca: "AMD",
        vram: 8,
        tdp: 165,
        gddr: 6,
        imagem: "",
        preco: 1599,
        valores: []
    },

    placaMae: {
        id: 7,
        tipo: "placamae",
        nome: "B550M DS3H",
        marca: "Gigabyte",
        socket: "AM4",
        chipset: "B550",
        formato: "MicroATX",
        maxRam: 128,
        ddr: 4,
        imagem: "",
        preco: 599,
        valores: []
    },

    memoriaRam: {
        id: 7,
        tipo: "memoriaram",
        marca: "Kingston",
        nome: "Fury Beast",
        capacidade: 16,
        modulos: [8,8],
        velocidade: 3200,
        ddr: 4,
        cl: 16,
        imagem: "",
        preco: 269,
        url: "",
        valores: []
    },

    armazenamento: {
        id: 7,
        tipo: "armazenamento",
        marca: "Kingston",
        nome: "NV2",
        capacidade: 1,
        unidade: "TB",
        tipoArmazenamento: "SSD",
        interface: "NVME",
        formato: "M2",
        velocidadeLeitura: 3500,
        velocidadeGravacao: 2800,
        imagem: "",
        preco: 319,
        valores: []
    },

    fonte: {
        id: 7,
        tipo: "fonte",
        marca: "MSI",
        nome: "MAG A650BN",
        potencia: 650,
        certificacao: "80 Plus Bronze",
        pcieConectores: 2,
        sataConectores: 6,
        epsConectores: 1,
        modularidade: "Não",
        formato: "ATX",
        imagem: "",
        preco: 299,
        valores: []
    },

    valorTotal: 3835
    },

    {
    id: 8,
    nome: "Gamer QHD",
    categoria: "Jogar",

    videoIntegrado: false,

    processador: {
        id: 8,
        tipo: "cpu",
        nome: "Ryzen 7 9700X",
        marca: "AMD",
        socket: "AM5",
        velocidade: 3.8,
        tdp: 65,
        videoIntegrado: true,
        imagem: "",
        preco: 2299
    },

    placaVideo: {
        id: 8,
        tipo: "gpu",
        nome: "RTX 5070",
        marca: "NVIDIA",
        vram: 12,
        tdp: 250,
        gddr: 7,
        imagem: "",
        preco: 3999,
        valores: []
    },

    placaMae: {
        id: 8,
        tipo: "placamae",
        nome: "B650M Aorus Elite",
        marca: "Gigabyte",
        socket: "AM5",
        chipset: "B650",
        formato: "MicroATX",
        maxRam: 192,
        ddr: 5,
        imagem: "",
        preco: 1199,
        valores: []
    },

    memoriaRam: {
        id: 8,
        tipo: "memoriaram",
        marca: "Kingston",
        nome: "Fury Beast",
        capacidade: 32,
        modulos: [16,16],
        velocidade: 6000,
        ddr: 5,
        cl: 36,
        imagem: "",
        preco: 649,
        url: "",
        valores: []
    },

    armazenamento: {
        id: 8,
        tipo: "armazenamento",
        marca: "WD",
        nome: "SN850X",
        capacidade: 2,
        unidade: "TB",
        tipoArmazenamento: "SSD",
        interface: "NVME",
        formato: "M2",
        velocidadeLeitura: 7300,
        velocidadeGravacao: 6600,
        imagem: "",
        preco: 899,
        valores: []
    },

    fonte: {
        id: 8,
        tipo: "fonte",
        marca: "Corsair",
        nome: "RM750e",
        potencia: 750,
        certificacao: "80 Plus Gold",
        pcieConectores: 3,
        sataConectores: 8,
        epsConectores: 2,
        modularidade: "Full",
        formato: "ATX",
        imagem: "",
        preco: 699,
        valores: []
    },

    valorTotal: 9744
    }
]