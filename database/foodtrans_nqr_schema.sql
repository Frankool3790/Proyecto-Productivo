CREATE DATABASE IF NOT EXISTS foodtrans_nqr
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE foodtrans_nqr;

CREATE TABLE IF NOT EXISTS clients (
  id VARCHAR(40) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  city VARCHAR(80) NOT NULL,
  contact VARCHAR(160) NOT NULL,
  plan ENUM('Basico', 'Profesional', 'Empresarial') NOT NULL DEFAULT 'Basico',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS drivers (
  id VARCHAR(40) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  license VARCHAR(20) NOT NULL,
  status ENUM('Disponible', 'En ruta', 'Inactivo') NOT NULL DEFAULT 'Disponible',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vehicles (
  id VARCHAR(40) PRIMARY KEY,
  plate VARCHAR(20) NOT NULL UNIQUE,
  type VARCHAR(120) NOT NULL,
  capacity VARCHAR(40) NOT NULL,
  status ENUM('Disponible', 'En ruta', 'Mantenimiento') NOT NULL DEFAULT 'Disponible',
  next_maintenance DATE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS trips (
  id VARCHAR(40) PRIMARY KEY,
  client_id VARCHAR(40) NOT NULL,
  vehicle_id VARCHAR(40) NOT NULL,
  driver_id VARCHAR(40) NOT NULL,
  route VARCHAR(120) NOT NULL,
  product VARCHAR(160) NOT NULL,
  departure DATE NOT NULL,
  eta DATE NOT NULL,
  status ENUM('Programado', 'En cargue', 'En ruta', 'Entregado', 'Facturado') NOT NULL DEFAULT 'Programado',
  invoice VARCHAR(80) NOT NULL DEFAULT 'Pendiente',
  value DECIMAL(12, 2) NOT NULL DEFAULT 0,
  priority ENUM('Normal', 'Alta', 'Critica') NOT NULL DEFAULT 'Normal',
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_trips_clients FOREIGN KEY (client_id) REFERENCES clients(id),
  CONSTRAINT fk_trips_vehicles FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
  CONSTRAINT fk_trips_drivers FOREIGN KEY (driver_id) REFERENCES drivers(id),
  INDEX idx_trips_status (status),
  INDEX idx_trips_departure (departure)
);

CREATE TABLE IF NOT EXISTS documents (
  id VARCHAR(40) PRIMARY KEY,
  trip_id VARCHAR(40) NOT NULL,
  type ENUM('Factura', 'Remision', 'Carta porte', 'Evidencia', 'Otro') NOT NULL,
  name VARCHAR(160) NOT NULL,
  status ENUM('Cargado', 'Pendiente revision', 'Aprobado') NOT NULL DEFAULT 'Cargado',
  uploaded_at DATE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_documents_trips FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
  INDEX idx_documents_status (status)
);

CREATE TABLE IF NOT EXISTS financial_projection (
  id INT AUTO_INCREMENT PRIMARY KEY,
  year_label VARCHAR(20) NOT NULL,
  clients INT NOT NULL,
  income DECIMAL(14, 2) NOT NULL,
  admin DECIMAL(14, 2) NOT NULL,
  sales DECIMAL(14, 2) NOT NULL,
  production DECIMAL(14, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS risk_matrix (
  id INT AUTO_INCREMENT PRIMARY KEY,
  variable VARCHAR(80) NOT NULL,
  risk TEXT NOT NULL,
  mitigation TEXT NOT NULL
);
