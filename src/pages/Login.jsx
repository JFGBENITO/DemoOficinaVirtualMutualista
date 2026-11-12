import { useState } from 'react';
import { api, setToken } from '../api.js';
import Recaptcha from '../components/Recaptcha.jsx';
import Modal from '../components/Modal.jsx';

function Brand() {
  return (
    <img className="ama-logo" src="/ama-logo.png" width={200} height={80}
         alt="A.M.A. Agrupación Mutual Aseguradora" />
  );
}

// ---- Formulario: Le llamamos (CU004) ----------------------------------------
function CallMeForm({ onClose }) {
  const [f, setF] = useState({ nombre: '', documento: '', telefono: '' });
  const [privacidad, setPriv] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [state, setState] = useState({ loading: false, error: null, done: null });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setState({ loading: true, error: null, done: null });
    try {
      const r = await api.callMe({ ...f, privacidad, captcha });
      setState({ loading: false, error: null, done: r });
    } catch (err) {
      setState({ loading: false, error: err.message, done: null });
    }
  }
  if (state.done) {
    return <div className="form-ok"><span className="ok-ic">✓</span><p>{state.done.mensaje}</p>
      <p className="ref">Referencia: <b>{state.done.ref}</b></p>
      <button className="btn primary" onClick={onClose}>Cerrar</button></div>;
  }
  return (
    <form onSubmit={submit} className="mform">
      <p className="mform-lead">Déjanos tus datos y te llamamos para ayudarte con el registro, el acceso o el recordatorio de contraseña.</p>
      {state.error && <div className="err" role="alert">{state.error}</div>}
      <div className="field"><label>Nombre y apellidos / Razón social</label>
        <input value={f.nombre} onChange={set('nombre')} maxLength={80} required /></div>
      <div className="field"><label>NIF / NIE / CIF</label>
        <input value={f.documento} onChange={set('documento')} placeholder="00000000A" maxLength={12} required /></div>
      <div className="field"><label>Teléfono móvil</label>
        <input value={f.telefono} onChange={set('telefono')} placeholder="600000000" maxLength={12} required /></div>


      <button className="btn primary block" type="submit" disabled={state.loading}>
        {state.loading ? 'Enviando…' : 'Solicitar llamada'}</button>


	<p className="mform-lead">Horario de cobertura de soporte: Lunes a Viernes de 10h a 21h</p>
    </form>
  );
}

// ---- Formulario: Registro (CU002) -------------------------------------------
function RegisterForm({ onClose }) {
  const [f, setF] = useState({ nombre: '', documento: '', email: '', telefono: '' });
  const [consentimientos, setCons] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [state, setState] = useState({ loading: false, error: null, done: null });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setState({ loading: true, error: null, done: null });
    try {
      const r = await api.register({ ...f, consentimientos, captcha });
      setState({ loading: false, error: null, done: r });
    } catch (err) {
      setState({ loading: false, error: err.message, done: null });
    }
  }
  if (state.done) {
    return <div className="form-ok"><span className="ok-ic">✓</span><p>{state.done.mensaje}</p>
      <p className="ref">Referencia: <b>{state.done.ref}</b></p>
      <button className="btn primary" onClick={onClose}>Cerrar</button></div>;
  }
  return (
    <form onSubmit={submit} className="mform">
      <p className="mform-lead">Si es la primera vez que utilizas el portal, regístrate con tus datos.</p>
      {state.error && <div className="err" role="alert">{state.error}</div>}
      <div className="field"><label>Nombre y apellidos</label>
        <input value={f.nombre} onChange={set('nombre')} maxLength={80} required /></div>
      <div className="field"><label>Número de documento (DNI / NIE / NIF)</label>
        <input value={f.documento} onChange={set('documento')} placeholder="00000000A" maxLength={12} required /></div>
      <div className="field"><label>Correo electrónico</label>
        <input type="email" value={f.email} onChange={set('email')} placeholder="nombre@correo.com" maxLength={120} required /></div>
      <div className="field"><label>Teléfono de contacto</label>
        <input value={f.telefono} onChange={set('telefono')} placeholder="600000000" maxLength={12} required /></div>
      <label className="check"><input type="checkbox" checked={consentimientos} onChange={(e) => setCons(e.target.checked)} required />
        <span>Acepto la <a href="#" onClick={(e) => e.preventDefault()}>Política de protección de datos</a>, los <a href="#" onClick={(e) => e.preventDefault()}>Términos y condiciones</a> y el consentimiento comercial.</span></label>
      <Recaptcha verified={captcha} onVerify={setCaptcha} />
      <button className="btn primary block" type="submit" disabled={state.loading || !captcha || !consentimientos}>
        {state.loading ? 'Enviando…' : 'Registrarme'}</button>
    </form>
  );
}

// ---- Formulario: Recordar contraseña (CU003) --------------------------------
function ReminderForm({ onClose }) {
  const [f, setF] = useState({ identificador: '', email: '' });
  const [captcha, setCaptcha] = useState(false);
  const [state, setState] = useState({ loading: false, error: null, done: null });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setState({ loading: true, error: null, done: null });
    try {
      const r = await api.passwordReminder({ ...f, captcha });
      setState({ loading: false, error: null, done: r });
    } catch (err) {
      setState({ loading: false, error: err.message, done: null });
    }
  }
  if (state.done) {
    return <div className="form-ok"><span className="ok-ic">✓</span><p>{state.done.mensaje}</p>
      <button className="btn primary" onClick={onClose}>Cerrar</button></div>;
  }
  return (
    <form onSubmit={submit} className="mform">
      <p className="mform-lead">Introduce tus datos y te enviaremos instrucciones para restablecer la contraseña.</p>
      {state.error && <div className="err" role="alert">{state.error}</div>}
      <div className="field"><label>Documento o móvil</label>
        <input value={f.identificador} onChange={set('identificador')} maxLength={120} required /></div>
      <div className="field"><label>Correo electrónico</label>
        <input type="email" value={f.email} onChange={set('email')} placeholder="nombre@correo.com" maxLength={120} required /></div>
      <Recaptcha verified={captcha} onVerify={setCaptcha} />
      <button className="btn primary block" type="submit" disabled={state.loading || !captcha}>
        {state.loading ? 'Enviando…' : 'Enviar'}</button>
    </form>
  );
}

// ---- Pantalla de Login ------------------------------------------------------
export default function Login({ onLogin }) {
  const [documento, setDocumento] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null); // 'register' | 'callme' | 'reminder'

  async function submit(e) {
    e.preventDefault();
    setError(null);
    if (!captcha) { setError('Confirma que no eres un robot para continuar.'); return; }
    if (password !== 'DemoAMA11') { setError('Contraseña incorrecta.'); return; }
    setLoading(true);
    try {
      const { token, user } = await api.login(documento.trim(), password);
      setToken(token);
      onLogin(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <header className="login-header"><Brand /></header>

      <main className="login-main">
        <div className="login-grid">
          {/* Acceso mutualistas */}
          <section className="login-panel access">
            <h1>Acceso mutualistas</h1>
            <form onSubmit={submit}>
              {error && <div className="err" role="alert">{error}</div>}
              <div className="field">
                <label htmlFor="doc">Documento, móvil o email</label>
                <input id="doc" value={documento} onChange={(e) => setDocumento(e.target.value)}
                       placeholder="Documento, móvil o email" autoComplete="username" maxLength={120} required />
              </div>
              <div className="field">
                <label htmlFor="pwd">Contraseña</label>
                <input id="pwd" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                       placeholder="Contraseña" autoComplete="current-password" maxLength={128} required />
              </div>
              <Recaptcha verified={captcha} onVerify={setCaptcha} />
              <button className="btn primary block" type="submit" disabled={loading}>
                {loading ? 'Accediendo…' : 'Acceder'}
              </button>
              <button type="button" className="linkbtn center" onClick={() => setModal('reminder')}>
                Recordar contraseña
              </button>
              <p className="legal">
                En caso que se haya registrado en alguna plataforma de registro único de A.M.A. su usuario
                persistente será incluido en esta plataforma tras registrarse. Al continuar, acepta los
                términos y condiciones de acceso y la <a href="#" onClick={(e) => e.preventDefault()}>Política de privacidad</a>.
              </p>
            </form>
          </section>

          {/* ¿Aún no está registrado? */}
          <aside className="login-panel register">
            <h2>¿Aún no está registrado?</h2>
            <p>Si es la primera vez que utiliza este servicio debe registrarse previamente.</p>
            <button className="btn primary" onClick={() => setModal('register')}>Registrarme</button>
          </aside>
        </div>

        <div className="login-help">
          ¿Tiene problemas para realizar el registro?
          <button className="btn primary" onClick={() => setModal('callme')}>Le llamamos</button>
        </div>

        <div className="login-demo">
          <b>Demo:</b> introduce cualquier documento con formato válido (p. ej. <b>00000000A</b>), la
          contraseña enviada para la demo y marca el reCAPTCHA. La autenticación es simulada; en
          producción se integrará con el <b>Login Único</b> de A.M.A.
        </div>
      </main>

      <footer className="login-footer">
        <div className="lf-top">
          <span>© A.M.A. Agrupación Mutual Aseguradora</span>
          <nav>
            <a href="#" onClick={(e) => e.preventDefault()}>Política de privacidad</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Términos y condiciones</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Política de cookies</a>
          </nav>
        </div>
        <div className="lf-bottom">
          <span className="lf-group">Grupo A.M.A. · A.M.A. Mutua · AmaVida · A.M.A. Ecuador</span>
          <span className="lf-social" aria-label="Redes sociales">
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="Facebook">f</a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="X">✕</a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="LinkedIn">in</a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="YouTube">▶</a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="Instagram">◎</a>
          </span>
        </div>
      </footer>

      {modal === 'register' && <Modal title="Registro en el portal" onClose={() => setModal(null)}><RegisterForm onClose={() => setModal(null)} /></Modal>}
      {modal === 'callme' && <Modal title="Le llamamos" onClose={() => setModal(null)}><CallMeForm onClose={() => setModal(null)} /></Modal>}
      {modal === 'reminder' && <Modal title="Recordar contraseña" onClose={() => setModal(null)}><ReminderForm onClose={() => setModal(null)} /></Modal>}
    </div>
  );
}
