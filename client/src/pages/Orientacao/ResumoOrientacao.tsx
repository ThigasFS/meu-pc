
import { useNavigate, useParams } from 'react-router-dom';

import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { useOrientacoes } from '../../contexts/OrientacaoContext';
import type { IntencaoOrientacao } from '../../data/types';

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

function formatarPreco(valor: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}

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

  const resultado = orientacao.resultadoQuiz;
  const recomendacao = orientacao.recomendacao;

  const quizConcluido = resultado !== null;
  const recomendacaoSelecionada = recomendacao !== null;

  function concluirOrientacao(){
    if(!id || !orientacao) return

    atualizar(id, {concluida: true})
    navigate('/')
  }

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

        {/* 2. Aprendizados */}
        <Paper
          variant="outlined"
          sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3 }}
        >
          <Stack spacing={2}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              2. O que você aprendeu
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

        {/* 3. Resultado do quiz */}
        <Paper
          variant="outlined"
          sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3 }}
        >
          <Stack spacing={2}>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ alignItems: 'center', flexWrap: 'wrap' }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                3. Resultado do quiz
              </Typography>

              <Chip
                size="small"
                label={quizConcluido ? 'Concluído' : 'Pendente'}
                color={quizConcluido ? 'success' : 'default'}
              />
            </Stack>

            {resultado ? (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    gap: 3,
                  }}
                >
                  <Box sx={{ minWidth: { sm: 150 } }}>
                    <Typography
                      variant="h2"
                      sx={{ fontWeight: 800, color: 'primary.main' }}
                    >
                      {resultado.pontuacao}%
                    </Typography>

                    <Typography color="text.secondary">
                      de aproveitamento
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1, width: '100%' }}>
                    <LinearProgress
                      variant="determinate"
                      value={resultado.pontuacao}
                      sx={{ height: 10, borderRadius: 5, mb: 2 }}
                    />

                    <Stack
                      direction="row"
                      spacing={1}
                      useFlexGap
                      sx={{ flexWrap: 'wrap' }}
                    >
                      <Chip
                        color="success"
                        label={`${resultado.totalAcertos} acertos`}
                      />

                      <Chip
                        color="error"
                        label={`${resultado.totalErros} erros`}
                      />

                      <Chip
                        label={`${resultado.totalPerguntas} perguntas`}
                      />
                    </Stack>
                  </Box>
                </Box>

                <Typography color="text.secondary">
                  {resultado.pontuacao >= 80
                    ? 'Excelente! Você demonstrou um bom domínio dos conceitos abordados.'
                    : resultado.pontuacao >= 60
                      ? 'Bom trabalho! Revisar alguns conceitos pode ajudar você a avançar ainda mais.'
                      : 'Continue estudando! Revisar a lição e as explicações das respostas pode ajudar.'}
                </Typography>

                <Box>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      navigate(`/orientacao/${id}/quiz/resultado`)
                    }
                  >
                    Revisar respostas
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography color="text.secondary">
                  Você ainda não concluiu o quiz. Responda às perguntas
                  para conferir seu desempenho e revisar os conceitos.
                </Typography>

                <Box>
                  <Button
                    variant="contained"
                    disabled={!orientacao.intencao}
                    onClick={() =>
                      navigate(`/orientacao/${id}/quiz`)
                    }
                  >
                    Começar quiz
                  </Button>
                </Box>
              </>
            )}
          </Stack>
        </Paper>

        {/* 4. Recomendação */}
        <Paper
          variant="outlined"
          sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3 }}
        >
          <Stack spacing={2}>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ alignItems: 'center', flexWrap: 'wrap' }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                4. Sua recomendação
              </Typography>

              <Chip
                size="small"
                label={
                  recomendacaoSelecionada
                    ? 'Selecionada'
                    : 'Pendente'
                }
                color={recomendacaoSelecionada ? 'success' : 'default'}
              />
            </Stack>

            {recomendacao ? (
              <>
                <Typography variant="h6" color="primary">
                  {recomendacao.nome}
                </Typography>

                <Typography color="text.secondary">
                  {recomendacao.descricao}
                </Typography>

                <Divider />

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    Valor total estimado
                  </Typography>

                  <Typography variant="h4" sx={{ fontWeight: 800 }}>
                    {formatarPreco(recomendacao.valorTotal)}
                  </Typography>
                </Box>

                <Box>
                  <Typography sx={{ fontWeight: 700, mb: 1 }}>
                    Perfil
                  </Typography>

                  <Chip
                    label={
                      recomendacao.perfil === 'custo-beneficio'
                        ? 'Custo-benefício'
                        : 'Desempenho'
                    }
                    color="primary"
                    variant="outlined"
                  />
                </Box>

                {recomendacao.vantagens.length > 0 && (
                  <Box>
                    <Typography sx={{ fontWeight: 700, mb: 1 }}>
                      Pontos fortes
                    </Typography>

                    <Stack spacing={1}>
                      {recomendacao.vantagens.map((vantagem) => (
                        <Typography key={vantagem}>
                          <Typography
                            component="span"
                            color="success.main"
                            sx={{ fontWeight: 700, mr: 1 }}
                          >
                            +
                          </Typography>
                          {vantagem}
                        </Typography>
                      ))}
                    </Stack>
                  </Box>
                )}

                {recomendacao.limitacoes.length > 0 && (
                  <Box>
                    <Typography sx={{ fontWeight: 700, mb: 1 }}>
                      Limitações
                    </Typography>

                    <Stack spacing={1}>
                      {recomendacao.limitacoes.map((limitacao) => (
                        <Typography key={limitacao}>
                          <Typography
                            component="span"
                            color="warning.main"
                            sx={{ fontWeight: 700, mr: 1 }}
                          >
                            !
                          </Typography>
                          {limitacao}
                        </Typography>
                      ))}
                    </Stack>
                  </Box>
                )}

                <Box>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      navigate(`/orientacao/${id}/recomendacao`)
                    }
                  >
                    Ver recomendação completa
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography color="text.secondary">
                  Você ainda não selecionou um computador. Compare as
                  configurações disponíveis e escolha a que melhor
                  atende ao seu objetivo.
                </Typography>

                <Box>
                  <Button
                    variant="contained"
                    disabled={!orientacao.intencao}
                    onClick={() =>
                      navigate(`/orientacao/${id}/recomendacao`)
                    }
                  >
                    Ver computadores recomendados
                  </Button>
                </Box>
              </>
            )}
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
