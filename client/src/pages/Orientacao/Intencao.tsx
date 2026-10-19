
import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import {
  type IntencaoOrientacao,
} from '../../interfaces/orientacao';

import { useOrientacao } from '../../hooks/useOrientacao';
import { Backpack, House, SportsEsports, Videocam, Work } from '@mui/icons-material';

const intencoes: {
  valor: IntencaoOrientacao;
  titulo: string;
  descricao: string;
  icon: ReactElement;
}[] = [
  {
    valor: 'jogos',
    titulo: 'Jogar',
    descricao: 'Desempenho em jogos, gráficos e taxas de quadros.',
    icon: <SportsEsports />,
  },
  {
    valor: 'trabalho',
    titulo: 'Trabalhar',
    descricao: 'Produtividade, multitarefa e aplicativos profissionais.',
    icon: <Work />,
  },
  {
    valor: 'estudos',
    titulo: 'Estudar',
    descricao: 'Pesquisas, aulas, programação e atividades acadêmicas.',
    icon: <Backpack />,
  },
  {
    valor: 'edicao-de-video',
    titulo: 'Edição de Vídeo',
    descricao: 'Edição, efeitos e exportação de vídeos e/ou imagens.',
    icon: <Videocam />
  },
  {
    valor: 'casual',
    titulo: 'Casual',
    descricao: 'Navegação, vídeos e tarefas do dia a dia.',
    icon: <House />
  }
];

export default function Intencao() {
  const navigate = useNavigate();
  const { id, intencao, atualizarOrientacao } = useOrientacao();

  const [selecionada, setSelecionada] =
    useState<IntencaoOrientacao | null>(intencao ?? null);

  function continuar() {
    if (!selecionada || !id) {
      return;
    }

    atualizarOrientacao({
      intencao: selecionada,
    });

    navigate(`/orientacao/${id}/licao`);
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
        Qual é o seu objetivo?
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Vamos personalizar o conteúdo para a finalidade que
        você tem em mente.
      </Typography>

      <Box sx={{ display: 'grid', gap: 2 }}>
        {intencoes.map((item) => (
          <Card
            key={item.valor}
            variant="outlined"
            sx={{
              borderColor:
                selecionada === item.valor
                  ? 'primary.main'
                  : 'divider',
              borderWidth: selecionada === item.valor ? 2 : 1,
            }}
          >
            <CardActionArea
              onClick={() => setSelecionada(item.valor)}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {item.icon}
                  {item.titulo}
                </Typography>

                <Typography color="text.secondary">
                  {item.descricao}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button
          variant="contained"
          disabled={!selecionada}
          onClick={continuar}
        >
          Continuar
        </Button>
      </Box>
    </Box>
  );
}
