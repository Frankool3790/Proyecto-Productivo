export const businessPlanSections = [
  {
    id: 'resumen',
    title: 'Resumen ejecutivo',
    accent: 'Mercado',
    body:
      'FoodTrans NQR centraliza la informacion operativa, administrativa y documental de empresas transportadoras de alimentos. La propuesta conecta clientes, vehiculos, conductores, viajes, facturas, remisiones y evidencias en un solo sistema web.',
    points: [
      'Rutas iniciales entre Bogota, Medellin y Cali.',
      'Trazabilidad completa por viaje.',
      'Modelo de suscripcion mensual con planes escalables.',
    ],
  },
  {
    id: 'mercado',
    title: 'Analisis del mercado',
    accent: 'Clientes objetivo',
    body:
      'El proyecto se enfoca en pequenas y medianas empresas transportadoras de alimentos que todavia gestionan documentos, facturas y evidencias en archivos separados o soportes fisicos.',
    points: [
      'Segmento inicial: empresas de Bogota, Medellin y Cali.',
      'Necesidad: orden documental y seguimiento del servicio.',
      'Diferenciador: plataforma especializada para viajes NQR de alimentos.',
    ],
  },
  {
    id: 'tecnico',
    title: 'Analisis tecnico y operacional',
    accent: 'Operacion',
    body:
      'La solucion se plantea como una aplicacion web con base de datos, almacenamiento documental, perfiles de usuario, reportes y control del estado de cada viaje desde la programacion hasta la facturacion.',
    points: [
      'Modulo de clientes, vehiculos, conductores y viajes.',
      'Asociacion de facturas, remisiones, carta porte y evidencias.',
      'Posible crecimiento hacia GPS, alertas y notificaciones.',
    ],
  },
  {
    id: 'administrativo',
    title: 'Analisis administrativo',
    accent: 'Gestion',
    body:
      'La estructura inicial puede operar con direccion, desarrollo de software, soporte, ventas y asesoria contable externa, creciendo de acuerdo con la captacion de clientes.',
    points: [
      'Mision: organizar la logistica documental del transporte de alimentos.',
      'Vision: escalar la plataforma a mas ciudades de Colombia.',
      'Valores: responsabilidad, trazabilidad, servicio y mejora continua.',
    ],
  },
  {
    id: 'juridico',
    title: 'Analisis juridico tributario',
    accent: 'Formalizacion',
    body:
      'La forma juridica sugerida para iniciar es SAS por su flexibilidad, facilidad de constitucion y adaptacion a proyectos tecnologicos con posibilidad de crecimiento comercial.',
    points: [
      'Registro en Camara de Comercio y obtencion del RUT.',
      'Cumplimiento de obligaciones tributarias segun actividad economica.',
      'Proteccion de datos personales y terminos de uso de la plataforma.',
    ],
  },
  {
    id: 'financiero',
    title: 'Analisis financiero',
    accent: 'Suscripcion',
    body:
      'El ingreso principal se basa en planes mensuales: Basico, Profesional y Empresarial. Los costos iniciales se concentran en desarrollo, alojamiento, almacenamiento, soporte y comercializacion.',
    points: [
      'Inversion inicial enfocada en software e infraestructura.',
      'Proyeccion por ventas mensuales y anuales.',
      'Indicadores: punto de equilibrio, ROI, flujo de caja y TIR.',
    ],
  },
  {
    id: 'riesgos',
    title: 'Impactos y riesgos',
    accent: 'Mitigacion',
    body:
      'Los riesgos principales incluyen fallas tecnicas, baja adopcion comercial, cambios normativos, seguridad de la informacion y dependencia de proveedores cloud.',
    points: [
      'Copias de seguridad y control de accesos.',
      'Capacitacion y soporte para usuarios.',
      'Validacion constante del producto con empresas reales.',
    ],
  },
];

export const financialProjection = [
  { year: 'Ano 1', clients: 8, income: 115200000, admin: 18000000, sales: 12000000, production: 36000000 },
  { year: 'Ano 2', clients: 15, income: 216000000, admin: 18000000, sales: 16000000, production: 52000000 },
  { year: 'Ano 3', clients: 24, income: 345600000, admin: 18000000, sales: 22000000, production: 76000000 },
  { year: 'Ano 4', clients: 35, income: 504000000, admin: 18000000, sales: 30000000, production: 98000000 },
  { year: 'Ano 5', clients: 48, income: 691200000, admin: 18000000, sales: 38000000, production: 126000000 },
];

export const riskMatrix = [
  {
    variable: 'Tecnico',
    risk: 'Fallas en almacenamiento, rendimiento o disponibilidad del sistema.',
    mitigation: 'Backups, monitoreo, pruebas frecuentes y proveedor cloud confiable.',
  },
  {
    variable: 'Comercial',
    risk: 'Baja adopcion por empresas que aun trabajan de forma manual.',
    mitigation: 'Demostraciones, capacitacion y planes de entrada economicos.',
  },
  {
    variable: 'Talento humano',
    risk: 'Dependencia de pocas personas para soporte y desarrollo.',
    mitigation: 'Documentacion interna y priorizacion de procesos repetibles.',
  },
  {
    variable: 'Normativo',
    risk: 'Cambios en tributacion, tratamiento de datos o documentos de transporte.',
    mitigation: 'Asesoria contable y juridica periodica.',
  },
  {
    variable: 'Medio ambiente',
    risk: 'Contingencias climaticas que afecten rutas y entregas.',
    mitigation: 'Registro de novedades, reprogramacion y comunicacion con clientes.',
  },
];

export const implementationPlan = [
  'Investigacion de mercados',
  'Diseno del modelo de negocio y servicio',
  'Ajuste de inversiones y recursos requeridos',
  'Consecucion de fuentes de financiacion',
  'Constitucion y formalizacion legal',
  'Diseno y desarrollo de la plataforma',
  'Pruebas con usuarios iniciales',
  'Capacitacion y soporte',
  'Inicio de estrategias comerciales',
  'Inicio de ventas',
  'Mejoramiento continuo',
];
