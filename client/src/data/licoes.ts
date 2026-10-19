import { componentes } from './componentes';
import { intencoes } from './intencoes';

import type {
  IntencaoOrientacao,
  Licao,
} from './types';

export function montarLicao(
  intencao: IntencaoOrientacao,
): Licao {
  const configuracao = intencoes[intencao];

  return {
    titulo: configuracao.titulo,
    descricao: configuracao.descricao,

    componentePrincipal:
      componentes[configuracao.componentePrincipal],

    componenteSecundario:
      componentes[configuracao.componenteSecundario],
  };
}