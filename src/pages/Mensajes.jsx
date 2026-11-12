import { useEffect, useState } from 'react';
import { api } from '../api.js';

const CAT = {
  pagos: { label: 'Pagos', cls: 'a' },
  siniestros: { label: 'Siniestros', cls: 'b' },
  general: { label: 'General', cls: 'g' },
};

export default function Mensajes() {
  const [lista, setLista] = useState(null);
  const [error, setError] = useState(null);
  const [selId, setSelId] = useState(null);
  const [leidos, setLeidos] = useState(() => new Set());

  useEffect(() => {
    api.mensajes().then((m) => { setLista(m); setSelId(m[0]?.id ?? null); }).catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="state err">{error}</div>;
  if (!lista) return <div className="state">Cargando…</div>;

  const sel = lista.find((m) => m.id === selId) || null;
  const isLeido = (m) => m.leido || leidos.has(m.id);
  const noLeidos = lista.filter((m) => !isLeido(m)).length;

  function abrir(m) {
    setSelId(m.id);
    if (!isLeido(m)) setLeidos((s) => new Set(s).add(m.id));
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h3 className="h-title">Mensajes</h3>
          <p className="h-sub">{noLeidos > 0 ? `Tienes ${noLeidos} mensaje${noLeidos > 1 ? 's' : ''} sin leer` : 'No tienes mensajes sin leer'}</p>
        </div>
      </div>

      <div className="split">
        <div className="split-list msgs">
          {lista.map((m) => {
            const c = CAT[m.categoria] || { label: m.categoria, cls: 'g' };
            return (
              <button key={m.id} className={`litem${selId === m.id ? ' on' : ''}${isLeido(m) ? '' : ' unread'}`} onClick={() => abrir(m)}>
                <span className="litem-main">
                  <span className="litem-t">{m.asunto}</span>
                  <span className="litem-s">{m.remitente} · {m.fecha}</span>
                </span>
                <span className={`chip ${c.cls}`}>{c.label}</span>
              </button>
            );
          })}
        </div>

        {sel && (
          <div className="split-detail">
            <div className="block">
              <div className="bh"><span className="bic">💬</span> {sel.asunto}</div>
              <div className="bb">
                <div className="msg-meta"><b>{sel.remitente}</b> · {sel.fecha}</div>
                <p className="msg-body">{sel.cuerpo}</p>
                <div className="detail-actions">
                  <button className="btn primary small">Responder</button>
                  <button className="btn ghost small">Marcar como no leído</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
