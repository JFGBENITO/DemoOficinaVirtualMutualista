export default function CochesRecuperados() {
  return (
    <>
      <div className="page-head">
        <div>
          <h3 className="h-title">Ofertas Coches Recuperados de Robo</h3>
          <p className="h-sub">Vehículos de calidad a precios especiales para nuestros mutualistas</p>
        </div>
      </div>

      <div className="block">
        <div className="bh"><span className="bic">🚙</span> Catálogo de vehículos</div>
        <div className="bb">
          <p style={{ color: 'var(--ink)', marginTop: 0 }}>A.M.A. trabajar con nuestros colaboradores para ofrecerte coches recuperados de robo completamente restaurados, con documentación en regla y garantía.</p>
          <button className="btn primary" style={{ marginTop: '16px' }}>Ver catálogo</button>
        </div>
      </div>

      <div className="block" style={{ marginTop: '18px' }}>
        <div className="bh"><span className="bic">✓</span> Garantía y seguridad</div>
        <div className="bb">
          <ul style={{ marginTop: 0, color: 'var(--ink)', fontSize: '14px' }}>
            <li>Documentación legal completa</li>
            <li>Revisión técnica integral</li>
            <li>Garantía de 12 meses</li>
            <li>Financiación disponible</li>
          </ul>
        </div>
      </div>
    </>
  );
}
