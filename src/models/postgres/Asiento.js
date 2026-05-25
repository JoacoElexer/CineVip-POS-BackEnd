const pool = require('../../config/db');

const TABLE = 'asientos';

const Asiento = {
  async getAll() {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE} ORDER BY id`);
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE} WHERE id = $1`, [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { sala_id, fila, numero, estado } = data;
    const { rows } = await pool.query(
      `INSERT INTO ${TABLE} (sala_id, fila, numero, estado) VALUES ($1, $2, $3, $4) RETURNING *`,
      [sala_id, fila, numero, estado || 'Disponible']
    );
    return rows[0];
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    let idx = 1;

    if (data.sala_id !== undefined) { fields.push(`sala_id = $${idx++}`); values.push(data.sala_id); }
    if (data.fila !== undefined) { fields.push(`fila = $${idx++}`); values.push(data.fila); }
    if (data.numero !== undefined) { fields.push(`numero = $${idx++}`); values.push(data.numero); }
    if (data.estado !== undefined) { fields.push(`estado = $${idx++}`); values.push(data.estado); }

    if (fields.length === 0) return null;
    fields.push(`updated_at = NOW()`);
    values.push(id);

    const { rows } = await pool.query(
      `UPDATE ${TABLE} SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
      values
    );
    return rows[0] || null;
  },

  async delete(id) {
    const { rows } = await pool.query(`DELETE FROM ${TABLE} WHERE id = $1 RETURNING id`, [id]);
    return rows[0] || null;
  },

  async findBySala(salaId) {
    const { rows } = await pool.query(
      `SELECT * FROM ${TABLE} WHERE sala_id = $1 ORDER BY fila, numero`,
      [salaId]
    );
    return rows;
  },

  async actualizarEstado(id, estado) {
    const { rows } = await pool.query(
      `UPDATE ${TABLE} SET estado = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [estado, id]
    );
    return rows[0] || null;
  },
};

module.exports = Asiento;
