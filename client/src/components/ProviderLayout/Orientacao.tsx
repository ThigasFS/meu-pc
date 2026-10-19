
import { Outlet } from 'react-router-dom';
import { OrientacaoProvider } from '../../contexts/OrientacaoContext';

export default function OrientacaoProviderLayout() {
  return (
    <OrientacaoProvider>
      <Outlet />
    </OrientacaoProvider>
  );
}
