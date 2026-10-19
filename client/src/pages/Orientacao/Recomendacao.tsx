import { useMemo } from 'react';
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
import GraficoRadial from '../../components/GraficoRadial/Grafico';
import { recomendacoes } from '../../data/recomendacao';

const formatarPreco = (valor: number) =>
  valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2,
  });

export default function Recomendacao() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const orientacao = useOrientacao();

  const intencao = orientacao.intencao;

  const dados = useMemo(
    () =>
      intencao
        ? recomendacoes.find(
            (item) => item.intencao === intencao,
          )
        : undefined,
    [intencao],
  );

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

  if (!dados || dados.recomendacoes.length === 0) {
    return (
      <Container sx={{ py: 5, maxWidth: '900px', mx: 'auto' }}>
        <Typography
          sx={{ fontSize: '1.5rem', fontWeight: 700 }}
        >
          Ainda não temos recomendações para esta intenção.
        </Typography>

        <Typography sx={{ color: 'text.secondary', mt: 1 }}>
          Novas comparações serão adicionadas em breve.
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

  const custoBeneficio = dados.recomendacoes.find(
    (produto) => produto.perfil === 'custo-beneficio',
  );

  const melhorDesempenho = dados.recomendacoes.find(
    (produto) => produto.perfil === 'desempenho',
  );

  const produtos = [
    ...new Map(
      [custoBeneficio, melhorDesempenho]
        .filter((produto) => produto !== undefined)
        .map((produto) => [produto.id, produto]),
    ).values(),
  ];

  const perfis = [
    {
      titulo: 'Melhor custo-benefício',
      produto: custoBeneficio,
      cor: 'success.main',
      fundo: 'success.light',
    },
    {
      titulo: 'Maior desempenho',
      produto: melhorDesempenho,
      cor: 'primary.main',
      fundo: 'action.hover',
    },
  ];

  return (
    <Container sx={{ maxWidth: '1200px', mx: 'auto', py: 4 }}>
      <Stack sx={{ gap: 4 }}>
        {/* Cabeçalho */}
        <Box>
          <Chip
            label={`Intenção: ${intencao}`}
            sx={{
              mb: 2,
              borderRadius: 2,
              border: 1,
              borderColor: 'primary.main',
              color: 'primary.main',
            }}
          />

          <Typography
            sx={{
              fontSize: { xs: '1.8rem', md: '2.3rem' },
              fontWeight: 700,
              mb: 1,
            }}
          >
            {dados.titulo}
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            {dados.descricao}
          </Typography>
        </Box>

        {/* Recomendações */}
        <Grid container spacing={3}>
          {perfis.map(({ titulo, produto, cor }) => (
            <Grid key={titulo} size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  height: '100%',
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 3,
                  boxShadow: 'none',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Chip
                    label={titulo}
                    sx={{
                      mb: 2,
                      fontWeight: 700,
                      color: cor,
                      bgcolor: 'action.hover',
                    }}
                  />

                  {produto ? (
                    <Stack sx={{ gap: 2 }}>
                      <Box
                        component="img"
                        src={produto.imagem}
                        alt={produto.nome}
                        sx={{
                          width: '100%',
                          height: 180,
                          objectFit: 'contain',
                        }}
                      />

                      <Typography
                        sx={{ fontSize: '1.25rem', fontWeight: 700 }}
                      >
                        {produto.nome}
                      </Typography>

                      <Typography
                        sx={{ fontSize: '1.6rem', fontWeight: 700 }}
                      >
                        {formatarPreco(produto.precoMedio)}
                      </Typography>

                      <Typography sx={{ color: 'text.secondary' }}>
                        Score de desempenho:{' '}
                        <Box
                          component="span"
                          sx={{ fontWeight: 700, color: 'text.primary' }}
                        >
                          {produto.scoreDesempenho}/100
                        </Box>
                      </Typography>

                      <Divider />

                      <Typography sx={{ fontWeight: 700 }}>
                        Vantagens
                      </Typography>

                      <Stack sx={{ gap: 1 }}>
                        {produto.vantagens.map((vantagem) => (
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

                            <Typography sx={{ fontSize: '0.9rem' }}>
                              {vantagem}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>

                      <Typography sx={{ fontWeight: 700 }}>
                        Desvantagens
                      </Typography>

                      <Stack sx={{ gap: 1 }}>
                        {produto.desvantagens.map((desvantagem) => (
                          <Box
                            key={desvantagem}
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

                            <Typography sx={{ fontSize: '0.9rem' }}>
                              {desvantagem}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Stack>
                  ) : (
                    <Typography sx={{ color: 'text.secondary' }}>
                      Não há um produto cadastrado para este perfil.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Gráficos radiais */}
        <Box>
          <Typography
            sx={{
              fontSize: '1.5rem',
              fontWeight: 700,
              mb: 1,
            }}
          >
            Comparação de desempenho
          </Typography>

          <Typography sx={{ color: 'text.secondary', mb: 3 }}>
            Compare os resultados relativos dos produtos em diferentes
            tipos de uso.
          </Typography>

          <Grid container spacing={3}>
            {produtos.map((produto) => (
              <Grid key={produto.id} size={{ xs: 12, md: 6 }}>
                <Card
                  sx={{
                    height: '100%',
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 3,
                    boxShadow: 'none',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <GraficoRadial
                      titulo={produto.nome}
                      scores={produto.scores}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Comparação de preço */}
        <Box>
          <Typography
            sx={{
              fontSize: '1.5rem',
              fontWeight: 700,
              mb: 1,
            }}
          >
            Desempenho por preço
          </Typography>

          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            O preço por ponto indica quanto você paga por cada ponto do
            score geral de desempenho. Quanto menor, melhor o custo por
            ponto.
          </Typography>

          <Card
            sx={{
              border: 1,
              borderColor: 'divider',
              borderRadius: 3,
              boxShadow: 'none',
            }}
          >
            {produtos.map((produto, index) => (
              <Box key={produto.id}>
                <Grid
                  container
                  spacing={2}
                  sx={{ p: 2, alignItems: "center" }}
                >
                  <Grid size={{ xs: 12, sm: 5 }}>
                    <Typography sx={{ fontWeight: 600 }}>
                      {produto.nome}
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Typography
                      sx={{ fontSize: '0.8rem', color: 'text.secondary' }}
                    >
                      Preço médio
                    </Typography>

                    <Typography sx={{ fontWeight: 600 }}>
                      {formatarPreco(produto.precoMedio)}
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 6, sm: 4 }}>
                    <Typography
                      sx={{ fontSize: '0.8rem', color: 'text.secondary' }}
                    >
                      Preço por ponto
                    </Typography>

                    <Typography sx={{ fontWeight: 600 }}>
                      {produto.scoreDesempenho > 0
                        ? formatarPreco(
                            produto.precoMedio / produto.scoreDesempenho,
                          )
                        : 'Indisponível'}
                    </Typography>
                  </Grid>
                </Grid>

                {index < produtos.length - 1 && <Divider />}
              </Box>
            ))}
          </Card>
        </Box>

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
            sx={{ alignSelf: { xs: 'stretch', sm: 'auto' } }}
            onClick={() =>
              navigate(`/orientacao/${id}/quiz/resultado`)
            }
          >
            Voltar ao resultado do quiz
          </Button>

          <Button
            sx={{
              alignSelf: { xs: 'stretch', sm: 'auto' },
              bgcolor: '#52F2B8',
              color: '#000',
              fontWeight: 700,
              '&:hover': { bgcolor: '#3DDDA4' },
            }}
            onClick={() => navigate(`/orientacao/${id}/resumo`)}
          >
            Concluir orientação
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}