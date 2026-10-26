
import type { PerguntaQuiz } from '../interfaces/quiz';

export const perguntasQuiz: PerguntaQuiz[] = [
    {
        id: 1,
        tipo: 'intencao',
        intencoes: ['jogos'],
        componente: 'placa de vídeo',
        pergunta:
            'Uma pessoa quer jogar títulos modernos com boa qualidade gráfica. Qual componente costuma ter maior impacto no desempenho gráfico dos jogos?',
        alternativas: [
            { id: 1, texto: 'Placa de vídeo' },
            { id: 2, texto: 'Unidade de armazenamento' },
            { id: 3, texto: 'Fonte de alimentação' },
            { id: 4, texto: 'Gabinete' },
        ],
        alternativaCorretaId: 1,
        explicacoes: [
            {
                alternativaId: 1,
                texto:
                    'Correto! A placa de vídeo processa grande parte do trabalho gráfico dos jogos. O desempenho também depende do processador, da memória e do próprio jogo.',
            },
            {
                alternativaId: 2,
                texto:
                    'O armazenamento influencia principalmente os tempos de carregamento e a leitura dos arquivos, não o processamento gráfico em si.',
            },
            {
                alternativaId: 3,
                texto:
                    'A fonte fornece energia aos componentes. Ela precisa ser adequada, mas não é responsável por renderizar os gráficos.',
            },
            {
                alternativaId: 4,
                texto:
                    'O gabinete acomoda e ajuda a refrigerar os componentes, mas não realiza o processamento gráfico.',
            },
        ],
    },
    {
        id: 2,
        tipo: 'intencao',
        intencoes: ['estudos', 'trabalho', 'casual'],
        componente: 'memória RAM',
        pergunta:
            'Uma pessoa costuma manter várias abas do navegador, documentos e outros programas abertos ao mesmo tempo. Qual componente ajuda a manter os dados desses programas disponíveis para uso imediato?',
        alternativas: [
            { id: 5, texto: 'Memória RAM' },
            { id: 6, texto: 'Fonte de alimentação' },
            { id: 7, texto: 'Gabinete' },
            { id: 8, texto: 'Placa de vídeo dedicada' },
        ],
        alternativaCorretaId: 5,
        explicacoes: [
            {
                alternativaId: 5,
                texto:
                    'Correto! A RAM mantém temporariamente dados e instruções utilizados pelos programas em execução. Sua capacidade pode influenciar o uso simultâneo de aplicações.',
            },
            {
                alternativaId: 6,
                texto:
                    'A fonte fornece energia elétrica ao computador, mas não mantém os dados dos programas disponíveis para acesso rápido.',
            },
            {
                alternativaId: 7,
                texto:
                    'O gabinete abriga os componentes e contribui para a organização e a refrigeração do computador.',
            },
            {
                alternativaId: 8,
                texto:
                    'Uma placa de vídeo dedicada pode ajudar em tarefas gráficas, mas não substitui a função da RAM na manutenção dos dados dos programas em uso.',
            },
        ],
    },
    {
        id: 3,
        tipo: 'intencao',
        intencoes: ['edicao-de-video', 'trabalho'],
        componente: 'processador',
        pergunta:
            'Ao escolher um computador para editar vídeos, por que é importante considerar o processador?',
        alternativas: [
            { id: 9, texto: 'Porque ele executa instruções e processa dados das tarefas' },
            { id: 10, texto: 'Porque ele armazena permanentemente todos os vídeos' },
            { id: 11, texto: 'Porque ele substitui todos os outros componentes' },
            { id: 12, texto: 'Porque ele fornece energia elétrica ao computador' },
        ],
        alternativaCorretaId: 9,
        explicacoes: [
            {
                alternativaId: 9,
                texto:
                    'Correto! O processador executa instruções e participa de diversas operações de edição. O desempenho final também depende da GPU, da RAM e do armazenamento.',
            },
            {
                alternativaId: 10,
                texto:
                    'Os arquivos são armazenados em dispositivos como SSDs e HDs. O processador trabalha com os dados, mas não os guarda permanentemente.',
            },
            {
                alternativaId: 11,
                texto:
                    'Nenhum processador substitui todos os componentes. O computador depende da atuação conjunta de diferentes peças.',
            },
            {
                alternativaId: 12,
                texto:
                    'Quem fornece energia aos componentes é a fonte de alimentação.',
            },
        ],
    },
    {
        id: 4,
        tipo: 'conteudo',
        componente: 'processador',
        pergunta: 'Qual é a principal função do processador?',
        alternativas: [
            { id: 13, texto: 'Executar instruções e processar dados' },
            { id: 14, texto: 'Armazenar arquivos permanentemente' },
            { id: 15, texto: 'Fornecer energia aos componentes' },
            { id: 16, texto: 'Exibir imagens diretamente no monitor' },
        ],
        alternativaCorretaId: 13,
        explicacoes: [
            {
                alternativaId: 13,
                texto:
                    'Correto! A CPU executa instruções e realiza operações sobre os dados utilizados pelos programas.',
            },
            {
                alternativaId: 14,
                texto:
                    'Essa é a função dos dispositivos de armazenamento, como SSDs e HDs. A RAM também guarda dados temporariamente, mas nenhum desses papéis corresponde à função principal da CPU.',
            },
            {
                alternativaId: 15,
                texto:
                    'A fonte de alimentação fornece energia elétrica aos componentes. O processador consome essa energia para funcionar.',
            },
            {
                alternativaId: 16,
                texto:
                    'O processador pode participar de tarefas relacionadas a imagens, mas a renderização e a saída gráfica envolvem a GPU e outros componentes. Exibir imagens não é sua função principal.',
            },
        ],
    },
    {
        id: 5,
        tipo: 'conteudo',
        componente: 'armazenamento',
        pergunta:
            'Qual é a principal diferença entre a memória RAM e um SSD?',
        alternativas: [
            { id: 17, texto: 'A RAM é temporária; o SSD mantém arquivos sem energia' },
            { id: 18, texto: 'A RAM mantém arquivos permanentemente; o SSD é temporário' },
            { id: 19, texto: 'Os dois perdem todos os dados quando o computador desliga' },
            { id: 20, texto: 'Os dois são responsáveis por executar instruções da CPU' },
        ],
        alternativaCorretaId: 17,
        explicacoes: [
            {
                alternativaId: 17,
                texto:
                    'Correto! A RAM é volátil e perde seu conteúdo quando fica sem energia. O SSD é não volátil e mantém os arquivos armazenados.',
            },
            {
                alternativaId: 18,
                texto:
                    'As funções estão invertidas: a RAM é volátil, enquanto o SSD mantém os dados mesmo quando o computador está desligado.',
            },
            {
                alternativaId: 19,
                texto:
                    'A RAM perde seu conteúdo sem energia, mas o SSD preserva os arquivos armazenados.',
            },
            {
                alternativaId: 20,
                texto:
                    'A CPU executa instruções. A RAM mantém dados temporários em uso e o SSD guarda dados permanentemente.',
            },
        ],
    },

    {
        id: 6,
        tipo: 'conteudo',
        componente: 'processador',
        pergunta:
            'Qual característica do processador pode influenciar seu desempenho ao executar várias tarefas e programas ao mesmo tempo?',
        alternativas: [
            { id: 21, texto: 'A quantidade de núcleos e a capacidade de processamento' },
            { id: 22, texto: 'A capacidade de armazenamento do SSD' },
            { id: 23, texto: 'A potência elétrica fornecida pela fonte, independentemente do processador' },
            { id: 24, texto: 'O tamanho físico do gabinete' },
        ],
        alternativaCorretaId: 21,
        explicacoes: [
            {
                alternativaId: 21,
                texto:
                    'Correto! A quantidade de núcleos e a capacidade de processamento influenciam a execução de tarefas simultâneas. O desempenho também depende da arquitetura, das frequências de operação, da memória RAM e dos programas utilizados.',
            },
            {
                alternativaId: 22,
                texto:
                    'O SSD influencia o armazenamento de arquivos e os tempos de carregamento, mas sua capacidade não determina diretamente o desempenho de processamento da CPU.',
            },
            {
                alternativaId: 23,
                texto:
                    'A fonte precisa fornecer energia adequada e estável, mas sua potência nominal, por si só, não torna o processador mais rápido.',
            },
            {
                alternativaId: 24,
                texto:
                    'O gabinete influencia o espaço disponível e a refrigeração dos componentes, mas seu tamanho não determina diretamente a capacidade de processamento da CPU.',
            },
        ],
    },
    {
        id: 7,
        tipo: 'intencao',
        intencoes: ['jogos'],
        componente: 'processador',
        pergunta:
            'Ao montar um computador para jogos, por que é importante escolher um processador adequado?',
        alternativas: [
            { id: 25, texto: 'Para evitar que o processador limite o desempenho da placa de vídeo em determinados jogos' },
            { id: 26, texto: 'Para substituir a necessidade de memória RAM' },
            { id: 27, texto: 'Para aumentar automaticamente a capacidade do SSD' },
            { id: 28, texto: 'Para eliminar a necessidade de uma fonte de alimentação' },
        ],
        alternativaCorretaId: 25,
        explicacoes: [
            {
                alternativaId: 25,
                texto:
                    'Correto! Um processador adequado ajuda a manter o desempenho dos jogos, especialmente em situações que exigem muito da CPU. O equilíbrio entre processador e placa de vídeo é importante para evitar gargalos.',
            },
            {
                alternativaId: 26,
                texto:
                    'O processador não substitui a memória RAM. Os dois componentes têm funções diferentes e trabalham em conjunto.',
            },
            {
                alternativaId: 27,
                texto:
                    'A capacidade do SSD depende do próprio dispositivo de armazenamento, não do processador.',
            },
            {
                alternativaId: 28,
                texto:
                    'Todo computador precisa de uma fonte de alimentação adequada para fornecer energia aos componentes.',
            },
        ],
    },
    {
        id: 8,
        tipo: 'intencao',
        intencoes: ['jogos'],
        componente: 'memória RAM',
        pergunta:
            'Qual é a importância da memória RAM em um computador utilizado para jogos?',
        alternativas: [
            { id: 29, texto: 'Manter temporariamente os dados necessários para o jogo e outros programas em execução' },
            { id: 30, texto: 'Armazenar permanentemente todos os jogos instalados' },
            { id: 31, texto: 'Processar sozinha todos os gráficos do jogo' },
            { id: 32, texto: 'Fornecer energia elétrica ao processador e à placa de vídeo' },
        ],
        alternativaCorretaId: 29,
        explicacoes: [
            {
                alternativaId: 29,
                texto:
                    'Correto! A RAM mantém temporariamente os dados que o jogo e o sistema precisam acessar rapidamente. Uma quantidade insuficiente pode causar travamentos e prejudicar a fluidez.',
            },
            {
                alternativaId: 30,
                texto:
                    'Os jogos instalados ficam armazenados no SSD ou HD. A RAM guarda temporariamente os dados utilizados durante a execução.',
            },
            {
                alternativaId: 31,
                texto:
                    'A placa de vídeo é responsável por grande parte do processamento gráfico. A RAM do sistema e a memória da GPU têm funções diferentes.',
            },
            {
                alternativaId: 32,
                texto:
                    'A fonte de alimentação fornece energia aos componentes. A memória RAM armazena temporariamente dados em uso.',
            },
        ],
    },
];
