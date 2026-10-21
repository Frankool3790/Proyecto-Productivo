const db = require('../config/config');
const bcrypt = require('bcryptjs');
const RolUsuario = {};

RolUsuario.create = async (rolU, result) => {
    const sql = `INSERT INTO ROL_USUARIO(
                 rol_id,
                 usuario_id,
                 estado_cred
                 ) VALUES (?,?,?)`;
    db.query(sql,
        [
            rolU.rol_id,
            rolU.usuario_id,
            rolU.estado_cred
        ], (err, res) => {
            if (err) {
                console.log('Error al insertar datos', err);
                result(err, null);
            } else {
                console.log('Datos insertados correctamente: ', {rolU});
                result(null, {rolU});
            }
        }
    );
};

module.exports = RolUsuario;