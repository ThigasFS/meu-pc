
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useOrientacoes } from '../../contexts/OrientacaoContext';

export default function CriarOrientacao() {
  const { criar } = useOrientacoes();
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    setId(criar());
  }, [criar]);

  if (!id) {
    return null;
  }

  return (
    <Navigate
      to={`/orientacao/${id}/intencao`}
      replace
    />
  );
}
