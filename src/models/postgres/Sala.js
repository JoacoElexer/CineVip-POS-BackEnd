const pool = require('../../config/db');

const TABLE = 'salas';

const Sala = {
  async getAll() { const { rows } = await pool.query(`SELECT * FROM ${TABLE} ORDER BY id`); return rows; },
  async getById(id) { const { rows } = await pool.query(`SELECT * FROM ${TABLE} WHERE id = $1`, [id]); return rows[0] || null; },
  async create(data) { const { nombre, capacidad } = data; const { rows } = await pool.query(`INSERT INTO ${TABLE} (nombre, capacidad) VALUES ($1, $2) RETURNING *`, [nombre, capacidad]); return rows[0]; },
  async update(id, data) {
    const fields = []; const values = []; let idx = 1;
    if (data.nombre !== undefined) { fields.push(`nombre = $${idx++}`); values.push(data.nombre); }
    if (data.capacidad !== undefined) { fields.push(`capacidad = $${idx++}`); values.push(data.capacidad); }
    if (fields.length === 0) return null;
    fields.push('updated_at = NOW()');
    values.push(id);
    const { rows } = await pool.query(`UPDATE ${TABLE} SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`, values);
    return rows[0] || null;
  },
  async delete(id) { const { rows } = await pool.query(`DELETE FROM ${TABLE} WHERE id = $1 RETURNING id`, [id]); return rows[0] || null; },
};

module.exports = Sala;
