const logisticsData = {
  clients: [
    {
      id: 'cli-01',
      name: 'Frigorificos Andinos',
      city: 'Bogota',
      contact: 'compras@andinos.co',
      plan: 'Profesional',
    },
    {
      id: 'cli-02',
      name: 'Mercados del Valle',
      city: 'Cali',
      contact: 'logistica@valle.co',
      plan: 'Basico',
    },
    {
      id: 'cli-03',
      name: 'Distribuciones Antioquia',
      city: 'Medellin',
      contact: 'operaciones@distanti.com',
      plan: 'Empresarial',
    },
  ],
  drivers: [
    {
      id: 'drv-01',
      name: 'Carlos Moreno',
      phone: '300 456 2211',
      license: 'C2',
      status: 'Disponible',
    },
    {
      id: 'drv-02',
      name: 'Natalia Rojas',
      phone: '301 884 1972',
      license: 'C2',
      status: 'En ruta',
    },
    {
      id: 'drv-03',
      name: 'Luis Herrera',
      phone: '312 105 4430',
      license: 'C3',
      status: 'Disponible',
    },
  ],
  vehicles: [
    {
      id: 'veh-01',
      plate: 'NQR-214',
      type: 'Camion NQR refrigerado',
      capacity: '4.5 Ton',
      status: 'Disponible',
      nextMaintenance: '2026-10-05',
    },
    {
      id: 'veh-02',
      plate: 'NQR-319',
      type: 'Camion NQR furgon',
      capacity: '4.2 Ton',
      status: 'En ruta',
      nextMaintenance: '2026-10-18',
    },
    {
      id: 'veh-03',
      plate: 'NQR-522',
      type: 'Camion NQR refrigerado',
      capacity: '4.5 Ton',
      status: 'Mantenimiento',
      nextMaintenance: '2026-09-29',
    },
  ],
  trips: [
    {
      id: 'via-1001',
      clientId: 'cli-01',
      vehicleId: 'veh-02',
      driverId: 'drv-02',
      route: 'Bogota - Medellin',
      product: 'Lacteos refrigerados',
      departure: '2026-09-22',
      eta: '2026-09-23',
      status: 'En ruta',
      invoice: 'FT-2026-088',
      value: 2350000,
      priority: 'Alta',
      notes: 'Entrega con evidencia fotografica al descargar.',
    },
    {
      id: 'via-1002',
      clientId: 'cli-02',
      vehicleId: 'veh-01',
      driverId: 'drv-01',
      route: 'Bogota - Cali',
      product: 'Alimentos empacados',
      departure: '2026-09-24',
      eta: '2026-09-25',
      status: 'Programado',
      invoice: 'Pendiente',
      value: 2100000,
      priority: 'Normal',
      notes: 'Validar remision antes del cargue.',
    },
    {
      id: 'via-1003',
      clientId: 'cli-03',
      vehicleId: 'veh-03',
      driverId: 'drv-03',
      route: 'Medellin - Bogota',
      product: 'Insumos alimentarios',
      departure: '2026-09-20',
      eta: '2026-09-21',
      status: 'Facturado',
      invoice: 'FT-2026-081',
      value: 1850000,
      priority: 'Normal',
      notes: 'Factura y carta porte archivadas.',
    },
  ],
  documents: [
    {
      id: 'doc-01',
      tripId: 'via-1001',
      type: 'Factura',
      name: 'Factura FT-2026-088',
      status: 'Cargado',
      uploadedAt: '2026-09-22',
    },
    {
      id: 'doc-02',
      tripId: 'via-1001',
      type: 'Evidencia',
      name: 'Foto de cargue',
      status: 'Pendiente revision',
      uploadedAt: '2026-09-22',
    },
    {
      id: 'doc-03',
      tripId: 'via-1003',
      type: 'Carta porte',
      name: 'Carta porte Medellin-Bogota',
      status: 'Aprobado',
      uploadedAt: '2026-09-21',
    },
  ],
};

const businessPlanSections = [
  {
    id: 'resumen',
    title: 'Resumen ejecutivo',
    accent: 'Mercado',
    body:
      'FoodTrans NQR centraliza la informacion operativa, administrativa y documental de empresas transportadoras de alimentos.',
  },
  {
    id: 'mercado',
    title: 'Analisis del mercado',
    accent: 'Clientes objetivo',
    body:
      'El proyecto se enfoca en pequenas y medianas empresas transportadoras de alimentos ubicadas inicialmente en Bogota, Medellin y Cali.',
  },
  {
    id: 'tecnico',
    title: 'Analisis tecnico y operacional',
    accent: 'Operacion',
    body:
      'La solucion gestiona clientes, vehiculos, conductores, viajes, facturas, remisiones y evidencias por cada servicio.',
  },
];

const financialProjection = [
  { year: 'Ano 1', clients: 8, income: 115200000, admin: 18000000, sales: 12000000, production: 36000000 },
  { year: 'Ano 2', clients: 15, income: 216000000, admin: 18000000, sales: 16000000, production: 52000000 },
  { year: 'Ano 3', clients: 24, income: 345600000, admin: 18000000, sales: 22000000, production: 76000000 },
  { year: 'Ano 4', clients: 35, income: 504000000, admin: 18000000, sales: 30000000, production: 98000000 },
  { year: 'Ano 5', clients: 48, income: 691200000, admin: 18000000, sales: 38000000, production: 126000000 },
];

const riskMatrix = [
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
    variable: 'Normativo',
    risk: 'Cambios en tributacion, datos personales o documentos de transporte.',
    mitigation: 'Asesoria contable y juridica periodica.',
  },
];

module.exports = {
  logisticsData,
  businessPlanSections,
  financialProjection,
  riskMatrix,
};
