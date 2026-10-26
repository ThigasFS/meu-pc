
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';

import type { Orientacao } from '../../interfaces/orientacao';
import type { IntencaoOrientacao } from '../../data/types';

interface OrientacaoCardProps {
  orientacao: Orientacao;
  onRemove?: (id: string) => void;
}

const intencoes: Record<IntencaoOrientacao, string> = {
  jogos: 'Jogos',
  trabalho: 'Trabalho',
  estudos: 'Estudos',
  'edicao-de-video': 'Edição de vídeo',
  casual: 'Uso casual',
};

export default function OrientacaoCard({
  orientacao,
  onRemove,
}: OrientacaoCardProps) {
  const navigate = useNavigate();

  const temIntencao = orientacao.intencao !== null;
  const quizConcluido = orientacao.resultadoQuiz !== null;
  const recomendacaoSelecionada = orientacao.recomendacao !== null;

  const etapasConcluidas = [
    temIntencao,
    quizConcluido,
    recomendacaoSelecionada,
  ].filter(Boolean).length;

  const progresso = (etapasConcluidas / 3) * 100;

  const status = orientacao.concluida
    ? 'Concluída'
    : etapasConcluidas === 0
      ? 'Não iniciada'
      : 'Em andamento';

  const corStatus = orientacao.concluida
    ? 'success'
    : etapasConcluidas === 0
      ? 'default'
      : 'primary';

  const abrirOrientacao = () => {
    navigate(`/orientacao/${orientacao.id}`);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#1e1e1e',
        color: '#f5f5f5',
        border: '1px solid #333333',
        borderRadius: 3,
        transition: 'background-color 0.2s, box-shadow 0.2s, transform 0.2s',
        '&:hover': {
        bgcolor: '#252525',
        borderColor: '#484848',
        boxShadow: 4,
        transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                bgcolor: 'action.hover',
                color: 'primary.main',
                flexShrink: 0,
              }}
            >
              <Typography sx={{ fontSize: 24 }}>🎓</Typography>
            </Box>

            <Chip
              label={status}
              color={corStatus}
              size="small"
              variant={orientacao.concluida ? 'filled' : 'outlined'}
            />
          </Stack>

          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                overflowWrap: 'anywhere',
              }}
            >
              {temIntencao
                ? `Orientação para ${intencoes[orientacao.intencao!]}`
                : 'Nova orientação'}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {temIntencao
                ? `Objetivo: ${intencoes[orientacao.intencao!]}`
                : 'Defina seu objetivo para começar a aprender sobre hardware.'}
            </Typography>
          </Box>

          <Box>
            <Stack
              direction="row"
              sx={{ mb: 1, justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography variant="body2" color="text.secondary">
                Progresso
              </Typography>

              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {etapasConcluidas}/3 etapas
              </Typography>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={orientacao.concluida ? 100 : progresso}
              sx={{
                height: 7,
                borderRadius: 4,
              }}
            />
          </Box>

          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ flexWrap: 'wrap' }}
          >
            <Chip
              size="small"
              label={temIntencao ? 'Intenção definida' : 'Intenção pendente'}
              variant="outlined"
              sx={{ color: 'white' }}
            />

            <Chip
              size="small"
              label={quizConcluido ? 'Quiz concluído' : 'Quiz pendente'}
              variant="outlined"
              sx={{ color: 'white' }}
            />

            <Chip
              size="small"
              label={
                recomendacaoSelecionada
                  ? 'PC selecionado'
                  : 'PC não selecionado'
              }
              variant="outlined"
              sx={{ color: 'white' }}
            />
          </Stack>
        </Stack>
      </CardContent>

      <CardActions
        sx={{
          p: 2.5,
          pt: 0,
          gap: 1,
          justifyContent: 'space-between',
        }}
      >
        <Button
          variant="contained"
          onClick={abrirOrientacao}
          sx={{ flexGrow: 1 }}
        >
          {orientacao.concluida ? 'Visualizar' : 'Continuar'}
        </Button>

        {onRemove && (
          <Button
            color="error"
            variant="outlined"
            onClick={() => onRemove(orientacao.id)}
          >
            Excluir
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
