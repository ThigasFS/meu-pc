import { Questao } from "./types";

export const questoes: Questao[] = [
  {
    id: 1,
    tipo: 'Orçamento',
    pergunta: 'Quanto pretende investir no computador?',
    peso: 3,
  },
  {
    id: 2,
    tipo: 'Perfil',
    pergunta: 'Qual é sua principal prioridade ao comprar um computador?',
    peso: 3,
    opcoes: [
      {
        id: 1,
        etiqueta: 'Economizar',
        descricao: 'Quero gastar o mínimo possível atendendo às minhas necessidades.',
        valor: 'custo-beneficio',
      },
      {
        id: 2,
        etiqueta: 'Equilíbrio',
        descricao: 'Quero equilibrar preço e desempenho.',
        valor: 'hibrido',
      },
      {
        id: 3,
        etiqueta: 'Desempenho',
        descricao: 'Prefiro investir mais para obter maior desempenho.',
        valor: 'desempenho',
      },
    ],
  },
  {
    id: 3,
    tipo: 'Dimensão',
    pergunta: 'Quantos programas costuma utilizar simultaneamente?',
    peso: 2,
    opcoes: [
      { id: 4, etiqueta: 'Poucos', descricao: 'Um ou dois programas.', valor: 1 },
      { id: 5, etiqueta: 'Alguns', descricao: 'Três ou quatro programas.', valor: 2 },
      { id: 6, etiqueta: 'Vários', descricao: 'Cinco ou mais programas.', valor: 3 },
    ],
  },
  {
    id: 4,
    tipo: 'Dimensão',
    pergunta: 'Como você classificaria a complexidade das tarefas que pretende executar?',
    peso: 3,
    opcoes: [
      { id: 7, etiqueta: 'Simples', descricao: 'Navegação, documentos e aplicativos leves.', valor: 1 },
      { id: 8, etiqueta: 'Intermediárias', descricao: 'Programas profissionais e tarefas moderadas.', valor: 2 },
      { id: 9, etiqueta: 'Avançadas', descricao: 'Aplicações exigentes e processamento intenso.', valor: 3 },
    ],
  },
  {
    id: 5,
    tipo: 'Dimensão',
    pergunta: 'Qual importância você dá ao desempenho gráfico?',
    peso: 3,
    opcoes: [
      { id: 10, etiqueta: 'Baixa', descricao: 'Gráficos básicos são suficientes.', valor: 1 },
      { id: 11, etiqueta: 'Média', descricao: 'Preciso executar aplicações com recursos gráficos moderados.', valor: 2 },
      { id: 12, etiqueta: 'Alta', descricao: 'Preciso de alto desempenho gráfico.', valor: 3 },
    ],
  },
  {
    id: 6,
    tipo: 'Dimensão',
    pergunta: 'Qual capacidade de memória RAM considera adequada?',
    peso: 2,
    opcoes: [
      { id: 13, etiqueta: '8 GB', valor: 8 },
      { id: 14, etiqueta: '16 GB', valor: 16 },
      { id: 15, etiqueta: '32 GB', valor: 32 },
      { id: 16, etiqueta: '64 GB ou mais', valor: 64 },
    ],
  },
  {
    id: 7,
    tipo: 'Dimensão',
    pergunta: 'Quanto espaço deseja ter para armazenar seus arquivos?',
    peso: 2,
    opcoes: [
      { id: 17, etiqueta: 'Até 500 GB', valor: 500 },
      { id: 18, etiqueta: '1 TB', valor: 1000 },
      { id: 19, etiqueta: '2 TB', valor: 2000 },
      { id: 20, etiqueta: 'Mais de 2 TB', valor: 4000 },
    ],
  },
  {
    id: 8,
    tipo: 'Dimensão',
    pergunta: 'O que considera mais importante no armazenamento?',
    peso: 2,
    opcoes: [
      { id: 21, etiqueta: 'Velocidade', descricao: 'Quero iniciar o sistema e abrir programas rapidamente.', valor: 'velocidade' },
      { id: 22, etiqueta: 'Capacidade', descricao: 'Quero armazenar muitos arquivos e projetos.', valor: 'capacidade' },
      { id: 23, etiqueta: 'Equilíbrio', descricao: 'Quero espaço suficiente sem abrir mão da velocidade.', valor: 'equilibrio' },
    ],
  },
  {
    id: 9,
    tipo: 'Dimensão',
    pergunta: 'Você pretende atualizar os componentes do computador futuramente?',
    peso: 1,
    opcoes: [
      { id: 24, etiqueta: 'Sim', descricao: 'Pretendo adicionar ou substituir componentes.', valor: 'sim' },
      { id: 25, etiqueta: 'Não', descricao: 'Pretendo manter a configuração atual.', valor: 'nao' },
      { id: 26, etiqueta: 'Talvez', descricao: 'Ainda não tenho certeza.', valor: 'talvez' },
    ],
  },
  {
    id: 10,
    tipo: 'Dimensão',
    pergunta: 'Qual componente você considera mais importante para seu computador?',
    peso: 2,
    opcoes: [
      { id: 27, etiqueta: 'Processador (CPU)', valor: 'cpu' },
      { id: 28, etiqueta: 'Placa de vídeo (GPU)', valor: 'gpu' },
      { id: 29, etiqueta: 'Memória RAM', valor: 'ram' },
      { id: 30, etiqueta: 'Armazenamento', valor: 'armazenamento' },
      { id: 31, etiqueta: 'Todos igualmente', valor: 'equilibrio' },
    ],
  },
];