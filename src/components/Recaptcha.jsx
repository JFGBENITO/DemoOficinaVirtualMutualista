import { useState } from 'react';

// SECURITY-DEVIATION (prototipo): SIMULADOR de reCAPTCHA. Solo cliente, sin
// verificación real de bots. En producción debe integrarse reCAPTCHA v3 de
// Google y verificar el token en el servidor (score + acción), nunca confiar
// en este estado de cliente.
export default function Recaptcha({ verified, onVerify }) {
  const [loading, setLoading] = useState(false);

  function toggle() {
    if (verified || loading) return;
    setLoading(true);
    // Retardo simulado, como la verificación real "No soy un robot".
    setTimeout(() => {
      setLoading(false);
      onVerify(true);
    }, 900);
  }

  return (
    <div className="recaptcha" role="group" aria-label="Verificación reCAPTCHA (simulada)">
      <button
        type="button"
        className={`rc-check ${verified ? 'ok' : ''} ${loading ? 'loading' : ''}`}
        onClick={toggle}
        aria-pressed={verified}
        aria-label="No soy un robot"
      >
        {loading ? <span className="rc-spin" /> : verified ? <span className="rc-tick">✓</span> : null}
      </button>
      <span className="rc-label">No soy un robot</span>
      <div className="rc-brand">
        <div className="rc-logo" aria-hidden="true">
          <span className="rc-logo-dot" />reCAPTCHA
        </div>
        <div className="rc-links">Privacidad · Términos</div>
      </div>
    </div>
  );
}
