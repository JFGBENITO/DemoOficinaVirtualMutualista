export default function GuiaReclamacion() {
  return (
    <>
      <div className="page-head">
        <div>
          <h3 className="h-title">Guía de Actuación ante Reclamación</h3>
          <p className="h-sub">Conoce el procedimiento en caso de desacuerdo o reclamación</p>
        </div>
      </div>

      <div className="block">
        <div className="bh"><span className="bic">📋</span> ¿Cómo reclamar?</div>
        <div className="bb">
          <ol style={{ marginTop: 0, color: 'var(--ink)', fontSize: '14px', lineHeight: '1.8' }}>
            <li><strong>Paso 1:</strong> Intenta resolver el problema directamente contactando con nuestro equipo</li>
            <li><strong>Paso 2:</strong> Si no se resuelve, presenta una reclamación escrita con todos los detalles</li>
            <li><strong>Paso 3:</strong> Tu reclamación será analizada por nuestro departamento</li>
            <li><strong>Paso 4:</strong> Recibirás una respuesta en un plazo máximo de 30 días</li>
          </ol>
        </div>
      </div>

      <div className="block" style={{ marginTop: '18px' }}>
        <div className="bh"><span className="bic">⚖️</span> Derechos del consumidor</div>
        <div className="bb">
          <p style={{ color: 'var(--ink)', fontSize: '14px', margin: 0 }}>
            Si no estás satisfecho con nuestra respuesta, puedes acudir a los organismos de defensa del consumidor
            o a arbitraje sin coste adicional para ti.
          </p>
        </div>
      </div>
    </>
  );
}
