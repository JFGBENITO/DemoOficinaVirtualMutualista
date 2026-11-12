export default function ClubAMA() {
  return (
    <>
      <div className="page-head">
        <div>
          <h3 className="h-title">Acceso Club AMA</h3>
          <p className="h-sub">Descubre los beneficios exclusivos para nuestros mutualistas</p>
        </div>
      </div>

      <div className="block">
        <div className="bh"><span className="bic">🎯</span> Club AMA Premium</div>
        <div className="bb">
          <p style={{ color: 'var(--ink)', marginTop: 0 }}>Disfruta de descuentos y servicios exclusivos en hostelería, ocio, viajes y más.</p>
          <button className="btn primary" style={{ marginTop: '16px' }}>Acceder al Club</button>
        </div>
      </div>

      <div className="block" style={{ marginTop: '18px' }}>
        <div className="bh"><span className="bic">💳</span> Beneficios disponibles</div>
        <div className="bb">
          <ul style={{ marginTop: 0, color: 'var(--ink)', fontSize: '14px' }}>
            <li>Descuentos en restaurantes y bares</li>
            <li>Ofertas en viajes y hoteles</li>
            <li>Actividades de ocio y eventos</li>
            <li>Servicios de bienestar y salud</li>
          </ul>
        </div>
      </div>
    </>
  );
}
