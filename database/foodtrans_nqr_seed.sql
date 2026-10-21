USE foodtrans_nqr;

INSERT INTO clients (id, name, city, contact, plan) VALUES
  ('cli-01', 'Frigorificos Andinos', 'Bogota', 'compras@andinos.co', 'Profesional'),
  ('cli-02', 'Mercados del Valle', 'Cali', 'logistica@valle.co', 'Basico'),
  ('cli-03', 'Distribuciones Antioquia', 'Medellin', 'operaciones@distanti.com', 'Empresarial')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  city = VALUES(city),
  contact = VALUES(contact),
  plan = VALUES(plan);

INSERT INTO drivers (id, name, phone, license, status) VALUES
  ('drv-01', 'Carlos Moreno', '300 456 2211', 'C2', 'Disponible'),
  ('drv-02', 'Natalia Rojas', '301 884 1972', 'C2', 'En ruta'),
  ('drv-03', 'Luis Herrera', '312 105 4430', 'C3', 'Disponible')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  phone = VALUES(phone),
  license = VALUES(license),
  status = VALUES(status);

INSERT INTO vehicles (id, plate, type, capacity, status, next_maintenance) VALUES
  ('veh-01', 'NQR-214', 'Camion NQR refrigerado', '4.5 Ton', 'Disponible', '2026-10-05'),
  ('veh-02', 'NQR-319', 'Camion NQR furgon', '4.2 Ton', 'En ruta', '2026-10-18'),
  ('veh-03', 'NQR-522', 'Camion NQR refrigerado', '4.5 Ton', 'Mantenimiento', '2026-09-29')
ON DUPLICATE KEY UPDATE
  plate = VALUES(plate),
  type = VALUES(type),
  capacity = VALUES(capacity),
  status = VALUES(status),
  next_maintenance = VALUES(next_maintenance);

INSERT INTO trips
  (id, client_id, vehicle_id, driver_id, route, product, departure, eta, status, invoice, value, priority, notes)
VALUES
  ('via-1001', 'cli-01', 'veh-02', 'drv-02', 'Bogota - Medellin', 'Lacteos refrigerados', '2026-09-22', '2026-09-23', 'En ruta', 'FT-2026-088', 2350000, 'Alta', 'Entrega con evidencia fotografica al descargar.'),
  ('via-1002', 'cli-02', 'veh-01', 'drv-01', 'Bogota - Cali', 'Alimentos empacados', '2026-09-24', '2026-09-25', 'Programado', 'Pendiente', 2100000, 'Normal', 'Validar remision antes del cargue.'),
  ('via-1003', 'cli-03', 'veh-03', 'drv-03', 'Medellin - Bogota', 'Insumos alimentarios', '2026-09-20', '2026-09-21', 'Facturado', 'FT-2026-081', 1850000, 'Normal', 'Factura y carta porte archivadas.')
ON DUPLICATE KEY UPDATE
  client_id = VALUES(client_id),
  vehicle_id = VALUES(vehicle_id),
  driver_id = VALUES(driver_id),
  route = VALUES(route),
  product = VALUES(product),
  departure = VALUES(departure),
  eta = VALUES(eta),
  status = VALUES(status),
  invoice = VALUES(invoice),
  value = VALUES(value),
  priority = VALUES(priority),
  notes = VALUES(notes);

INSERT INTO documents (id, trip_id, type, name, status, uploaded_at) VALUES
  ('doc-01', 'via-1001', 'Factura', 'Factura FT-2026-088', 'Cargado', '2026-09-22'),
  ('doc-02', 'via-1001', 'Evidencia', 'Foto de cargue', 'Pendiente revision', '2026-09-22'),
  ('doc-03', 'via-1003', 'Carta porte', 'Carta porte Medellin-Bogota', 'Aprobado', '2026-09-21')
ON DUPLICATE KEY UPDATE
  trip_id = VALUES(trip_id),
  type = VALUES(type),
  name = VALUES(name),
  status = VALUES(status),
  uploaded_at = VALUES(uploaded_at);

INSERT INTO financial_projection (year_label, clients, income, admin, sales, production) VALUES
  ('Ano 1', 8, 115200000, 18000000, 12000000, 36000000),
  ('Ano 2', 15, 216000000, 18000000, 16000000, 52000000),
  ('Ano 3', 24, 345600000, 18000000, 22000000, 76000000),
  ('Ano 4', 35, 504000000, 18000000, 30000000, 98000000),
  ('Ano 5', 48, 691200000, 18000000, 38000000, 126000000);

INSERT INTO risk_matrix (variable, risk, mitigation) VALUES
  ('Tecnico', 'Fallas en almacenamiento, rendimiento o disponibilidad del sistema.', 'Backups, monitoreo, pruebas frecuentes y proveedor cloud confiable.'),
  ('Comercial', 'Baja adopcion por empresas que aun trabajan de forma manual.', 'Demostraciones, capacitacion y planes de entrada economicos.'),
  ('Normativo', 'Cambios en tributacion, datos personales o documentos de transporte.', 'Asesoria contable y juridica periodica.');
