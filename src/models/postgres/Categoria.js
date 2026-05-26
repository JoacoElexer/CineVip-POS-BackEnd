const pool = require('../../config/db');

const TABLE = 'categorias';

const Categoria = {
  async getAll() { const { rows } = await pool.query(`SELECT * FROM ${TABLE} ORDER BY id`); return rows; },
  async getById(id) { const { rows } = await pool.query(`SELECT * FROM ${TABLE} WHERE id = $1`, [id]); return rows[0] || null; },
  async create(data) { const { nombre } = data; const { rows } = await pool.query(`INSERT INTO ${TABLE} (nombre) VALUES ($1) RETURNING *`, [nombre]); return rows[0]; },
  async update(id, data) {
    if (!data.nombre) return null;
    const { rows } = await pool.query(`UPDATE ${TABLE} SET nombre = $1, updated_at = NOW() WHERE id = $2 RETURNING *`, [data.nombre, id]);
    return rows[0] || null;
  },
  async delete(id) { const { rows } = await pool.query(`DELETE FROM ${TABLE} WHERE id = $1 RETURNING id`, [id]); return rows[0] || null; },
};

module.exports = Categoria;
