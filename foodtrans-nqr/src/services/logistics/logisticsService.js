export const routeOptions = [
  'Bogota - Medellin',
  'Medellin - Bogota',
  'Bogota - Cali',
  'Cali - Bogota',
];

export const statusOptions = [
  'Programado',
  'En cargue',
  'En ruta',
  'Entregado',
  'Facturado',
];

export const priorityOptions = ['Normal', 'Alta', 'Critica'];

export const initialLogisticsData = {
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

export function getNameById(items, id, fallback = 'Sin asignar') {
  return items.find((item) => item.id === id)?.name ?? fallback;
}

export function getVehicleLabel(vehicles, id) {
  const vehicle = vehicles.find((item) => item.id === id);
  return vehicle ? `${vehicle.plate} - ${vehicle.capacity}` : 'Sin vehiculo';
}

export function calculateDashboardSummary(data) {
  const trips = data.trips;
  const activeTrips = trips.filter((trip) =>
    ['En cargue', 'En ruta'].includes(trip.status),
  ).length;
  const monthlyIncome = trips.reduce((total, trip) => total + Number(trip.value || 0), 0);
  const pendingDocuments = data.documents.filter((doc) => doc.status !== 'Aprobado').length;
  const availableVehicles = data.vehicles.filter((vehicle) => vehicle.status === 'Disponible').length;

  return {
    activeTrips,
    monthlyIncome,
    pendingDocuments,
    availableVehicles,
  };
}
