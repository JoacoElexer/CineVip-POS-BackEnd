const pool = require('../../config/db');
const bcrypt = require('bcryptjs');

const TABLE = 'usuarios';

const Usuario = {
  async getAll() {
    const { rows } = await pool.query(`SELECT id, nombre, email, rol, created_at, updated_at FROM ${TABLE} ORDER BY id`);
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(`SELECT id, nombre, email, rol, created_at, updated_at FROM ${TABLE} WHERE id = $1`, [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { nombre, email, password, rol } = data;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const { rows } = await pool.query(
      `INSERT INTO ${TABLE} (nombre, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING id, nombre, email, rol, created_at, updated_at`,
      [nombre, email, hashedPassword, rol]
    );
    return rows[0];
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    let idx = 1;

    if (data.nombre !== undefined) { fields.push(`nombre = $${idx++}`); values.push(data.nombre); }
    if (data.email !== undefined) { fields.push(`email = $${idx++}`); values.push(data.email); }
    if (data.password !== undefined) {
      const salt = await bcrypt.genSalt(10);
      fields.push(`password = $${idx++}`);
      values.push(await bcrypt.hash(data.password, salt));
    }
    if (data.rol !== undefined) { fields.push(`rol = $${idx++}`); values.push(data.rol); }

    if (fields.length === 0) return null;
    fields.push(`updated_at = NOW()`);
    values.push(id);

    const { rows } = await pool.query(
      `UPDATE ${TABLE} SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, nombre, email, rol, created_at, updated_at`,
      values
    );
    return rows[0] || null;
  },

  async delete(id) {
    const { rows } = await pool.query(`DELETE FROM ${TABLE} WHERE id = $1 RETURNING id`, [id]);
    return rows[0] || null;
  },

  async findByEmail(email) {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE} WHERE email = $1`, [email]);
    return rows[0] || null;
  },

  async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  },
};

module.exports = Usuario;
