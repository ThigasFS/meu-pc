
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import {
  Alert,
  Box,
  Button,
  LinearProgress,
  Paper,
  Radio,
  Stack,
  Typography,
} from '@mui/material';
import { useOrientacoes } from '../../contexts/OrientacaoContext';
import { PerguntaQuiz, RespostaQuiz } from '../../interfaces/quiz';
import { calcularResultadoQuiz, selecionarPerguntasQuiz } from '../../utils/quiz';



export default function Quiz() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { obter, atualizar } = useOrientacoes();

  const orientacao = id ? obter(id) : undefined;

  const [alternativaSelecionada, setAlternativaSelecionada] =
    useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const perguntas = orientacao?.perguntasQuiz ?? [];
  const indiceAtual = orientacao?.indicePerguntaQuiz ?? 0;
  const perguntaAtual: PerguntaQuiz | undefined = perguntas[indiceAtual];

  const respostaSalva = perguntaAtual
    ? orientacao?.respostasQuiz[String(perguntaAtual.id)]
    : undefined;

  const respondida = respostaSalva !== undefined;
  const totalPerguntas = perguntas.length;

  useEffect(() => {
    if (!id || !orientacao?.intencao) return;
    if (orientacao.resultadoQuiz) return;
    if (orientacao.perguntasQuiz.length > 0) return;

    try {
      const sorteadas = selecionarPerguntasQuiz(orientacao.intencao);

      atualizar(id, {
        perguntasQuiz: sorteadas,
        indicePerguntaQuiz: 0,
        respostasQuiz: {},
        pontuacaoQuiz: null,
        resultadoQuiz: null,
      });

      setErro(null);
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Não foi possível iniciar o quiz.',
      );
    }
  }, [
    id,
    orientacao?.intencao,
    orientacao?.perguntasQuiz,
    orientacao?.resultadoQuiz,
    atualizar,
  ]);

  useEffect(() => {
    setAlternativaSelecionada(respostaSalva ?? null);
  }, [perguntaAtual?.id, respostaSalva]);

  if (!id || !orientacao) {
    return <Navigate to="/orientacao" replace />;
  }

  if (!orientacao.intencao) {
    return (
      <Navigate to={`/orientacao/${id}/intencao`} replace />
    );
  }

  if (orientacao.resultadoQuiz) {
    return (
      <Navigate
        to={`/orientacao/${id}/quiz/resultado`}
        replace
      />
    );
  }

  if (erro) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Alert severity="error">{erro}</Alert>
        <Typography sx={{ mt: 2 }}>
          Verifique se existem perguntas suficientes para a intenção
          selecionada no arquivo de perguntas do quiz.
        </Typography>
      </Box>
    );
  }

  if (!perguntaAtual) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Typography>Preparando o quiz...</Typography>
      </Box>
    );
  }

  const confirmarResposta = () => {
    if (alternativaSelecionada === null) return;

    const respostasAtualizadas: Record<string, string> = {
      ...orientacao.respostasQuiz,
      [String(perguntaAtual.id)]: alternativaSelecionada,
    };

    atualizar(id, {
      respostasQuiz: respostasAtualizadas,
    });
  };

  const avancar = () => {
    if (!respondida || indiceAtual >= totalPerguntas - 1) return;

    atualizar(id, {
      indicePerguntaQuiz: indiceAtual + 1,
    });
  };

  const voltar = () => {
    if (indiceAtual <= 0) return;

    atualizar(id, {
      indicePerguntaQuiz: indiceAtual - 1,
    });
  };

  const finalizarQuiz = () => {
    if (!respondida || perguntas.length === 0) return;

    const respostas: RespostaQuiz[] = perguntas.map((pergunta) => ({
      perguntaId: pergunta.id,
      alternativaId: Number(
        orientacao.respostasQuiz[String(pergunta.id)],
      ),
    }));

    if (
      respostas.some(
        (resposta) => !Number.isFinite(resposta.alternativaId),
      )
    ) {
      return;
    }

    const resultado = calcularResultadoQuiz(perguntas, respostas);

    atualizar(id, {
      resultadoQuiz: resultado,
      pontuacaoQuiz: resultado.pontuacao,
    });

    navigate(`/orientacao/${id}/quiz/resultado`);
  };

  const explicacao = respondida
    ? perguntaAtual.explicacoes.find(
        (item) => item.alternativaId === Number(respostaSalva),
      )
    : undefined;

  const acertou =
    respondida &&
    Number(respostaSalva) === perguntaAtual.alternativaCorretaId;

  const ultimaPergunta = indiceAtual === totalPerguntas - 1;
  const progresso =
    totalPerguntas > 0
      ? ((indiceAtual + 1) / totalPerguntas) * 100
      : 0;

  return (
    <Box sx={{ maxWidth: 850, mx: 'auto', p: { xs: 2, md: 4 } }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Quiz de hardware
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Pergunta {indiceAtual + 1} de {totalPerguntas}
          </Typography>

          <LinearProgress
            variant="determinate"
            value={progresso}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
          <Typography
            variant="overline"
            color="primary"
            sx={{ fontWeight: 700 }}
          >
            {perguntaAtual.tipo === 'intencao'
              ? 'Relacionado à sua intenção'
              : 'Conhecimentos de hardware'}
          </Typography>

          <Typography variant="h6" sx={{ mt: 2, mb: 3 }}>
            {perguntaAtual.pergunta}
          </Typography>

          <Stack spacing={1.5}>
            {perguntaAtual.alternativas.map((alternativa) => {
              const selecionada =
                alternativaSelecionada === String(alternativa.id);

              const alternativaCorreta =
                alternativa.id === perguntaAtual.alternativaCorretaId;

              return (
                <Paper
                  key={alternativa.id}
                  variant="outlined"
                  sx={{
                    borderColor:
                      respondida && alternativaCorreta
                        ? 'success.main'
                        : selecionada
                          ? 'primary.main'
                          : 'divider',
                    borderWidth: selecionada || (respondida && alternativaCorreta)
                      ? 2
                      : 1,
                    borderRadius: 2,
                  }}
                >
                  <Button
                    fullWidth
                    disabled={respondida}
                    onClick={() =>
                      setAlternativaSelecionada(String(alternativa.id))
                    }
                    sx={{
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                      color: 'text.primary',
                      px: 2,
                      py: 1.5,
                      whiteSpace: 'normal',
                    }}
                  >
                    <Radio
                      checked={selecionada}
                      sx={{ mr: 1 }}
                    />
                    {alternativa.texto}
                  </Button>
                </Paper>
              );
            })}
          </Stack>

          {respondida && (
            <Alert
              severity={acertou ? 'success' : 'error'}
              sx={{ mt: 3 }}
            >
              <Typography sx={{ fontWeight: 700 }}>
                {acertou ? 'Resposta correta!' : 'Resposta incorreta.'}
              </Typography>

              {explicacao?.texto ??
                'Não há explicação cadastrada para esta alternativa.'}
            </Alert>
          )}
        </Paper>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ justifyContent: 'space-between' }}
        >
          <Button
            variant="outlined"
            onClick={voltar}
            disabled={indiceAtual === 0}
          >
            Anterior
          </Button>

          {!respondida ? (
            <Button
              variant="contained"
              onClick={confirmarResposta}
              disabled={alternativaSelecionada === null}
            >
              Confirmar resposta
            </Button>
          ) : ultimaPergunta ? (
            <Button
              variant="contained"
              onClick={finalizarQuiz}
            >
              Ver resultado
            </Button>
          ) : (
            <Button variant="contained" onClick={avancar}>
              Próxima pergunta
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
