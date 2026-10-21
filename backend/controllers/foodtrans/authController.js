const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../../config/database');
const keys = require('../../config/keys');

function publicUser(user) {
  return {
    id: user.id,
    name: user.full_name,
    companyName: user.company_name,
    email: user.email,
    role: user.role,
  };
}

function createSession(user, res) {
  if (!keys.secretOrKey) {
    res.status(503).json({ message: 'Configura JWT_SECRET en backend/.env para habilitar el login.' });
    return;
  }

  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email, name: user.full_name, companyName: user.company_name },
    keys.secretOrKey,
    { expiresIn: '12h' },
  );
  res.json({ token, user: publicUser(user) });
}

async function listClients(req, res, next) {
  try {
    const clients = await query(
      `SELECT id, full_name AS name, company_name AS companyName, email,
        DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS createdAt
       FROM app_users WHERE role = 'client' ORDER BY created_at DESC, full_name`,
    );
    res.json(clients);
  } catch (error) {
    next(error);
  }
}

async function createClient(req, res, next) {
  try {
    const fullName = String(req.body.fullName || '').trim();
    const companyName = String(req.body.companyName || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    if (!fullName || !companyName || !email || password.length < 8) {
      return res.status(400).json({ message: 'Completa nombre, empresa, correo y una contraseña de al menos 8 caracteres.' });
    }

    const id = crypto.randomUUID();
    const passwordHash = await bcrypt.hash(password, 12);
    await query(
      'INSERT INTO app_users (id, full_name, company_name, email, password_hash, role) VALUES (?, ?, ?, ?, ?, ?)',
      [id, fullName, companyName, email, passwordHash, 'client'],
    );
    const clients = await query(
      `SELECT id, full_name AS name, company_name AS companyName, email,
        DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS createdAt
       FROM app_users WHERE id = ?`,
      [id],
    );
    res.status(201).json(clients[0]);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Ya existe una cuenta con ese correo.' });
    }
    next(error);
  }
}

async function updateClient(req, res, next) {
  try {
    const id = String(req.params.id || '').trim();
    const fullName = String(req.body.fullName || '').trim();
    const companyName = String(req.body.companyName || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!id || !fullName || !companyName || !email) {
      return res.status(400).json({ message: 'Completa nombre, empresa y correo.' });
    }
    if (password && password.length < 8) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres.' });
    }

    const existing = await query("SELECT id FROM app_users WHERE id = ? AND role = 'client' LIMIT 1", [id]);
    if (!existing[0]) {
      return res.status(404).json({ message: 'No se encontró la cuenta de cliente.' });
    }

    if (password) {
      const passwordHash = await bcrypt.hash(password, 12);
      await query(
        "UPDATE app_users SET full_name = ?, company_name = ?, email = ?, password_hash = ? WHERE id = ? AND role = 'client'",
        [fullName, companyName, email, passwordHash, id],
      );
    } else {
      await query(
        "UPDATE app_users SET full_name = ?, company_name = ?, email = ? WHERE id = ? AND role = 'client'",
        [fullName, companyName, email, id],
      );
    }

    const clients = await query(
      `SELECT id, full_name AS name, company_name AS companyName, email,
        DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS createdAt
       FROM app_users WHERE id = ? AND role = 'client'`,
      [id],
    );
    res.json(clients[0]);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Ya existe una cuenta con ese correo.' });
    }
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    const rows = await query(
      'SELECT id, full_name, company_name, email, password_hash, role FROM app_users WHERE email = ? LIMIT 1',
      [email],
    );
    if (!rows[0] || !(await bcrypt.compare(password, rows[0].password_hash))) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
    }
    createSession(rows[0], res);
  } catch (error) {
    next(error);
  }
}

function me(req, res) {
  res.json({ user: { id: req.user.id, name: req.user.name, companyName: req.user.companyName, email: req.user.email, role: req.user.role } });
}

module.exports = { listClients, createClient, updateClient, login, me };
