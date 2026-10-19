
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import {
  criarOrientacao as criarOrientacaoInicial,
  type Orientacao,
} from '../interfaces/orientacao';

interface OrientacaoContextValue {
  criar: () => string;
  obter: (id: string) => Orientacao | undefined;
  atualizar: (
    id: string,
    alteracoes: Partial<Orientacao>,
  ) => void;
}

const OrientacaoContext =
  createContext<OrientacaoContextValue | null>(null);

const STORAGE_KEY = 'orientacoes';

function carregarOrientacoes(): Record<string, Orientacao> {
  try {
    const dados = sessionStorage.getItem(STORAGE_KEY);
    return dados ? JSON.parse(dados) : {};
  } catch {
    return {};
  }
}

export function OrientacaoProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [orientacoes, setOrientacoes] =
    useState<Record<string, Orientacao>>(carregarOrientacoes);

  useEffect(() => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(orientacoes),
    );
  }, [orientacoes]);

  const criar = useCallback(() => {
    const id = crypto.randomUUID();
    const orientacao = criarOrientacaoInicial(id);

    setOrientacoes((atuais) => ({
      ...atuais,
      [id]: orientacao,
    }));

    return id;
  }, []);

  const obter = useCallback(
    (id: string) => orientacoes[id],
    [orientacoes],
  );

  const atualizar = useCallback(
    (id: string, alteracoes: Partial<Orientacao>) => {
      setOrientacoes((atuais) => {
        const existente = atuais[id];

        if (!existente) {
          return atuais;
        }

        return {
          ...atuais,
          [id]: {
            ...existente,
            ...alteracoes,
            id: existente.id,
          },
        };
      });
    },
    [],
  );

  return (
    <OrientacaoContext.Provider
      value={{ criar, obter, atualizar }}
    >
      {children}
    </OrientacaoContext.Provider>
  );
}

export function useOrientacoes() {
  const contexto = useContext(OrientacaoContext);

  if (!contexto) {
    throw new Error(
      'useOrientacoes deve ser usado dentro de OrientacaoProvider.',
    );
  }

  return contexto;
}
