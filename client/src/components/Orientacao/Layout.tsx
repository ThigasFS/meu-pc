
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { useOrientacao } from '../../hooks/useOrientacao';

export default function OrientacaoLayout() {
  const { id } = useParams();
  const location = useLocation();

  const orientacao = useOrientacao();

  if (!orientacao) {
    return <Navigate to="/orientacao" replace />;
  }

  const exigeIntencao =
    location.pathname.endsWith('/licao') ||
    location.pathname.endsWith('/quiz') ||
    location.pathname.endsWith('/quiz/resultado') ||
    location.pathname.endsWith('/recomendacao') ||
    location.pathname === `/orientacao/${id}`;

  if (exigeIntencao && orientacao.intencao === null) {
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
