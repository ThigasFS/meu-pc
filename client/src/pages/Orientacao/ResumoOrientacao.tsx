
import { useNavigate, useParams } from 'react-router-dom';

import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { useOrientacoes } from '../../contexts/OrientacaoContext';
import type { IntencaoOrientacao } from '../../data/types';
import { questoes } from '../../data/questoes';

const resumoIntencoes: Record<IntencaoOrientacao, { titulo: string; descricao: string; focos: string[]; }> = {
  jogos: {
    titulo: 'Computador para jogos',
    descricao:
      'Seu objetivo é conhecer os componentes que influenciam o desempenho em jogos, buscando uma boa experiência gráfica e uma execução fluida.',
    focos: [
      'Placa de vídeo e desempenho gráfico.',
      'Processador e desempenho durante os jogos.',
      'Memória RAM e fluidez.',
      'Equilíbrio entre os componentes.',
    ],
  },
  trabalho: {
    titulo: 'Computador para trabalho',
    descricao:
      'Seu objetivo é entender como escolher componentes que atendam às tarefas profissionais e permitam trabalhar com produtividade.',
    focos: [
      'Processador e desempenho nas tarefas.',
      'Memória RAM para executar vários programas.',
      'Armazenamento e velocidade de acesso aos arquivos.',
      'Configuração adequada aos programas utilizados.',
    ],
  },
  estudos: {
    titulo: 'Computador para estudos',
    descricao:
      'Seu objetivo é conhecer os componentes necessários para estudar, pesquisar, utilizar plataformas educacionais e executar tarefas acadêmicas.',
    focos: [
      'Processador para tarefas do dia a dia.',
      'Memória RAM para navegador e aplicativos.',
      'SSD para iniciar o sistema e abrir programas.',
      'Equilíbrio entre custo e necessidade.',
    ],
  },
  'edicao-de-video': {
    titulo: 'Computador para edição de vídeo',
    descricao:
      'Seu objetivo é entender quais componentes contribuem para editar vídeos, aplicar efeitos e exportar projetos com eficiência.',
    focos: [
      'Processador para edição e exportação.',
      'Placa de vídeo para tarefas aceleradas por GPU.',
      'Memória RAM para projetos maiores.',
      'Armazenamento para arquivos e projetos.',
    ],
  },
  casual: {
    titulo: 'Computador para uso casual',
    descricao:
      'Seu objetivo é conhecer uma configuração adequada para navegar na internet, assistir a vídeos, utilizar aplicativos e realizar tarefas cotidianas.',
    focos: [
      'Processador adequado ao uso cotidiano.',
      'Memória RAM para manter aplicativos abertos.',
      'SSD para melhorar a experiência de uso.',
      'Custo-benefício sem gastar além do necessário.',
    ],
  },
};

export default function ResumoOrientacao() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { obter, atualizar } = useOrientacoes();

  const orientacao = id ? obter(id) : undefined;

  if (!id || !orientacao) {
    return (
      <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
        <Alert severity="warning">
          Não foi possível encontrar esta orientação.
        </Alert>

        <Button
          sx={{ mt: 2 }}
          variant="contained"
          onClick={() => navigate('/orientacao')}
        >
          Criar orientação
        </Button>
      </Box>
    );
  }

  const intencao = orientacao.intencao
    ? resumoIntencoes[orientacao.intencao]
    : null;

  function concluirOrientacao() {
    if (!id || !orientacao) return

    atualizar(id, { concluida: true })
    navigate('/')
  }

  const respostas = orientacao.criterios?.respostas ?? {};

  const respostasExibicao = questoes.map((questao) => {
    const respostaId = respostas[questao.id];

    const opcao = questao.opcoes?.find(
      (item) => item.id === Number(respostaId),
    );

    return {
      id: questao.id,
      pergunta: questao.pergunta,
      resposta: opcao?.etiqueta ?? 'Não informado',
    };
  });

  return (
    <Box
      sx={{
        maxWidth: 1000,
        mx: 'auto',
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 5 },
      }}
    >
      <Stack spacing={4}>
        {/* Cabeçalho */}
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, mb: 1 }}
          >
            Resumo da orientação
          </Typography>

          <Typography color="text.secondary">
            Confira seu objetivo, os principais aprendizados,
            seu desempenho e a recomendação de computador.
          </Typography>
        </Box>

        {/* 1. Intenção */}
        <Paper
          variant="outlined"
          sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3 }}
        >
          <Stack spacing={2}>
            <Stack
              direction="row"
              sx={{ alignItems: 'center' }}
              spacing={1}
            >
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                1. Sua intenção
              </Typography>

              <Chip
                size="small"
                label={intencao ? 'Definida' : 'Pendente'}
                color={intencao ? 'success' : 'default'}
              />
            </Stack>

            {intencao ? (
              <>
                <Typography variant="h6" color="primary">
                  {intencao.titulo}
                </Typography>

                <Typography color="text.secondary">
                  {intencao.descricao}
                </Typography>

                <Box>
                  <Typography sx={{ fontWeight: 700, mb: 1 }}>
                    O que vamos priorizar
                  </Typography>

                  <Stack spacing={1}>
                    {intencao.focos.map((foco) => (
                      <Stack
                        key={foco}
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: 'flex-start' }}
                      >
                        <Typography color="primary">•</Typography>
                        <Typography>{foco}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </>
            ) : (
              <Typography color="text.secondary">
                Você ainda não selecionou uma intenção para sua orientação.
              </Typography>
            )}

            <Box>
              <Button
                variant="outlined"
                onClick={() =>
                  navigate(`/orientacao/${id}/intencao`)
                }
              >
                {intencao ? 'Alterar intenção' : 'Escolher intenção'}
              </Button>
            </Box>
          </Stack>
        </Paper>

        {/* 3. Recomendações */}
        <Paper
          variant="outlined"
          sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3 }}
        >
          <Stack spacing={3}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                2. Computadores recomendados
              </Typography>

              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Com base na sua intenção e nos critérios informados,
                o sistema gerou as seguintes recomendações.
              </Typography>
            </Box>

            {/* Critérios utilizados */}
            <Box>
              <Typography sx={{ fontWeight: 700, mb: 1 }}>
                Critérios considerados
              </Typography>

              <Stack direction="row" spacing={1} useFlexGap sx={{}}>
                {orientacao.criterios?.orcamento != null && (
                  <Chip
                    label={`Orçamento: ${orientacao.criterios.orcamento.toLocaleString(
                      'pt-BR',
                      { style: 'currency', currency: 'BRL' },
                    )}`}
                    variant="outlined"
                  />
                )}

                {orientacao.criterios?.perfil && (
                  <Chip
                    label={`Perfil: ${orientacao.criterios.perfil === 'custo-beneficio'
                        ? 'Custo-benefício'
                        : orientacao.criterios.perfil === 'desempenho'
                          ? 'Desempenho'
                          : 'Híbrido'
                      }`}
                    variant="outlined"
                  />
                )}
              </Stack>
            </Box>

            <Button
              variant="outlined"
              sx={{ alignSelf: 'flex-start' }}
              onClick={() => navigate(`/orientacao/${id}/recomendacao`)}
            >
              Consultar recomendações completas
            </Button>

            {/* Lista de recomendações */}
            {orientacao.recomendacoes?.length > 0 ? (
              <Stack spacing={2}>
                {orientacao.recomendacoes.map((pc, index) => (
                  <Paper
                    key={pc.id}
                    variant="outlined"
                    sx={{ p: 2.5, borderRadius: 2 }}
                  >
                    <Stack spacing={2}>
                      <Box>
                        <Chip
                          size="small"
                          label={`Recomendação ${index + 1}`}
                          color="primary"
                          variant="outlined"
                          sx={{ mb: 1 }}
                        />

                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {pc.nome}
                        </Typography>

                        <Typography color="text.secondary">
                          {pc.descricao}
                        </Typography>
                      </Box>

                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700 }}
                      >
                        {pc.valorTotal.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </Typography>

                      <Divider />

                      <Typography sx={{ fontWeight: 700 }}>
                        Configuração
                      </Typography>

                      <Stack spacing={1}>
                        {[
                          {
                            titulo: 'Processador',
                            nome: pc.processador.nome,
                          },
                          {
                            titulo: 'Placa-mãe',
                            nome: pc.placaMae.nome,
                          },
                          {
                            titulo: 'Memória RAM',
                            nome: `${pc.memoriaRam.capacidade} GB`,
                          },
                          {
                            titulo: 'Armazenamento',
                            nome: `${pc.armazenamento.capacidade} ${pc.armazenamento.unidade}`,
                          },
                          ...(pc.placaVideo
                            ? [{
                              titulo: 'Placa de vídeo',
                              nome: pc.placaVideo.nome,
                            }]
                            : [{
                              titulo: 'Gráficos',
                              nome: pc.videoIntegrado
                                ? 'Integrados ao processador'
                                : 'Não informado',
                            }]),
                        ].map((item) => (
                          <Box
                            key={item.titulo}
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              gap: 2,
                            }}
                          >
                            <Typography color="text.secondary">
                              {item.titulo}
                            </Typography>

                            <Typography
                              sx={{ fontWeight: 600, textAlign: 'right' }}
                            >
                              {item.nome}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>

                      <Divider />

                      <Typography sx={{ fontWeight: 700 }}>
                        Pontos fortes
                      </Typography>

                      {pc.vantagens.map((vantagem) => (
                        <Typography key={vantagem} variant="body2">
                          • {vantagem}
                        </Typography>
                      ))}

                      <Typography sx={{ fontWeight: 700 }}>
                        Pontos de atenção
                      </Typography>

                      {pc.limitacoes.map((limitacao) => (
                        <Typography key={limitacao} variant="body2">
                          • {limitacao}
                        </Typography>
                      ))}
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            ) : (
              <Alert severity="info">
                Ainda não existem recomendações registradas para esta orientação.
                Acesse a etapa de recomendação para gerar as configurações.
              </Alert>
            )}
          </Stack>
        </Paper>

        {/* 2. Aprendizados */}
        <Paper
          variant="outlined"
          sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3 }}
        >
          <Stack spacing={2}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              3. O que você aprendeu
            </Typography>

            {intencao ? (
              <>
                <Typography color="text.secondary">
                  Durante a lição, você teve contato com conceitos
                  importantes para entender como os componentes
                  trabalham juntos em um computador voltado para
                  <Typography
                    component="span"
                    sx={{ fontWeight: 700, color: 'text.primary' }}
                  >
                    {' '}{intencao.titulo.toLowerCase()}.
                  </Typography>
                </Typography>

                <Typography sx={{ fontWeight: 700 }}>
                  Principais pontos para lembrar
                </Typography>

                <Stack spacing={1.5}>
                  {intencao.focos.slice(0, 3).map((foco, index) => (
                    <Box
                      key={foco}
                      sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'flex-start',
                      }}
                    >
                      <Box
                        sx={{
                          minWidth: 32,
                          height: 32,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 2,
                          bgcolor: 'action.hover',
                          fontWeight: 700,
                        }}
                      >
                        {index + 1}
                      </Box>

                      <Typography sx={{ pt: 0.5 }}>
                        {foco}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </>
            ) : (
              <Typography color="text.secondary">
                Escolha uma intenção para visualizar os principais
                assuntos relacionados ao seu objetivo.
              </Typography>
            )}

            <Box>
              <Button
                variant="outlined"
                disabled={!orientacao.intencao}
                onClick={() =>
                  navigate(`/orientacao/${id}/licao`)
                }
              >
                Revisar lição completa
              </Button>
            </Box>
          </Stack>
        </Paper>

        {/* Encerramento */}
        <Button
          variant="contained"
          size="large"
          onClick={concluirOrientacao}
        >
          Concluir orientação
        </Button>
      </Stack>
    </Box>
  );
}
