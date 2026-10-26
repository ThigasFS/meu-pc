
import { Navigate, useNavigate, useParams } from 'react-router-dom';

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

export default function ResultadoQuiz() {
  const { id } = useParams<{ id: string }>();
  const { obter, atualizar } = useOrientacoes();

  const navigate = useNavigate();

  const orientacao = id ? obter(id) : undefined;
  const resultado = orientacao?.resultadoQuiz;

  if (!id || !orientacao) {
    return <Navigate to="/orientacao" replace />;
  }

  if (!orientacao.intencao) {
    return (
      <Navigate to={`/orientacao/${id}/intencao`} replace />
    );
  }

  if (!resultado) {
    return <Navigate to={`/orientacao/${id}/quiz`} replace />;
  }

  const reiniciarQuiz = () => {
    atualizar(id, {
      perguntasQuiz: [],
      indicePerguntaQuiz: 0,
      respostasQuiz: {},
      pontuacaoQuiz: null,
      resultadoQuiz: null,
    });
  };

  const mensagemResultado =
    resultado.pontuacao >= 80
      ? 'Excelente! Você demonstrou um bom conhecimento sobre hardware.'
      : resultado.pontuacao >= 60
        ? 'Bom trabalho! Você já conhece vários conceitos importantes.'
        : 'Continue aprendendo! Revise os conceitos e tente novamente.';

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 4 } }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Resultado do quiz
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Confira seu desempenho e revise as respostas.
          </Typography>
        </Box>

        <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 } }}>
          <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <Typography color="text.secondary">
              Sua pontuação
            </Typography>

            <Typography
              variant="h2"
              sx={{ fontWeight: 800, color: 'primary.main' }}
            >
              {resultado.pontuacao}%
            </Typography>

            <Typography variant="h6" sx={{ textAlign: 'center' }}>
              {mensagemResultado}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
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
          </Stack>
        </Paper>

        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            Revisão das respostas
          </Typography>

          <Stack spacing={2}>
            {resultado.perguntas.map((pergunta, index) => {
              const alternativaSelecionada =
                pergunta.alternativas.find(
                  (alternativa) =>
                    alternativa.id === pergunta.alternativaSelecionadaId,
                );

              const alternativaCorreta =
                pergunta.alternativas.find(
                  (alternativa) =>
                    alternativa.id === pergunta.alternativaCorretaId,
                );

              const explicacao = pergunta.explicacoes.find(
                (item) =>
                  item.alternativaId === pergunta.alternativaSelecionadaId,
              );

              return (
                <Paper
                  key={pergunta.id}
                  variant="outlined"
                  sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}
                >
                  <Stack spacing={2}>
                    <Stack
                      direction="row"
                      sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
                      spacing={1}
                    >
                      <Typography sx={{ fontWeight: 700, flex: 1 }}>
                        {index + 1}. {pergunta.pergunta}
                      </Typography>

                      <Chip
                        size="small"
                        color={pergunta.acertou ? 'success' : 'error'}
                        label={pergunta.acertou ? 'Acertou' : 'Errou'}
                      />
                    </Stack>

                    <Typography variant="body2" color="text.secondary">
                      {pergunta.tipo === 'intencao'
                        ? 'Relacionado à sua intenção'
                        : 'Conhecimentos de hardware'}
                    </Typography>

                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Sua resposta
                      </Typography>

                      <Typography>
                        {alternativaSelecionada?.texto ??
                          'Alternativa não encontrada'}
                      </Typography>
                    </Box>

                    {!pergunta.acertou && (
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Resposta correta
                        </Typography>

                        <Typography sx={{ color: 'success.main' }}>
                          {alternativaCorreta?.texto ??
                            'Alternativa correta não encontrada'}
                        </Typography>
                      </Box>
                    )}

                    <Divider />

                    <Box>
                      <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
                        Explicação
                      </Typography>

                      <Typography color="text.secondary">
                        {explicacao?.texto ??
                          'Não há explicação cadastrada para esta alternativa.'}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              );
            })}
          </Stack>
        </Box>

        <Alert severity="info">
          Você pode refazer o quiz para testar novamente seus conhecimentos.
        </Alert>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ justifyContent: 'space-between' }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              reiniciarQuiz();
            }}
          >
            Refazer quiz
          </Button>

          <Button
            variant="contained"
            onClick={() =>
              navigate(`/orientacao/${id}/recomendacao`)
            }
          >
            Continuar para recomendação
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
