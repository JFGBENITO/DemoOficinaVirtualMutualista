import { useEffect, useState } from 'react';
import { api, ramoIcon } from '../api.js';

const ESTADO = {
  vigente: { cls: 'g', label: 'Vigente' },
  recibo_pendiente: { cls: 'a', label: 'Recibo pendiente' },
};

const FILTROS = [
  { key: 'todas', label: 'Todas' },
  { key: 'vigente', label: 'Vigentes' },
  { key: 'recibo_pendiente', label: 'Con recibo pendiente' },
];

export default function Polizas({ navigate }) {
  const [polizas, setPolizas] = useState(null);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('todas');

  useEffect(() => {
    api.polizas().then(setPolizas).catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="state err">{error}</div>;
  if (!polizas) return <div className="state">Cargando…</div>;

  const lista = filtro === 'todas' ? polizas : polizas.filter((p) => p.estado === filtro);

  return (
    <>
      <div className="page-head">
        <div>
          <h3 className="h-title">Mis pólizas</h3>
          <p className="h-sub">{polizas.length} pólizas contratadas con A.M.A.</p>
        </div>
      </div>

      <div className="filters">
        {FILTROS.map((f) => (
          <button key={f.key} className={`fchip${filtro === f.key ? ' on' : ''}`} onClick={() => setFiltro(f.key)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="pol-grid wide">
        {lista.map((p) => {
          const st = ESTADO[p.estado] || { cls: 'g', label: p.estado };
          return (
            <article className="pcard" key={p.id}>
              <div className="pcard-top">
                <span className="ramo-ic">{ramoIcon(p.ramoKey)}</span>
                <span className={`chip ${st.cls}`}>{st.label}</span>
              </div>
              <div className="ramo-label">{p.ramo}</div>
              <div className="pol-num">{p.id}</div>
              <div className="pol-obj">{p.objeto}</div>
              <button className="pcard-link" onClick={() => navigate({ name: 'detalle', polizaId: p.id })}>
                Ver detalle →
              </button>
            </article>
          );
        })}
      </div>

      {lista.length === 0 && <div className="state">No hay pólizas con ese estado.</div>}
    </>
  );
}
