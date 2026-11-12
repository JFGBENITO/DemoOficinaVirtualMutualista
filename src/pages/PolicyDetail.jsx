import { useEffect, useState } from 'react';
import { api, ramoIcon } from '../api.js';

export default function PolicyDetail({ polizaId, navigate }) {
  const [prod, setProd] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setProd(null); setError(null);
    api.producto(polizaId).then(setProd).catch((e) => setError(e.message));
  }, [polizaId]);

  if (error) {
    return (
      <>
        <button className="back" onClick={() => navigate({ name: 'home' })}>← Volver</button>
        <div className="state err">{error}</div>
      </>
    );
  }
  if (!prod) return <div className="state">Cargando…</div>;

  const { datos, cobertura, garantias, domiciliacion } = prod;

  const accesosRamo = prod.ramoKey === 'auto'
    ? [
        { icon: '👤', label: 'Mis datos', view: 'datos' },
        { icon: '🧾', label: 'Recibos', view: 'pagos' },
        { icon: '🚗', label: 'Alta servicio Multas', view: 'multas' },
        { icon: '🔧', label: 'Talleres Colaboradores', view: 'talleres' },
        { icon: '🚙', label: 'Ofertas Coches Recuperados', view: 'coches' },
        { icon: '🎯', label: 'Acceso Club AMA', view: 'club' },
        { icon: '📋', label: 'Guía Reclamación', view: 'reclamacion' },
        { icon: '🔒', label: 'Protección de datos', view: 'privacidad' },
      ]
    : [
        { icon: '👤', label: 'Mis datos', view: 'datos' },
        { icon: '🧾', label: 'Recibos', view: 'pagos' },
        { icon: '🎯', label: 'Acceso Club AMA', view: 'club' },
        { icon: '📋', label: 'Guía Reclamación', view: 'reclamacion' },
        { icon: '🔒', label: 'Protección de datos', view: 'privacidad' },
      ];

  return (
    <>
      <button className="back" onClick={() => navigate({ name: 'home' })}>← Volver a mis pólizas</button>

      <div className="dp-hero">
        <span className="ramo-ic">{ramoIcon(prod.ramoKey)}</span>
        <div>
          <div className="ramo-label">{prod.ramo}</div>
          <div className="dp-num">Póliza {prod.polizaId}</div>
        </div>
        <span className="chip g">Vigente</span>
        <div className="dp-actions">
          <button className="btn ghost small">⬇ Descargar póliza</button>
          <button className="btn ghost small">🧾 Ver recibos</button>
          <button className="btn primary small">✉ Comunicar siniestro</button>
        </div>
      </div>

      <div className="cols dp">
        <div className="dp-left">
          <div className="block">
            <div className="bh"><span className="bic">📄</span> Datos del tomador</div>
            <div className="bb">
              <div className="dl">
                <Row k="Tomador" v={datos.tomador} />
                <Row k="NIF" v={datos.nif} />
                <Row k="Provincia" v={datos.provincia} />
                <Row k="Código postal" v={datos.codigoPostal} />
              </div>
            </div>
          </div>
          <div className="block">
            <div className="bh"><span className="bic">🏠</span> Objeto del seguro</div>
            <div className="bb">
              <div className="dl">
                <Row k="Objeto del seguro" v={datos.objetoSeguro} />
                <Row k="Domicilio" v={datos.domicilio} />
              </div>
            </div>
          </div>
          <div className="block">
            <div className="bh"><span className="bic">📅</span> Periodo de cobertura y forma de pago</div>
            <div className="bb">
              <div className="dl">
                <Row k="Forma de pago" v={cobertura.formaPago} />
                <Row k="Fecha de antigüedad" v={cobertura.fechaAntiguedad} />
              </div>
              <div className="timeline">
                <div className="tl-bar">
                  <div className="tl-fill" style={{ width: `${cobertura.progreso}%` }} />
                  <div className="tl-dot" style={{ left: `${cobertura.progreso}%` }} />
                </div>
                <div className="tl-labels">
                  <span>Desde {cobertura.desde}</span><span>Hoy</span><span>Hasta {cobertura.hasta}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="block">
            <div className="bh"><span className="bic">🛡</span> Garantías contratadas</div>
            <div className="bb" style={{ paddingTop: 4 }}>
              {garantias.map((g) => (
                <div className="gar" key={g.nombre}>
                  <span className="gi">✓</span><span className="gt">{g.nombre}</span>
                  <span className="chip g">Incluida</span>
                </div>
              ))}
            </div>
          </div>
          <div className="block">
            <div className="bh"><span className="bic">💳</span> Domiciliación de pagos</div>
            <div className="bb">
              <div className="dl" style={{ gridTemplateColumns: '1fr' }}>
                <Row k="Modo de pago" v={domiciliacion.modo} />
                <Row k="Entidad · Oficina" v={`${domiciliacion.entidad} · ${domiciliacion.oficina}`} />
                <Row k="Cuenta (IBAN)" v={domiciliacion.iban} />
              </div>
              <button className="btn ghost small" style={{ marginTop: 12 }}>Cambiar datos bancarios</button>
            </div>
          </div>
        </div>

        <div className="dp-right">
          <div className="block">
            <div className="bb qactions">
              <div className="qsec">
                <h5 className="qsec-h">Consultar</h5>
                <div className="qgrid3">
                  <Quick icon="🧾" label="Recibos" onClick={() => navigate({ name: 'pagos' })} />
                  <Quick icon="🛠" label="Siniestros" onClick={() => navigate({ name: 'siniestros' })} />
                  <Quick icon="🔔" label="Avisos" onClick={() => navigate({ name: 'mensajes' })} />
                </div>
              </div>
              <div className="qsec">
                <h5 className="qsec-h">Operar</h5>
                <div className="qgrid3">
                  <Quick icon="📄" label="Solicitar documentos" onClick={() => navigate({ name: 'documentos' })} />
                  <Quick icon="✍️" label="Dar parte" onClick={() => navigate({ name: 'siniestros' })} />
                  <Quick icon="🚗" label="Asistencia en carretera" />
                </div>
              </div>
            </div>
          </div>
          <div className="quick">
            <h4>Accesos rápidos</h4>
            <div className="qgrid">
              {accesosRamo.map((a) => (
                <Quick key={a.label} icon={a.icon} label={a.label} onClick={() => navigate({ name: a.view })} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Row({ k, v }) {
  return <div className="row"><span className="k">{k}</span><span className="v">{v}</span></div>;
}

function Quick({ icon, label, onClick }) {
  return (
    <button className="qi" onClick={onClick}>
      <div className="qic">{icon}</div><span>{label}</span>
    </button>
  );
}
