import { useEffect, useState } from 'react';
import { api } from '../api.js';

const TIPO = {
  poliza: { label: 'Póliza', icon: '📄' },
  recibo: { label: 'Recibo', icon: '🧾' },
  condiciones: { label: 'Condiciones', icon: '📑' },
  certificado: { label: 'Certificado', icon: '📜' },
  comunicacion: { label: 'Comunicación', icon: '✉️' },
};

const FILTROS = [
  { key: 'todos', label: 'Todos' },
  { key: 'poliza', label: 'Pólizas' },
  { key: 'recibo', label: 'Recibos' },
  { key: 'condiciones', label: 'Condiciones' },
  { key: 'certificado', label: 'Certificados' },
  { key: 'comunicacion', label: 'Comunicaciones' },
];

export default function Documentos() {
  const [docs, setDocs] = useState(null);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('todos');

  useEffect(() => {
    api.documentos().then(setDocs).catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="state err">{error}</div>;
  if (!docs) return <div className="state">Cargando…</div>;

  const lista = filtro === 'todos' ? docs : docs.filter((d) => d.tipo === filtro);

  return (
    <>
      <div className="page-head">
        <div>
          <h3 className="h-title">Documentos</h3>
          <p className="h-sub">Descarga tus pólizas, recibos, certificados y comunicaciones</p>
        </div>
      </div>

      <div className="filters">
        {FILTROS.map((f) => (
          <button key={f.key} className={`fchip${filtro === f.key ? ' on' : ''}`} onClick={() => setFiltro(f.key)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="doc-list">
        {lista.map((d) => {
          const t = TIPO[d.tipo] || { label: d.tipo, icon: '📄' };
          return (
            <article className="doc" key={d.id}>
              <span className="doc-ic">{t.icon}</span>
              <div className="doc-main">
                <div className="doc-name">{d.nombre}{d.nuevo && <span className="badge-new">Nuevo</span>}</div>
                <div className="doc-meta">{t.label} · {d.ramo} · {d.fecha} · {d.formato} · {d.tamano}</div>
              </div>
              <button className="btn ghost small">⬇ Descargar</button>
            </article>
          );
        })}
      </div>

      {lista.length === 0 && <div className="state">No hay documentos de ese tipo.</div>}
    </>
  );
}
