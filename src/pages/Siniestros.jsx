import { useEffect, useState } from 'react';
import { api, ramoIcon } from '../api.js';
import Modal from '../components/Modal.jsx';

const ESTADO = {
  abierto: { cls: 'a', label: 'Abierto' },
  tramitacion: { cls: 'b', label: 'En tramitación' },
  cerrado: { cls: 'g', label: 'Cerrado' },
};

// Tipos por ramo (UX; el servidor valida contra su propia allow-list).
const TIPOS_BY_RAMO = {
  auto: ['Daños propios', 'Colisión con terceros', 'Robo', 'Lunas', 'Asistencia en viaje'],
  hogar: ['Daños por agua', 'Incendio', 'Robo', 'Rotura de cristales', 'Responsabilidad civil'],
  rcp: ['Reclamación de terceros', 'Requerimiento judicial'],
  sanitario: ['Daños materiales', 'Avería de maquinaria', 'Responsabilidad civil sanitaria', 'Pérdida de beneficios'],
};

export default function Siniestros({ navigate }) {
  const [lista, setLista] = useState(null);
  const [error, setError] = useState(null);
  const [sel, setSel] = useState(null);
  const [modal, setModal] = useState(false);

  function cargar() {
    api.siniestros().then((s) => { setLista(s); setSel((cur) => cur ?? s[0] ?? null); }).catch((e) => setError(e.message));
  }
  useEffect(() => { cargar(); /* eslint-disable-next-line */ }, []);

  if (error) return <div className="state err">{error}</div>;
  if (!lista) return <div className="state">Cargando…</div>;

  return (
    <>
      <div className="page-head">
        <div>
          <h3 className="h-title">Siniestros</h3>
          <p className="h-sub">Sigue el estado de tus siniestros y comunica uno nuevo</p>
        </div>
        <button className="btn primary" onClick={() => setModal(true)}>＋ Comunicar un siniestro</button>
      </div>

      <div className="split">
        <div className="split-list">
          {lista.map((s) => {
            const st = ESTADO[s.estado];
            return (
              <button key={s.id} className={`litem${sel?.id === s.id ? ' on' : ''}`} onClick={() => setSel(s)}>
                <span className="litem-ic">{ramoIcon(s.ramoKey)}</span>
                <span className="litem-main">
                  <span className="litem-t">{s.tipo}</span>
                  <span className="litem-s">{s.id} · {s.ramo}</span>
                </span>
                <span className={`chip ${st.cls}`}>{st.label}</span>
              </button>
            );
          })}
        </div>

        {sel && <SiniestroDetalle s={sel} navigate={navigate} />}
      </div>

      {modal && (
        <Modal title="Comunicar un siniestro" onClose={() => setModal(false)}>
          <ComunicarForm onClose={() => setModal(false)} onDone={cargar} />
        </Modal>
      )}
    </>
  );
}

function SiniestroDetalle({ s, navigate }) {
  const st = ESTADO[s.estado];
  return (
    <div className="split-detail">
      <div className="block">
        <div className="bh"><span className="bic">🛠</span> {s.tipo} <span className={`chip ${st.cls}`} style={{ marginLeft: 'auto' }}>{st.label}</span></div>
        <div className="bb">
          <div className="dl">
            <Row k="Referencia" v={s.id} />
            <Row k="Póliza" v={s.polizaId} />
            <Row k="Ramo" v={s.ramo} />
            <Row k="Fecha del siniestro" v={s.fecha} />
            <Row k="Tramitador" v={s.tramitador} />
            <Row k="Expediente" v={s.referencia} />
          </div>
          <p className="detail-desc">{s.descripcion}</p>
          <div className="steps">
            {s.hitos.map((h, i) => (
              <div key={i} className={`step${h.hecho ? ' done' : ''}`}>
                <span className="step-dot">{h.hecho ? '✓' : i + 1}</span>
                <div className="step-body"><b>{h.titulo}</b><small>{h.fecha}</small></div>
              </div>
            ))}
          </div>
          <div className="detail-actions">
            <button className="btn ghost small" onClick={() => navigate({ name: 'detalle', polizaId: s.polizaId })}>Ver póliza</button>
            <button className="btn ghost small">⬇ Descargar informe</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComunicarForm({ onClose, onDone }) {
  const [polizas, setPolizas] = useState([]);
  const [f, setF] = useState({ polizaId: '', tipo: '', fecha: '', descripcion: '' });
  const [state, setState] = useState({ loading: false, error: null, done: null });
  const set = (k) => (e) => setF((cur) => ({ ...cur, [k]: e.target.value }));

  useEffect(() => { api.polizas().then(setPolizas).catch(() => setPolizas([])); }, []);

  const ramoKey = polizas.find((p) => p.id === f.polizaId)?.ramoKey;
  const tipos = TIPOS_BY_RAMO[ramoKey] || [];

  async function submit(e) {
    e.preventDefault();
    setState({ loading: true, error: null, done: null });
    try {
      const r = await api.comunicarSiniestro(f);
      setState({ loading: false, error: null, done: r });
      onDone?.();
    } catch (err) {
      setState({ loading: false, error: err.message, done: null });
    }
  }

  if (state.done) {
    return (
      <div className="form-ok"><span className="ok-ic">✓</span><p>{state.done.mensaje}</p>
        <p className="ref">Referencia: <b>{state.done.ref}</b></p>
        <button className="btn primary" onClick={onClose}>Cerrar</button></div>
    );
  }

  return (
    <form onSubmit={submit} className="mform">
      <p className="mform-lead">Indica la póliza afectada y describe lo ocurrido. Un tramitador de A.M.A. te contactará.</p>
      {state.error && <div className="err" role="alert">{state.error}</div>}
      <div className="field"><label>Póliza afectada</label>
        <select value={f.polizaId} onChange={(e) => setF({ ...f, polizaId: e.target.value, tipo: '' })} required>
          <option value="">Selecciona una póliza…</option>
          {polizas.map((p) => <option key={p.id} value={p.id}>{p.id} · {p.ramo}</option>)}
        </select>
      </div>
      <div className="field"><label>Tipo de siniestro</label>
        <select value={f.tipo} onChange={set('tipo')} disabled={!f.polizaId} required>
          <option value="">{f.polizaId ? 'Selecciona un tipo…' : 'Selecciona antes la póliza'}</option>
          {tipos.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div className="field"><label>Fecha del siniestro</label>
        <input value={f.fecha} onChange={set('fecha')} placeholder="DD/MM/AAAA" maxLength={10} required /></div>
      <div className="field"><label>Descripción de lo ocurrido</label>
        <textarea value={f.descripcion} onChange={set('descripcion')} rows={4} maxLength={1000}
          placeholder="Describe brevemente qué ha pasado (mínimo 10 caracteres)…" required /></div>
      <button className="btn primary block" type="submit" disabled={state.loading}>
        {state.loading ? 'Enviando…' : 'Comunicar siniestro'}</button>
    </form>
  );
}

function Row({ k, v }) {
  return <div className="row"><span className="k">{k}</span><span className="v">{v}</span></div>;
}
