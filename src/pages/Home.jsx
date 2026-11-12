import { useEffect, useState } from 'react';
import { api, ramoIcon } from '../api.js';

const ESTADO = {
  vigente: { cls: 'g', label: 'Vigente' },
  recibo_pendiente: { cls: 'a', label: 'Recibo pendiente' },
};

export default function Home({ user, navigate }) {
  const [resumen, setResumen] = useState(null);
  const [polizas, setPolizas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([api.resumen(), api.polizas()])
      .then(([r, p]) => { setResumen(r); setPolizas(p); })
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="state err">{error}</div>;
  if (!resumen) return <div className="state">Cargando…</div>;

  const firstName = (user?.nombre || '').split(' ')[0] || 'mutualista';

  return (
    <>
      <div className="hello">
        <div>
          <h3 className="h-title">Hola, {firstName} 👋</h3>
          <p className="h-sub">Este es el resumen de tus seguros</p>
        </div>
        <button className="btn primary" onClick={() => navigate({ name: 'siniestros' })}>
          ＋ Comunicar un siniestro
        </button>
      </div>

      <div className="cols">
        <section>
          <div className="kpis">
            <Kpi ic="blue" icon="🛡" n={resumen.polizasActivas} l="Pólizas activas" />
            <Kpi ic="amber" icon="🧾" n={resumen.recibosPendientes} l="Recibo pendiente" />
            <Kpi ic="green" icon="🛠" n={resumen.siniestrosAbiertos} l="Siniestros abiertos" />
            <Kpi ic="blue" icon="🗂" n={resumen.documentosNuevos} l="Documentos nuevos" />
          </div>
          <div className="block-h"><h4>Mis pólizas</h4><button className="link" onClick={() => navigate({ name: 'polizas' })}>Ver todas →</button></div>
          <div className="pol-grid">
            {polizas.map((p) => {
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
        </section>

        <aside className="side-col">
          <div className="promo">
            <div className="pt">Servicio de multas</div>
            <div className="ps">Actívalo y recibe avisos de tus multas de tráfico directamente en la app.</div>
            <button className="btn" onClick={() => navigate({ name: 'multas' })}>Darme de alta →</button>
          </div>
          <div className="quick">
            <h4>Accesos rápidos</h4>
            <div className="qgrid">
              <Quick icon="👤" label="Mis datos" onClick={() => navigate({ name: 'datos' })} />
              <Quick icon="🎯" label="Acceso Club AMA" onClick={() => navigate({ name: 'club' })} />
              <Quick icon="📋" label="Guía Reclamación" onClick={() => navigate({ name: 'reclamacion' })} />
              <Quick icon="🔒" label="Protección de datos" onClick={() => navigate({ name: 'privacidad' })} />
            </div>
          </div>
        </aside>
      </div>

      <HomeFooter />
    </>
  );
}

function HomeFooter() {
  return (
    <footer className="home-footer">
      <div className="hf-top">
        <div className="hf-legal">
          <span>© A.M.A. Agrupación Mutual Aseguradora</span>
          <nav>
            <a href="#" onClick={(e) => e.preventDefault()}>Políticas de privacidad Generales</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Términos y condiciones</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Política de cookies</a>
          </nav>
        </div>

        <div className="hf-group" aria-label="Grupo A.M.A.">
          <img className="hf-logo" src="/brand-grupo.png" alt="A.M.A. Grupo" />
          <img className="hf-logo" src="/brand-ama.png" alt="A.M.A. Agrupación Mutual Aseguradora" />
          <img className="hf-logo" src="/brand-amavida.png" alt="AmaVida — Seguros de vida para profesionales sanitarios" />
          <img className="hf-logo" src="/brand-ecuador.png" alt="A.M.A. Ecuador" />
        </div>

        <div className="hf-contact">
          <div className="hf-block">
            <b>Contacte con nosotros</b>
            <span>900 52 20 92 / 913 434 700</span>
          </div>
          <div className="hf-block">
            <span>Parque Empresarial Cristalia · Edificio 4</span>
            <span>Vía de los Poblados, 3 · 28033 Madrid</span>
            <a href="#" onClick={(e) => e.preventDefault()}>www.amaseguros.com</a>
          </div>
          <div className="hf-social" aria-label="Redes sociales">
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="Facebook">f</a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="X">✕</a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="LinkedIn">in</a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="YouTube">▶</a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="Instagram">◎</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Kpi({ ic, icon, n, l }) {
  return (
    <div className="kpi">
      <div className={`kpi-ic ${ic}`}>{icon}</div>
      <div><div className="kpi-n">{n}</div><div className="kpi-l">{l}</div></div>
    </div>
  );
}
function Quick({ icon, label, onClick }) {
  return (
    <button className="qi" onClick={onClick}>
      <div className="qic">{icon}</div><span>{label}</span>
    </button>
  );
}
