const pool = require('../../config/db');
const bcrypt = require('bcryptjs');

const TABLE = 'empleados';

const Empleado = {
  async getAll() {
    const { rows } = await pool.query(`SELECT id, nombre, usuario, rol, created_at, updated_at FROM ${TABLE} ORDER BY id`);
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(`SELECT id, nombre, usuario, rol, created_at, updated_at FROM ${TABLE} WHERE id = $1`, [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { nombre, usuario, password, rol } = data;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const { rows } = await pool.query(
      `INSERT INTO ${TABLE} (nombre, usuario, password, rol) VALUES ($1, $2, $3, $4) RETURNING id, nombre, usuario, rol, created_at, updated_at`,
      [nombre, usuario, hashed, rol]
    );
    return rows[0];
  },

  async update(id, data) {
    const fields = []; const values = []; let idx = 1;
    if (data.nombre !== undefined) { fields.push(`nombre = $${idx++}`); values.push(data.nombre); }
    if (data.usuario !== undefined) { fields.push(`usuario = $${idx++}`); values.push(data.usuario); }
    if (data.password !== undefined) {
      const salt = await bcrypt.genSalt(10);
      fields.push(`password = $${idx++}`);
      values.push(await bcrypt.hash(data.password, salt));
    }
    if (data.rol !== undefined) { fields.push(`rol = $${idx++}`); values.push(data.rol); }
    if (fields.length === 0) return null;
    fields.push('updated_at = NOW()');
    values.push(id);
    const { rows } = await pool.query(`UPDATE ${TABLE} SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, nombre, usuario, rol, created_at, updated_at`, values);
    return rows[0] || null;
  },

  async delete(id) {
    const { rows } = await pool.query(`DELETE FROM ${TABLE} WHERE id = $1 RETURNING id`, [id]);
    return rows[0] || null;
  },

  async findByUsuario(usuario) {
    const { rows } = await pool.query('SELECT * FROM empleados WHERE usuario = $1', [usuario]);
    return rows[0] || null;
  },

  async comparePassword(plain, hashed) {
    return bcrypt.compare(plain, hashed);
  },
};

module.exports = Empleado;
