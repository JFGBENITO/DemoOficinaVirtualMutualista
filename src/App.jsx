import { useEffect, useState } from 'react';
import { api, getToken, setToken } from './api.js';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import PolicyDetail from './pages/PolicyDetail.jsx';
import Polizas from './pages/Polizas.jsx';
import Siniestros from './pages/Siniestros.jsx';
import Pagos from './pages/Pagos.jsx';
import Documentos from './pages/Documentos.jsx';
import Mensajes from './pages/Mensajes.jsx';
import MisDatos from './pages/MisDatos.jsx';
import AltaMultas from './pages/AltaMultas.jsx';
import ClubAMA from './pages/ClubAMA.jsx';
import TalleresColaboradores from './pages/TalleresColaboradores.jsx';
import CochesRecuperados from './pages/CochesRecuperados.jsx';
import GuiaReclamacion from './pages/GuiaReclamacion.jsx';
import ProteccionDatos from './pages/ProteccionDatos.jsx';
import AppShell from './components/AppShell.jsx';

export default function App() {
  const [authed, setAuthed] = useState(!!getToken());
  const [user, setUser] = useState(null);
  const [view, setView] = useState({ name: 'home' });

  // Al recargar con token válido, recupera el nombre del mutualista.
  useEffect(() => {
    if (authed && !user) {
      api.mutualista().then(setUser).catch(doLogout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  function onLogin(u) {
    setUser(u);
    setAuthed(true);
    setView({ name: 'home' });
  }
  async function doLogout() {
    try { await api.logout(); } catch { /* sesión ya invalidada */ }
    setToken(null);
    setUser(null);
    setAuthed(false);
  }

  if (!authed) return <Login onLogin={onLogin} />;

  return (
    <AppShell user={user} view={view} onNavigate={setView} onLogout={doLogout}>
      {view.name === 'home' && <Home user={user} navigate={setView} />}
      {view.name === 'polizas' && <Polizas navigate={setView} />}
      {view.name === 'detalle' && <PolicyDetail polizaId={view.polizaId} navigate={setView} />}
      {view.name === 'datos' && <MisDatos user={user} />}
      {view.name === 'siniestros' && <Siniestros navigate={setView} />}
      {view.name === 'pagos' && <Pagos navigate={setView} />}
      {view.name === 'documentos' && <Documentos navigate={setView} />}
      {view.name === 'mensajes' && <Mensajes />}
      {view.name === 'multas' && <AltaMultas />}
      {view.name === 'club' && <ClubAMA />}
      {view.name === 'talleres' && <TalleresColaboradores />}
      {view.name === 'coches' && <CochesRecuperados />}
      {view.name === 'reclamacion' && <GuiaReclamacion />}
      {view.name === 'privacidad' && <ProteccionDatos />}
    </AppShell>
  );
}
