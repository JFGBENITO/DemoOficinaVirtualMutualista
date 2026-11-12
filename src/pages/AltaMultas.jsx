export default function AltaMultas() {
  return (
    <>
      <div className="page-head">
        <div>
          <h3 className="h-title">Alta Servicio de Multas</h3>
          <p className="h-sub">Activa el servicio de notificación de multas de tráfico</p>
        </div>
        <button className="btn primary">Activar servicio</button>
      </div>

      <div className="block">
        <div className="bh"><span className="bic">🚗</span> Servicio de multas de tráfico</div>
        <div className="bb">
          <p style={{ color: 'var(--ink)', marginTop: 0 }}>Recibe avisos directos en tu app cuando haya multas de tráfico pendientes. Disponible para vehículos registrados en tu póliza de automóvil.</p>
          <div className="dl" style={{ marginTop: '16px' }}>
            <Row k="Estado" v="No activado" />
            <Row k="Vehículos disponibles" v="1 (Seat León 1234 ABC)" />
          </div>
        </div>
      </div>
    </>
  );
}

function Row({ k, v }) {
  return <div className="row"><span className="k">{k}</span><span className="v">{v}</span></div>;
}
