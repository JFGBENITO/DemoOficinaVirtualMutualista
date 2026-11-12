// === DATOS DUMMY CENTRALIZADOS ===
// Este archivo contiene todos los datos de la aplicación demo

export const CURRENT_USER = {
  nombre: 'Juan García López',
  documento: '12345678X',
  email: 'juan@ama.es',
  telefono: '600123456'
};

export const RESUMEN = {
  polizasActivas: 3,
  recibosPendientes: 1,
  siniestrosAbiertos: 2,
  documentosNuevos: 3
};

export const POLIZAS = [
  {
    id: 'AUTO-2024-001',
    ramo: 'Automóvil',
    ramoKey: 'auto',
    objeto: 'Renault Megane',
    estado: 'vigente',
    vigencia: '01/01/2024 - 31/12/2024'
  },
  {
    id: 'HOGAR-2024-002',
    ramo: 'Hogar',
    ramoKey: 'hogar',
    objeto: 'Piso Calle Mayor 123',
    estado: 'recibo_pendiente',
    vigencia: '01/03/2024 - 28/02/2025'
  },
  {
    id: 'RCP-2024-003',
    ramo: 'RCP',
    ramoKey: 'rcp',
    objeto: 'Profesional Abogacía',
    estado: 'vigente',
    vigencia: '01/06/2024 - 31/05/2025'
  }
];

export const SINIESTROS = [
  {
    id: 'SIN-2024-00145',
    polizaId: 'AUTO-2024-001',
    tipo: 'Choque',
    fecha: '15/11/2024',
    descripcion: 'Accidente en autopista',
    estado: 'abierto',
    hitos: ['Comunicado', 'Enviado a perito', 'Peritaje en proceso']
  },
  {
    id: 'SIN-2024-00146',
    polizaId: 'HOGAR-2024-002',
    tipo: 'Robo',
    fecha: '10/11/2024',
    descripcion: 'Robo con fractura de puerta',
    estado: 'abierto',
    hitos: ['Comunicado', 'Verificación documental']
  }
];

export const RECIBOS = [
  {
    id: 'REC-2024-001',
    polizaId: 'AUTO-2024-001',
    importe: 350.50,
    estado: 'pagado',
    fecha: '01/11/2024'
  },
  {
    id: 'REC-2024-002',
    polizaId: 'HOGAR-2024-002',
    importe: 420.75,
    estado: 'pendiente',
    fecha: '15/11/2024'
  },
  {
    id: 'REC-2024-003',
    polizaId: 'RCP-2024-003',
    importe: 180.00,
    estado: 'emitido',
    fecha: '20/11/2024'
  }
];

export const DOCUMENTOS = [
  {
    id: 'DOC-001',
    nombre: 'Póliza AUTO-2024-001.pdf',
    tipo: 'póliza',
    fecha: '01/01/2024'
  },
  {
    id: 'DOC-002',
    nombre: 'Recibo REC-2024-001.pdf',
    tipo: 'recibo',
    fecha: '01/11/2024'
  },
  {
    id: 'DOC-003',
    nombre: 'Condiciones Generales.pdf',
    tipo: 'condiciones',
    fecha: '01/01/2024'
  },
  {
    id: 'DOC-004',
    nombre: 'Certificado de Cobertura.pdf',
    tipo: 'certificado',
    fecha: '15/10/2024'
  },
  {
    id: 'DOC-005',
    nombre: 'Comunicación de Siniestro.pdf',
    tipo: 'comunicaciones',
    fecha: '15/11/2024'
  }
];

export const MENSAJES = [
  {
    id: 'MSG-001',
    asunto: 'Bienvenida a la Oficina Virtual',
    ultimoMensaje: 'Tu solicitud de acceso ha sido confirmada. Bienvenido a la plataforma de A.M.A.',
    fecha: '10/11/2024',
    leido: true
  },
  {
    id: 'MSG-002',
    asunto: 'Estado de tu siniestro SIN-2024-00145',
    ultimoMensaje: 'Tu siniestro está en proceso de peritaje. El perito visitará las instalaciones el próximo martes.',
    fecha: '15/11/2024',
    leido: false
  },
  {
    id: 'MSG-003',
    asunto: 'Pago de recibo pendiente',
    ultimoMensaje: 'Tienes un recibo pendiente de pago. Te recordamos que vence el 30 de noviembre.',
    fecha: '12/11/2024',
    leido: false
  }
];
