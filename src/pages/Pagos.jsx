import { useEffect, useState } from 'react';
import { api, fmtEur } from '../api.js';

const SIT = {
  pagado: { cls: 'g', label: 'Pagado' },
  pendiente: { cls: 'r', label: 'Pendiente' },
  emitido: { cls: 'a', label: 'Emitido' },
};

export default function Pagos({ navigate }) {
  const [recibos, setRecibos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.pagos().then(setRecibos).catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="state err">{error}</div>;
  if (!recibos) return <div className="state">Cargando…</div>;

  const pendientes = recibos.filter((r) => r.situacion === 'pendiente');
  const totalPend = pendientes.reduce((s, r) => s + r.importe, 0);

  return (
    <>
      <div className="page-head">
        <div>
          <h3 className="h-title">Pagos y recibos</h3>
          <p className="h-sub">Consulta el estado de tus recibos y regulariza los pendientes</p>
        </div>
      </div>

      {pendientes.length > 0 && (
        <div className="pay-alert">
          <div>
            <b>{pendientes.length} recibo{pendientes.length > 1 ? 's' : ''} pendiente{pendientes.length > 1 ? 's' : ''}</b>
            <span>Importe total pendiente: <b>{fmtEur(totalPend)}</b></span>
          </div>
          <button className="btn primary small">Pagar ahora</button>
        </div>
      )}

      <div className="block">
        <div className="bh"><span className="bic">🧾</span> Histórico de recibos</div>
        <div className="table-wrap">
          <table className="tbl">
            <thead>
              <tr><th>Recibo</th><th>Póliza / Ramo</th><th>Concepto</th><th>Vencimiento</th><th className="num">Importe</th><th>Situación</th><th></th></tr>
            </thead>
            <tbody>
              {recibos.map((r) => {
                const s = SIT[r.situacion] || { cls: 'a', label: r.situacion };
                return (
                  <tr key={r.numero}>
                    <td className="mono">{r.numero}</td>
                    <td>
                      <button className="cell-link" onClick={() => navigate({ name: 'detalle', polizaId: r.polizaId })}>{r.polizaId}</button>
                      <div className="cell-sub">{r.ramo}</div>
                    </td>
                    <td>{r.concepto}</td>
                    <td>{r.vencimiento}</td>
                    <td className="num mono">{fmtEur(r.importe)}</td>
                    <td><span className={`chip ${s.cls}`}>{s.label}</span></td>
                    <td className="num">
                      {r.situacion === 'pendiente'
                        ? <button className="btn primary small">Pagar</button>
                        : <button className="btn ghost small">⬇ PDF</button>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
