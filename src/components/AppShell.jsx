function initials(name) {
  if (!name) return 'MU';
  return name.trim().split(/\s+/).slice(0, 2).map((s) => s[0]).join('').toUpperCase();
}

// Navegación principal: secciones de uso frecuente, siempre visibles en la barra superior.
// El resto de accesos (Mis Datos, Club AMA, Multas, Talleres, Coches, Reclamación, Privacidad)
// se ofrecen como Accesos rápidos contextuales dentro de Inicio y de cada póliza.
const NAV = [
  { key: 'home', icon: '▦', label: 'Inicio' },
  { key: 'polizas', icon: '🛡', label: 'Mis pólizas' },
  { key: 'siniestros', icon: '🛠', label: 'Siniestros' },
  { key: 'pagos', icon: '🧾', label: 'Pagos' },
  { key: 'documentos', icon: '🗂', label: 'Documentos' },
  { key: 'mensajes', icon: '💬', label: 'Mensajes' },
];

// view.name -> pestaña activa en la barra superior.
const ACTIVE_BY_VIEW = {
  home: 'home', polizas: 'polizas', detalle: 'polizas',
  siniestros: 'siniestros', pagos: 'pagos', documentos: 'documentos', mensajes: 'mensajes',
};

// view.name -> migas de pan (la última es la página actual).
const CRUMBS = {
  home: ['Inicio'],
  polizas: ['Inicio', 'Mis pólizas'],
  detalle: ['Inicio', 'Mis pólizas', 'Datos de producto'],
  datos: ['Inicio', 'Mis Datos'],
  siniestros: ['Inicio', 'Siniestros'],
  pagos: ['Inicio', 'Pagos'],
  documentos: ['Inicio', 'Documentos'],
  mensajes: ['Inicio', 'Mensajes'],
  multas: ['Inicio', 'Alta servicio Multas'],
  club: ['Inicio', 'Acceso Club AMA'],
  talleres: ['Inicio', 'Talleres Colaboradores'],
  coches: ['Inicio', 'Ofertas Coches Recuperados'],
  reclamacion: ['Inicio', 'Guía Actuación Reclamación'],
  privacidad: ['Inicio', 'Protección de datos'],
};

export default function AppShell({ user, view, onNavigate, onLogout, children }) {
  const active = ACTIVE_BY_VIEW[view.name] || null;
  const parts = CRUMBS[view.name] || ['Inicio'];

  return (
    <div className="app">
      <header className="appbar">
        <img className="appbar-logo" src="/ama-logo.png" alt="A.M.A. Agrupación Mutual Aseguradora" />
        <span className="crumb">
          {parts.map((p, i) => (
            <span key={p}>{i > 0 && ' · '}{i === parts.length - 1 ? <b>{p}</b> : p}</span>
          ))}
        </span>
        <div className="search"><span>🔎</span><input placeholder="Buscar póliza, recibo o siniestro…" aria-label="Buscar" /></div>
        <button className="bell" aria-label="Notificaciones">🔔</button>
        <div className="user">
          <span className="avatar">{initials(user?.nombre)}</span>
          <div className="uinfo"><b>{user?.nombre || 'Mutualista'}</b><small>Mutualista</small></div>
        </div>
        <button className="appbar-logout" onClick={onLogout} aria-label="Cerrar sesión" title="Cerrar sesión">
          <i>⏻</i><span>Salir</span>
        </button>
      </header>
      <nav className="topnav">
        {NAV.map((n) => (
          <button key={n.key} className={`tnav${active === n.key ? ' on' : ''}`} onClick={() => onNavigate({ name: n.key })}>
            <i>{n.icon}</i><span>{n.label}</span>
          </button>
        ))}
      </nav>
      <div className="page">{children}</div>
    </div>
  );
}
