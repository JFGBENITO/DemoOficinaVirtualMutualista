// === API DUMMY FRONTEND (SOLO DATOS LOCALES) ===
// No hay backend externo. Todos los datos vienen de data.js

import {
  CURRENT_USER,
  RESUMEN,
  POLIZAS,
  SINIESTROS,
  RECIBOS,
  DOCUMENTOS,
  MENSAJES
} from './data.js';

const TOKEN_KEY = 'ama_demo_token';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) sessionStorage.setItem(TOKEN_KEY, token);
  else sessionStorage.removeItem(TOKEN_KEY);
}

export const api = {
  login: async (documento, password) => {
    await delay(300);
    if (password !== 'DemoAMA11') {
      throw new Error('Contraseña incorrecta. Usa: DemoAMA11');
    }
    const token = 'demo-token-' + Math.random().toString(36).substr(2, 9);
    return {
      token,
      user: {
        documento,
        nombre: CURRENT_USER.nombre,
        email: CURRENT_USER.email
      }
    };
  },

  logout: async () => {
    await delay(200);
    return { mensaje: 'Sesión cerrada' };
  },

  mutualista: async () => {
    await delay(200);
    return CURRENT_USER;
  },

  resumen: async () => {
    await delay(300);
    return RESUMEN;
  },

  polizas: async () => {
    await delay(400);
    return POLIZAS;
  },

  producto: async (id) => {
    await delay(200);
    const poliza = POLIZAS.find(p => p.id === id);
    if (!poliza) throw new Error('Póliza no encontrada');
    return poliza;
  },

  pagos: async () => {
    await delay(300);
    return RECIBOS;
  },

  siniestros: async () => {
    await delay(300);
    return SINIESTROS;
  },

  comunicarSiniestro: async (payload) => {
    await delay(500);
    const nuevoSiniestro = {
      id: 'SIN-2024-' + Math.floor(Math.random() * 10000),
      polizaId: payload.polizaId,
      tipo: payload.tipo,
      fecha: payload.fecha,
      descripcion: payload.descripcion,
      estado: 'abierto',
      hitos: ['Comunicado']
    };
    SINIESTROS.push(nuevoSiniestro);
    return nuevoSiniestro;
  },

  documentos: async () => {
    await delay(300);
    return DOCUMENTOS;
  },

  mensajes: async () => {
    await delay(300);
    return MENSAJES;
  },

  register: async (payload) => {
    await delay(500);
    return {
      mensaje: 'Registro solicitado. Confirma tu email.',
      ref: 'REF-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    };
  },

  callMe: async (payload) => {
    await delay(500);
    return {
      mensaje: 'Solicitud recibida. Te llamaremos pronto.',
      ref: 'REF-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    };
  },

  passwordReminder: async (payload) => {
    await delay(500);
    return {
      mensaje: 'Instrucciones enviadas a tu email.'
    };
  }
};

// Iconos por ramo (emoji, placeholder hasta aplicar la iconografía del manual A.M.A.).
export function ramoIcon(ramoKey) {
  return { auto: '🚗', hogar: '🏠', rcp: '⚕️', sanitario: '🏥' }[ramoKey] || '📄';
}

// Formato de importe en euros (es-ES).
export function fmtEur(n) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n);
}
