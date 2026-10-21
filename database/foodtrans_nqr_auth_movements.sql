USE foodtrans_nqr;

CREATE TABLE IF NOT EXISTS app_users (
  id CHAR(36) PRIMARY KEY,
  full_name VARCHAR(160) NOT NULL,
  company_name VARCHAR(160) NOT NULL DEFAULT '',
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'client') NOT NULL DEFAULT 'client',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS movements (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  movement_date DATE NOT NULL,
  client_name VARCHAR(160) NOT NULL,
  owner_name VARCHAR(160) NOT NULL,
  vehicle VARCHAR(40) NOT NULL,
  trailer VARCHAR(40) NOT NULL DEFAULT '',
  origin VARCHAR(120) NOT NULL,
  destination VARCHAR(120) NOT NULL,
  manifest_number VARCHAR(60) NOT NULL,
  mtu DECIMAL(15, 2) NOT NULL DEFAULT 0,
  third_party_freight DECIMAL(15, 2) NOT NULL DEFAULT 0,
  third_party_connections DECIMAL(15, 2) NOT NULL DEFAULT 0,
  advances DECIMAL(15, 2) NOT NULL DEFAULT 0,
  withholding DECIMAL(15, 2) NOT NULL DEFAULT 0,
  ica DECIMAL(15, 2) NOT NULL DEFAULT 0,
  retention_fopat DECIMAL(15, 2) NOT NULL DEFAULT 0,
  total_payable DECIMAL(15, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_movements_app_users FOREIGN KEY (user_id) REFERENCES app_users(id),
  INDEX idx_movements_date (movement_date),
  INDEX idx_movements_user_date (user_id, movement_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO app_users (id, full_name, company_name, email, password_hash, role) VALUES
  ('00000000-0000-4000-8000-000000000001', 'Carlos', 'Cliente FoodTrans', 'Carlos@gmail.com', '$2b$12$C4H4XwYdFEmeHT5EWhTXk.I6WThk3Io6/MEFmE996A/kb7JWoi./6', 'client'),
  ('00000000-0000-4000-8000-000000000002', 'Administrador', 'FoodTrans NQR', 'admin123@gmail.com', '$2b$12$agz7ZbtxviuXxb2t.rK5tOHf.XmxsDaZooOHaADuIhYp/4vuaZfMq', 'admin');
