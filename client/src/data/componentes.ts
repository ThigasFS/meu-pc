import type {
    ConteudoComponente,
    IdComponente,
} from './types';

export const componentes: Record<
    IdComponente,
    ConteudoComponente
> = {
    processador: {
        titulo: 'Processador (CPU)',
        descricao:
            'O processador executa instruções e influencia a velocidade dos programas e o desempenho em tarefas simultâneas.',

        pontosImportantes: [
            {
                id: 'nivel',
                titulo: 'Categoria de desempenho',
                descricao:
                    'Nomes como Core i5 e Ryzen 5 identificam categorias de produtos, mas não garantem que processadores de gerações diferentes tenham o mesmo desempenho.',
                cor: 'primary',
            },
            {
                id: 'geracao',
                titulo: 'Geração e família',
                descricao:
                    'Ajudam a identificar a arquitetura e a família do processador. A nomenclatura varia conforme o fabricante e a linha.',
                cor: 'secondary',
            },
            {
                id: 'modelo',
                titulo: 'Modelo',
                descricao:
                    'Diferencia os produtos de uma mesma família. Compare especificações e benchmarks para avaliar o desempenho real.',
                cor: 'tertiary',
            },
            {
                id: 'video-integrado',
                titulo: 'Vídeo integrado',
                descricao:
                    'Alguns processadores possuem gráficos integrados. Outros exigem uma placa de vídeo dedicada para fornecer imagem.',
                cor: 'quaternary',
            },
        ],

        exemplos: [
            {
                nome: 'AMD Ryzen 5 5600',
                imagem: '/public/ryzen55600.png',
                descricao:
                    'Exemplo de processador que pode atender a diferentes tarefas, conforme a aplicação e os demais componentes.',
                partesNome: [
                    { texto: 'AMD Ryzen ' },
                    { texto: '5', destaque: 'nivel' },
                    { texto: ' ' },
                    { texto: '5600', destaque: 'modelo' },
                ],
                destaques: ['nivel', 'modelo'],
            },
            {
                nome: 'Intel Core i5-13400F',
                imagem: '/public/i513400f.png',
                descricao:
                    'Exemplo de processador cuja versão F não oferece gráficos integrados; é necessária uma GPU dedicada para obter imagem.',
                partesNome: [
                    { texto: 'Intel Core ' },
                    { texto: 'i5', destaque: 'nivel' },
                    { texto: '-' },
                    { texto: '13', destaque: 'geracao' },
                    { texto: '400', destaque: 'modelo' },
                    { texto: 'F', destaque: 'video-integrado' },
                ],
                destaques: [
                    'nivel',
                    'geracao',
                    'modelo',
                    'video-integrado',
                ],
            },
        ],
    },

    'placa-de-video': {
        titulo: 'Placa de vídeo (GPU)',
        descricao:
            'A placa de vídeo processa imagens e gráficos. Ela é especialmente importante para jogos, edição de vídeo, modelagem 3D e outras tarefas que utilizam aceleração gráfica.',

        pontosImportantes: [
            {
                id: 'familia',
                titulo: 'Família e geração',
                descricao:
                    'Identificam a linha do produto e ajudam a situar sua tecnologia. Compare modelos específicos, pois uma geração mais nova nem sempre supera todas as placas de gerações anteriores.',
                cor: 'primary',
            },
            {
                id: 'modelo',
                titulo: 'Modelo',
                descricao:
                    'Diferencia as placas dentro de uma família. Benchmarks em jogos e programas semelhantes aos que você pretende utilizar ajudam a avaliar o desempenho real.',
                cor: 'secondary',
            },
            {
                id: 'memoria',
                titulo: 'Memória de vídeo (VRAM)',
                descricao:
                    'Armazena texturas, modelos e outros dados gráficos. A capacidade necessária varia conforme a resolução, os jogos e os programas utilizados.',
                cor: 'tertiary',
            },
            {
                id: 'fabricante',
                titulo: 'Fabricante e recursos',
                descricao:
                    'NVIDIA e AMD oferecem diferentes tecnologias de renderização, upscaling e aceleração. Verifique também compatibilidade com os programas e recursos desejados.',
                cor: 'quaternary',
            },
        ],

        exemplos: [
            {
                nome: 'NVIDIA GeForce RTX 4060 8 GB',
                imagem: '/public/rtx4060.png',
                descricao:
                    'Placa de vídeo voltada principalmente para jogos em 1080p, com suporte a recursos como ray tracing e DLSS. O desempenho varia conforme o jogo e as configurações.',
                partesNome: [
                    { texto: 'NVIDIA GeForce ' },
                    { texto: 'RTX ', destaque: 'fabricante' },
                    { texto: '40', destaque: 'familia' },
                    { texto: '60', destaque: 'modelo' },
                    { texto: ' 8 GB', destaque: 'memoria' },
                ],
                destaques: [
                    'fabricante',
                    'familia',
                    'modelo',
                    'memoria',
                ],
            },
            {
                nome: 'AMD Radeon RX 7600 8 GB',
                imagem: '/public/rx7600.png',
                descricao:
                    'Alternativa voltada principalmente para jogos em 1080p. Compare benchmarks, consumo de energia e recursos com outras placas da mesma faixa de preço.',
                partesNome: [
                    { texto: 'AMD Radeon ' },
                    { texto: 'RX ', destaque: 'fabricante' },
                    { texto: '7', destaque: 'familia' },
                    { texto: '600', destaque: 'modelo' },
                    { texto: ' 8 GB', destaque: 'memoria' },
                ],
                destaques: [
                    'fabricante',
                    'familia',
                    'modelo',
                    'memoria',
                ],
            },
        ],
    },

    'memoria-ram': {
        titulo: 'Memória RAM',
        descricao:
            'A memória RAM mantém temporariamente os dados utilizados pelos programas em execução. Sua capacidade e velocidade influenciam a fluidez do sistema e o desempenho em determinadas tarefas.',

        pontosImportantes: [
            {
                id: 'capacidade',
                titulo: 'Capacidade',
                descricao:
                    'Medida em GB, indica a quantidade de dados que pode permanecer disponível para uso imediato. Pouca RAM pode causar lentidão quando vários programas ou arquivos exigentes estão abertos.',
                cor: 'primary',
            },
            {
                id: 'tipo',
                titulo: 'Geração DDR',
                descricao:
                    'DDR4 e DDR5 são tecnologias diferentes e não são intercambiáveis. A placa-mãe e o processador precisam oferecer suporte ao tipo escolhido.',
                cor: 'secondary',
            },
            {
                id: 'frequencia',
                titulo: 'Frequência e velocidade',
                descricao:
                    'Expressa a taxa de transferência da memória, normalmente indicada em MT/s nos módulos atuais. O ganho de desempenho depende do processador, da configuração e da aplicação.',
                cor: 'tertiary',
            },
            {
                id: 'kit',
                titulo: 'Quantidade de módulos',
                descricao:
                    'Dois módulos compatíveis podem permitir operação em dual-channel, aumentando a largura de banda disponível. Verifique também a capacidade suportada pela placa-mãe.',
                cor: 'quaternary',
            },
        ],

        exemplos: [
            {
                nome: 'Kingston Fury Beast 16 GB DDR4 3200',
                imagem: '/public/furybeast.png',
                descricao:
                    'Exemplo de memória DDR4 com capacidade de 16 GB e velocidade anunciada de 3200 MT/s. Confira se o produto é um módulo individual ou um kit.',
                partesNome: [
                    { texto: 'Kingston Fury Beast ' },
                    { texto: '16 GB', destaque: 'capacidade' },
                    { texto: ' ' },
                    { texto: 'DDR4', destaque: 'tipo' },
                    { texto: ' ' },
                    { texto: '3200', destaque: 'frequencia' },
                ],
                destaques: [
                    'capacidade',
                    'tipo',
                    'frequencia',
                ],
            },
            {
                nome: 'Corsair Vengeance 32 GB DDR5 6000',
                imagem: '/public/corsairvengeance.png',
                descricao:
                    'Exemplo de memória DDR5 com capacidade total de 32 GB e velocidade anunciada de 6000 MT/s. É importante confirmar a compatibilidade e se a velocidade exige ativação de um perfil de memória.',
                partesNome: [
                    { texto: 'Corsair Vengeance ' },
                    { texto: '32 GB', destaque: 'capacidade' },
                    { texto: ' ' },
                    { texto: 'DDR5', destaque: 'tipo' },
                    { texto: ' ' },
                    { texto: '6000', destaque: 'frequencia' },
                ],
                destaques: [
                    'capacidade',
                    'tipo',
                    'frequencia',
                ],
            },
        ],
    },

    armazenamento: {
        titulo: 'Armazenamento',
        descricao:
            'O armazenamento guarda o sistema operacional, os programas e os arquivos mesmo quando o computador está desligado. A tecnologia utilizada influencia a velocidade de inicialização, carregamento e transferência de dados.',

        pontosImportantes: [
            {
                id: 'tecnologia',
                titulo: 'Tecnologia do dispositivo',
                descricao:
                    'SSDs utilizam memória flash e geralmente oferecem carregamentos mais rápidos que HDs mecânicos. Para o uso cotidiano, um SSD costuma proporcionar uma melhoria perceptível na resposta do sistema.',
                cor: 'primary',
            },
            {
                id: 'capacidade',
                titulo: 'Capacidade',
                descricao:
                    'Medida em GB ou TB, indica quanto espaço está disponível para sistema, programas, jogos e arquivos. Considere o tamanho dos softwares e a possibilidade de expansão.',
                cor: 'secondary',
            },
            {
                id: 'interface',
                titulo: 'Interface e velocidade',
                descricao:
                    'SATA e NVMe/PCIe possuem características e limites diferentes. Um SSD NVMe pode oferecer taxas sequenciais muito superiores, mas o ganho prático depende da tarefa.',
                cor: 'tertiary',
            },
            {
                id: 'formato',
                titulo: 'Formato físico',
                descricao:
                    'Formatos como M.2 e 2,5 polegadas descrevem características físicas. Nem todo M.2 utiliza NVMe: existem unidades M.2 SATA, então confira o suporte da placa-mãe.',
                cor: 'quaternary',
            },
        ],

        exemplos: [
            {
                nome: 'Kingston NV2 1 TB NVMe PCIe 4.0',
                imagem: '/public/kingstonnv2.png',
                descricao:
                    'SSD M.2 NVMe de 1 TB que utiliza PCIe 4.0. Para aproveitar sua interface, confira a compatibilidade do slot M.2 e as especificações da placa-mãe.',
                partesNome: [
                    { texto: 'Kingston ' },
                    { texto: 'NV2', destaque: 'tecnologia' },
                    { texto: ' ' },
                    { texto: '1 TB', destaque: 'capacidade' },
                    { texto: ' ' },
                    { texto: 'NVMe PCIe 4.0', destaque: 'interface' },
                ],
                destaques: [
                    'tecnologia',
                    'capacidade',
                    'interface',
                    'formato',
                ],
            },
            {
                nome: 'Crucial MX500 480 GB SATA',
                imagem: '/public/crucialmx500.png',
                descricao:
                    'SSD SATA de 480 GB, uma opção para instalar o sistema operacional e programas. Seu desempenho é limitado pela interface SATA, mas pode ser adequado para muitos usos cotidianos.',
                partesNome: [
                    { texto: 'Crucial ' },
                    { texto: 'MX500', destaque: 'tecnologia' },
                    { texto: ' ' },
                    { texto: '480 GB', destaque: 'capacidade' },
                    { texto: ' ' },
                    { texto: 'SATA', destaque: 'interface' },
                ],
                destaques: [
                    'tecnologia',
                    'capacidade',
                    'interface',
                    'formato',
                ],
            },
        ],
    },
}