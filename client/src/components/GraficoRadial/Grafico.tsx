import { Box, Typography } from '@mui/material';
import { Scores } from '../../data/recomendacao';

interface GraficoRadialProps {
  titulo: string;
  scores: Scores;
}

const eixos: {
  chave: keyof Scores;
  titulo: string;
}[] = [
  { chave: 'scoreCompetitivo', titulo: 'Competitivo' },
  { chave: 'scoreGrafico', titulo: 'Gráficos' },
  { chave: 'scoreMultitarefa', titulo: 'Multitarefa' },
  { chave: 'scoreProdutividade', titulo: 'Produtividade' },
  { chave: 'scoreEficiencia', titulo: 'Eficiência' },
];

const centro = 150;
const raio = 90;
const maxScore = 10;

function coordenada(
  indice: number,
  valor: number,
  quantidade: number,
) {
  const angulo =
    (Math.PI * 2 * indice) / quantidade - Math.PI / 2;

  const distancia = (valor / maxScore) * raio;

  return {
    x: centro + Math.cos(angulo) * distancia,
    y: centro + Math.sin(angulo) * distancia,
  };
}

export default function GraficoRadial({
  titulo,
  scores,
}: GraficoRadialProps) {
  const quantidade = eixos.length;

  const pontos = eixos
    .map((eixo, indice) => {
      const valor = Math.max(
        0,
        Math.min(maxScore, scores[eixo.chave]),
      );

      const ponto = coordenada(indice, valor, quantidade);

      return `${ponto.x},${ponto.y}`;
    })
    .join(' ');

  return (
    <Box sx={{ width: '100%', maxWidth: 380, mx: 'auto' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, textAlign: "center" }}>
        {titulo}
      </Typography>

      <svg
        viewBox="0 0 300 300"
        role="img"
        aria-label={`Gráfico radial: ${titulo}`}
        style={{ width: '100%', height: 'auto' }}
      >
        {/* Grades do gráfico */}
        {[2, 4, 6, 8, 10].map((nivel) => {
          const pontosGrade = eixos
            .map((_, indice) => {
              const ponto = coordenada(
                indice,
                nivel,
                quantidade,
              );

              return `${ponto.x},${ponto.y}`;
            })
            .join(' ');

          return (
            <polygon
              key={nivel}
              points={pontosGrade}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.2}
              strokeWidth={1}
            />
          );
        })}

        {/* Eixos */}
        {eixos.map((_, indice) => {
          const ponto = coordenada(
            indice,
            maxScore,
            quantidade,
          );

          return (
            <line
              key={eixos[indice].chave}
              x1={centro}
              y1={centro}
              x2={ponto.x}
              y2={ponto.y}
              stroke="currentColor"
              strokeOpacity={0.25}
            />
          );
        })}

        {/* Área do produto */}
        <polygon
          points={pontos}
          fill="#52F2B8"
          fillOpacity={0.22}
          stroke="#52F2B8"
          strokeWidth={2}
        />

        {/* Pontos */}
        {eixos.map((eixo, indice) => {
          const ponto = coordenada(
            indice,
            scores[eixo.chave],
            quantidade,
          );

          return (
            <circle
              key={eixo.chave}
              cx={ponto.x}
              cy={ponto.y}
              r={3}
              fill="#52F2B8"
            />
          );
        })}

        {/* Rótulos */}
        {eixos.map((eixo, indice) => {
          const ponto = coordenada(
            indice,
            12,
            quantidade,
          );

          const alinhamento =
            ponto.x < centro - 10
              ? 'end'
              : ponto.x > centro + 10
                ? 'start'
                : 'middle';

          return (
            <text
              key={eixo.chave}
              x={ponto.x}
              y={ponto.y}
              textAnchor={alinhamento}
              dominantBaseline="middle"
              fill="currentColor"
              fontSize={10}
            >
              {eixo.titulo}
            </text>
          );
        })}
      </svg>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ textAlign: "center", display: "block" }}
      >
        Escala de 0 a 10. Valores maiores representam resultados
        melhores na dimensão indicada.
      </Typography>
    </Box>
  );
}