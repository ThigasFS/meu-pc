import { useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import { useOrientacao } from '../../hooks/useOrientacao';
import { IntencaoOrientacao } from '../../data/types';
import { PCSimples } from '../../interfaces/pc';
import { recomendacoesPorIntencao } from '../../data/recomendacoesPorIntencao';

type PerfilRecomendacao = 'custo-beneficio' | 'desempenho';

const formatarPreco = (valor: number) =>
  valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2,
  });

const nomesIntencoes: Record<IntencaoOrientacao, string> = {
  jogos: 'Jogos',
  trabalho: 'Trabalho',
  estudos: 'Estudos',
  'edicao-de-video': 'Edição de vídeo',
  casual: 'Uso cotidiano',
};

const nomesPerfis: Record<PerfilRecomendacao, string> = {
  'custo-beneficio': 'Custo-benefício',
  desempenho: 'Maior desempenho',
};

export default function Recomendacao() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const orientacao = useOrientacao();

  const intencao = orientacao.intencao;

  const [perfilSelecionado, setPerfilSelecionado] =
    useState<PerfilRecomendacao>('custo-beneficio');

  const dados = useMemo(() => intencao
        ? recomendacoesPorIntencao[intencao]
        : [],
    [intencao],
  );

  const computadores = useMemo(() => {
    if (!intencao) return [];

    const recomendacoes = recomendacoesPorIntencao[intencao];

    return [
      ...recomendacoes.filter(
        (pc) => pc.perfil === 'custo-beneficio',
      ),
      ...recomendacoes.filter(
        (pc) => pc.perfil === 'desempenho',
      ),
    ];
  }, [intencao]);

  const quizPulado = orientacao.pontuacaoQuiz === null && Object.keys(orientacao.respostasQuiz ?? {}).length === 0;

  if (!id) {
    return <Navigate to="/orientacao" replace />;
  }

  if (!intencao) {
    return (
      <Navigate
        to={`/orientacao/${id}/intencao`}
        replace
      />
    );
  }

  if (!dados || dados.length === 0) {
    return (
      <Container sx={{ maxWidth: '900px', mx: 'auto', py: 5 }}>
        <Typography sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
          Ainda não temos computadores recomendados para esta intenção.
        </Typography>

        <Typography sx={{ color: 'text.secondary', mt: 1 }}>
          Novas configurações serão adicionadas em breve.
        </Typography>

        <Button
          sx={{ mt: 3 }}
          onClick={() => navigate(`/orientacao/${id}/licao`)}
        >
          Voltar à lição
        </Button>
      </Container>
    );
  }

  function selecionarComputador(pc: PCSimples) {
    // A seleção precisa ser salva pelo contexto da orientação.
    // Ajuste para o nome real da função que você expuser no provider.
    orientacao.atualizarOrientacao({recomendacao: pc})

    navigate(`/orientacao/${id}/resumo`);
  }

  return (
    <Container sx={{ maxWidth: '1200px', mx: 'auto', py: 4 }}>
      <Stack sx={{ gap: 4 }}>
        {/* Cabeçalho */}
        <Box>
          <Chip
            label={`Intenção: ${nomesIntencoes[intencao]}`}
            sx={{
              mb: 2,
              border: 1,
              borderColor: 'primary.main',
              color: 'primary.main',
              fontWeight: 600,
            }}
          />

          <Typography
            sx={{
              fontSize: { xs: '1.8rem', md: '2.3rem' },
              fontWeight: 700,
              mb: 1,
            }}
          >
            Computadores recomendados
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Compare configurações completas de acordo com seu objetivo,
            considerando preço, vantagens, limitações e benchmarks.
          </Typography>
        </Box>

        {/* Seleção do perfil */}
        <Box>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, mb: 1 }}>
            Qual é sua prioridade?
          </Typography>

          <Grid container spacing={2}>
            {(
              [
                {
                  id: 'custo-beneficio',
                  titulo: 'Custo-benefício',
                  descricao:
                    'Boas opções para equilibrar preço e desempenho.',
                },
                {
                  id: 'desempenho',
                  titulo: 'Desempenho',
                  descricao:
                    'Configurações voltadas a resultados superiores.',
                },
              ] as const
            ).map((perfil) => {
              const selecionado =
                perfilSelecionado === perfil.id;

              return (
                <Grid key={perfil.id} size={{ xs: 12, sm: 6 }}>
                  <Card
                    onClick={() => setPerfilSelecionado(perfil.id)}
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      border: 2,
                      borderColor: selecionado
                        ? 'primary.main'
                        : 'divider',
                      borderRadius: 3,
                      boxShadow: 'none',
                      transition: 'border-color 0.2s',
                      '&:hover': {
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Typography sx={{ fontWeight: 700, mb: 1 }}>
                        {perfil.titulo}
                      </Typography>

                      <Typography
                        sx={{ color: 'text.secondary', fontSize: '0.9rem' }}
                      >
                        {perfil.descricao}
                      </Typography>

                      {selecionado && (
                        <Chip
                          label="Selecionado"
                          sx={{
                            mt: 2,
                            bgcolor: 'action.selected',
                            fontWeight: 600,
                          }}
                        />
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {/* Lista de computadores */}
        <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
          {computadores.map((pc) => (
            <Grid key={pc.id} size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          minHeight: 190,
                          bgcolor: 'action.hover',
                          borderRadius: 2,
                        }}
                      >
                        {pc.gabinete?.imagem ? (
                          <Box
                            component="img"
                            src={pc.gabinete.imagem}
                            alt={pc.gabinete.nome}
                            sx={{
                              width: '100%',
                              height: 190,
                              objectFit: 'contain',
                            }}
                          />
                        ) : (
                          <Box sx={{ textAlign: 'center', p: 2 }}>
                            <Typography
                              sx={{
                                fontSize: '2rem',
                                fontWeight: 700,
                                color: 'text.secondary',
                              }}
                            >
                              PC
                            </Typography>

                            <Typography
                              sx={{
                                fontSize: '0.8rem',
                                color: 'text.secondary',
                              }}
                            >
                              {pc.nome}
                            </Typography>
                          </Box>
                        )}
                      </Box>

                      <Box>
                        <Typography
                          sx={{
                            fontSize: '1.35rem',
                            fontWeight: 700,
                            mb: 1,
                          }}
                        >
                          {pc.nome}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: '0.9rem',
                            color: 'text.secondary',
                          }}
                        >
                          {pc.descricao}
                        </Typography>
                      </Box>

                      <Typography
                        sx={{ fontSize: '1.7rem', fontWeight: 700 }}
                      >
                        {formatarPreco(pc.valorTotal)}
                      </Typography>

                      <Divider />

                      {/* Resumo da montagem */}
                      <Typography sx={{ fontWeight: 700 }}>
                        Configuração
                      </Typography>

                      <Stack sx={{ gap: 1 }}>
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
                            ? [
                                {
                                  titulo: 'Placa de vídeo',
                                  nome: pc.placaVideo.nome,
                                },
                              ]
                            : [
                                {
                                  titulo: 'Gráficos',
                                  nome: pc.videoIntegrado
                                    ? 'Integrados ao processador'
                                    : 'Verificar configuração',
                                },
                              ]),
                        ].map((item) => (
                          <Box
                            key={item.titulo}
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              gap: 2,
                            }}
                          >
                            <Typography
                              sx={{
                                color: 'text.secondary',
                                fontSize: '0.875rem',
                              }}
                            >
                              {item.titulo}
                            </Typography>

                            <Typography
                              sx={{
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                textAlign: 'right',
                              }}
                            >
                              {item.nome}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>

                      <Divider />

                      {/* Vantagens */}
                      <Typography sx={{ fontWeight: 700 }}>
                        Pontos fortes
                      </Typography>

                      <Stack sx={{ gap: 1 }}>
                        {pc.vantagens.map((vantagem) => (
                          <Box
                            key={vantagem}
                            sx={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 1,
                            }}
                          >
                            <Box
                              component="span"
                              sx={{ color: 'success.main' }}
                            >
                              ✓
                            </Box>

                            <Typography sx={{ fontSize: '0.875rem' }}>
                              {vantagem}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>

                      {/* Limitações */}
                      <Typography sx={{ fontWeight: 700 }}>
                        Pontos de atenção
                      </Typography>

                      <Stack sx={{ gap: 1 }}>
                        {pc.limitacoes.map((limitacao) => (
                          <Box
                            key={limitacao}
                            sx={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 1,
                            }}
                          >
                            <Box
                              component="span"
                              sx={{ color: 'warning.main' }}
                            >
                              !
                            </Box>

                            <Typography sx={{ fontSize: '0.875rem' }}>
                              {limitacao}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>

                      <Divider />

                      {/* Benchmarks */}
                      <Typography sx={{ fontWeight: 700 }}>
                        Benchmarks para {nomesIntencoes[intencao]}
                      </Typography>

                      {pc.benchmarks.length > 0 ? (
                        <Stack sx={{ gap: 2 }}>
                          {pc.benchmarks.map((benchmark) => (
                            <Box key={benchmark.nome}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'baseline',
                                  gap: 1,
                                  mb: 0.75,
                                }}
                              >
                                <Typography sx={{ fontSize: '0.875rem' }}>
                                  {benchmark.nome}
                                </Typography>

                                <Typography
                                  sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}
                                >
                                  {benchmark.score}
                                  {benchmark.unidade
                                    ? ` ${benchmark.unidade}`
                                    : ''}
                                </Typography>
                              </Box>

                              <Box
                                sx={{
                                  width: '100%',
                                  height: 8,
                                  bgcolor: 'action.hover',
                                  borderRadius: 10,
                                  overflow: 'hidden',
                                }}
                              >
                                <Box
                                  sx={{
                                    width: `${Math.max(
                                      0,
                                      Math.min(100, benchmark.score),
                                    )}%`,
                                    height: '100%',
                                    bgcolor: '#52F2B8',
                                    borderRadius: 10,
                                  }}
                                />
                              </Box>

                              {benchmark.descricao && (
                                <Typography
                                  sx={{
                                    mt: 0.5,
                                    fontSize: '0.75rem',
                                    color: 'text.secondary',
                                  }}
                                >
                                  {benchmark.descricao}
                                </Typography>
                              )}

                              {benchmark.fonte && (
                                <Typography
                                  component="a"
                                  href={benchmark.fonte}
                                  target="_blank"
                                  rel="noreferrer"
                                  sx={{
                                    display: 'inline-block',
                                    mt: 0.5,
                                    fontSize: '0.75rem',
                                    color: 'primary.main',
                                    textDecoration: 'underline',
                                  }}
                                >
                                  Consultar fonte
                                </Typography>
                              )}
                            </Box>
                          ))}
                        </Stack>
                      ) : (
                        <Typography
                          sx={{
                            fontSize: '0.875rem',
                            color: 'text.secondary',
                          }}
                        >
                          Ainda não há benchmarks cadastrados para esta
                          configuração.
                        </Typography>
                      )}

                      <Box sx={{ flexGrow: 1 }} />
                <Button
                  fullWidth
                  onClick={() => selecionarComputador(pc)}
                  sx={{
                    bgcolor: '#52F2B8',
                    color: '#000',
                    '&:hover': { bgcolor: '#35DDA0' },
                  }}
                >
                  Selecionar computador
                </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Navegação */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Button
            onClick={() =>
              navigate(
                quizPulado
                  ? `/orientacao/${id}/licao`
                  : `/orientacao/${id}/quiz/resultado`,
              )
            }
            sx={{
              color: 'text.primary',
              border: 1,
              borderColor: 'divider',
            }}
          >
            Voltar
          </Button>

          <Typography
            sx={{
              alignSelf: 'center',
              color: 'text.secondary',
              fontSize: '0.8rem',
              textAlign: { xs: 'center', sm: 'right' },
            }}
          >
            Escolha uma configuração para continuar ao resumo.
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
}