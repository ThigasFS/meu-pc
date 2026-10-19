
import { useParams } from 'react-router-dom';

import { useOrientacoes } from '../contexts/OrientacaoContext';
import type { Orientacao } from '../interfaces/orientacao';

interface UseOrientacaoResult extends Partial<Orientacao> {
  atualizarOrientacao: (
    alteracoes: Partial<Orientacao>,
  ) => void;
}

export function useOrientacao(): UseOrientacaoResult {
  const { id } = useParams<{ id: string }>();
  const { obter, atualizar } = useOrientacoes();

  const dados = id ? obter(id) : undefined;

  const atualizarOrientacao = (
    alteracoes: Partial<Orientacao>,
  ): void => {
    if (!id || !dados) {
      throw new Error('Orientação não encontrada.');
    }

    atualizar(id, alteracoes);
  };

  return {
    ...dados,
    id,
    atualizarOrientacao,
  };
}
