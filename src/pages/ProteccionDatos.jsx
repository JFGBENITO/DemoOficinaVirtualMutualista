export default function ProteccionDatos() {
  return (
    <>
      <div className="page-head">
        <div>
          <h3 className="h-title">Protección de Datos</h3>
          <p className="h-sub">Información sobre cómo protegemos tu privacidad y tus derechos</p>
        </div>
      </div>

      <div className="block">
        <div className="bh"><span className="bic">🔒</span> Política de privacidad</div>
        <div className="bb">
          <p style={{ color: 'var(--ink)', marginTop: 0 }}>
            A.M.A. se compromete a proteger tu privacidad conforme a la normativa de protección de datos
            (RGPD) y la legislación española aplicable.
          </p>
          <button className="btn ghost small" style={{ marginTop: '12px' }}>Leer política completa</button>
        </div>
      </div>

      <div className="block" style={{ marginTop: '18px' }}>
        <div className="bh"><span className="bic">📌</span> Tus derechos</div>
        <div className="bb">
          <ul style={{ marginTop: 0, color: 'var(--ink)', fontSize: '14px' }}>
            <li><strong>Derecho de acceso:</strong> Puedes solicitar una copia de tus datos personales</li>
            <li><strong>Derecho de rectificación:</strong> Puedes corregir datos inexactos</li>
            <li><strong>Derecho de supresión:</strong> Puedes solicitar la eliminación de tus datos</li>
            <li><strong>Derecho a la portabilidad:</strong> Puedes obtener tus datos en formato estructurado</li>
            <li><strong>Derecho de oposición:</strong> Puedes oponerme al tratamiento de tus datos</li>
          </ul>
        </div>
      </div>

      <div className="block" style={{ marginTop: '18px' }}>
        <div className="bh"><span className="bic">📧</span> Contacto</div>
        <div className="bb">
          <p style={{ color: 'var(--ink)', marginTop: 0, fontSize: '14px' }}>
            Para ejercer cualquiera de tus derechos, contacta con nuestro Delegado de Protección de Datos:
            <br /><strong>dpo@amaseguros.com</strong>
          </p>
        </div>
      </div>
    </>
  );
}
