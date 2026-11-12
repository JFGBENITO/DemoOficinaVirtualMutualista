export default function MisDatos({ user }) {
  return (
    <>
      <div className="page-head">
        <div>
          <h3 className="h-title">Mis Datos</h3>
          <p className="h-sub">Gestiona tus datos personales y preferencias</p>
        </div>
      </div>

      <div className="block">
        <div className="bh"><span className="bic">👤</span> Información personal</div>
        <div className="bb">
          <div className="dl">
            <Row k="Nombre completo" v={user?.nombre || 'No disponible'} />
            <Row k="Email" v="usuario@correo.com" />
            <Row k="Teléfono" v="600000000" />
            <Row k="Documento de identidad" v="00000000A" />
          </div>
        </div>
      </div>

      <div className="block" style={{ marginTop: '18px' }}>
        <div className="bh"><span className="bic">🔔</span> Preferencias de notificaciones</div>
        <div className="bb">
          <label className="check" style={{ marginBottom: '10px' }}>
            <input type="checkbox" defaultChecked /> Recibir avisos por email
          </label>
          <label className="check" style={{ marginBottom: '10px' }}>
            <input type="checkbox" defaultChecked /> Recibir avisos por SMS
          </label>
          <label className="check">
            <input type="checkbox" /> Recibir boletín informativo
          </label>
        </div>
      </div>
    </>
  );
}

function Row({ k, v }) {
  return <div className="row"><span className="k">{k}</span><span className="v">{v}</span></div>;
}
