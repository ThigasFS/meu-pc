import { useNavigate, Navigate, useParams } from 'react-router-dom';

import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import {
  coresDestaque,
  type ConteudoComponente,
  type ItemDestaque,
  type ParteNome,
} from '../../data/types';
import { useOrientacao } from '../../hooks/useOrientacao';
import { titulosIntencoes } from '../../data/intencoes';
import { montarLicao } from '../../data/licoes';

function renderizarNome(
  partesNome: ParteNome[],
  pontos: ItemDestaque[],
) {
  const coresPorId = new Map(
    pontos.map((ponto) => [ponto.id, ponto.cor]),
  );

  return partesNome.map((parte, index) => {
    const cor = parte.destaque
      ? coresPorId.get(parte.destaque)
      : undefined;

    return (
      <Box
        key={`${parte.texto}-${index}`}
        component="span"
        sx={{
          color: cor ? coresDestaque[cor] : 'inherit',
          fontWeight: cor ? 700 : 400,
        }}
      >
        {parte.texto}
      </Box>
    );
  });
}

interface SecaoComponenteProps {
  tituloSecao: string;
  componente: ConteudoComponente;
}

function SecaoComponente({
  tituloSecao,
  componente,
}: SecaoComponenteProps) {
  return (
    <Box>
      <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'baseline' }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
          {tituloSecao}:
        </Typography>

        <Typography variant='h6' color="text.secondary" sx={{ mb: 2 }}>
          {componente.titulo}
        </Typography>
      </Stack>

      <Grid container spacing={3} sx={{ alignItems: 'flex-start' }}>
        {/* Pontos educativos */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={2}>
            {componente.pontosImportantes.map((ponto) => (
              <Box
                key={ponto.id}
                sx={{
                  borderLeft: 8,
                  borderColor: coresDestaque[ponto.cor],
                  pl: 2,
                  py: 0.5,
                }}
              >
                <Typography sx={{ fontWeight: 700 }}>
                  {ponto.titulo}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {ponto.descricao}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Grid>

        {/* Exemplos de produtos */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={2}>
            {componente.exemplos.map((exemplo) => (
              <Paper
                key={exemplo.nome}
                variant="outlined"
                sx={{ p: 2 }}
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  sx={{ alignItems: { xs: 'flex-start', sm: 'center' } }}
                >
                  <Box
                    component="img"
                    src={exemplo.imagem}
                    alt={exemplo.nome}
                    sx={{
                      width: { xs: '100%', sm: 250 },
                      height: 250,
                      objectFit: 'contain',
                      flexShrink: 0,
                    }}
                  />

                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {renderizarNome(
                        exemplo.partesNome,
                        componente.pontosImportantes,
                      )}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {exemplo.descricao}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default function Licao() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const orientacao = useOrientacao();

  const intencao = orientacao.intencao;

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

  const licao = montarLicao(intencao);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        {/* Cabeçalho */}
        <Box>
          <Chip
            label={`Objetivo: ${titulosIntencoes[intencao]}`}
            color="primary"
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>
            {licao.titulo}
          </Typography>

          <Typography color="text.secondary">
            {licao.descricao}
          </Typography>
        </Box>

        <Divider />

        {/* Componente principal */}
        <SecaoComponente
          tituloSecao="Componente principal"
          componente={licao.componentePrincipal}
        />

        <Divider />

        {/* Componente secundário */}
        <SecaoComponente
          tituloSecao="Componente complementar"
          componente={licao.componenteSecundario}
        />

        <Divider />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate(`/home`)}
            color='inherit'
          >
            Voltar
          </Button>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate(`/orientacao/${id}/recomendacao`)}
              color='secondary'
            >
              Pular Quiz
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate(`/orientacao/${id}/quiz`)}
            >
              Ir para o quiz
            </Button>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}