import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { useOrientacao } from '../../hooks/useOrientacao';

export default function OrientacaoLayout() {
  const { id } = useParams();
  const location = useLocation();
  const orientacao = useOrientacao();

  if (!orientacao.encontrada) {
    return <Navigate to="/orientacao" replace />;
  }

  const exigeIntencao = location.pathname !== `/orientacao/${id}/intencao`;

  if (exigeIntencao && !orientacao.intencao) {
    return (
      <Navigate
        to={`/orientacao/${id}/intencao`}
        replace
      />
    );
  }

  return (
    <div>
      {/* Cabeçalho e progresso entram aqui */}
      <Outlet />
    </div>
  );
}