export default function TalleresColaboradores() {
  return (
    <>
      <div className="page-head">
        <div>
          <h3 className="h-title">Talleres Colaboradores</h3>
          <p className="h-sub">Red de talleres concertados con precios especiales para mutualistas</p>
        </div>
      </div>

      <div className="block">
        <div className="bh"><span className="bic">🔧</span> Talleres en tu zona</div>
        <div className="bb">
          <p style={{ color: 'var(--ink)', marginTop: 0 }}>Accede a nuestros talleres colaboradores con descuentos exclusivos en reparación, mantenimiento y servicios de automóvil.</p>
          <button className="btn primary" style={{ marginTop: '16px' }}>Ver talleres cercanos</button>
        </div>
      </div>

      <div className="block" style={{ marginTop: '18px' }}>
        <div className="bh"><span className="bic">📍</span> Cómo funciona</div>
        <div className="bb">
          <ol style={{ marginTop: 0, color: 'var(--ink)', fontSize: '14px' }}>
            <li>Busca talleres en tu zona</li>
            <li>Llama directamente o reserva cita online</li>
            <li>Presenta tu carnet de mutualista o solicita el descuento</li>
            <li>Disfruta de servicios de calidad a mejores precios</li>
          </ol>
        </div>
      </div>
    </>
  );
}
