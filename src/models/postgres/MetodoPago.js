const pool = require('../../config/db');

const TABLE = 'metodos_pago';

const MetodoPago = {
  async getAll() {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE} ORDER BY id`);
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE} WHERE id = $1`, [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { venta_id, tipo_pago, monto_pagado } = data;
    const { rows } = await pool.query(
      `INSERT INTO ${TABLE} (venta_id, tipo_pago, monto_pagado) VALUES ($1, $2, $3) RETURNING *`,
      [venta_id, tipo_pago, monto_pagado]
    );
    return rows[0];
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    let idx = 1;

    if (data.venta_id !== undefined) { fields.push(`venta_id = $${idx++}`); values.push(data.venta_id); }
    if (data.tipo_pago !== undefined) { fields.push(`tipo_pago = $${idx++}`); values.push(data.tipo_pago); }
    if (data.monto_pagado !== undefined) { fields.push(`monto_pagado = $${idx++}`); values.push(data.monto_pagado); }

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

  async findByVenta(ventaId) {
    const { rows } = await pool.query(
      `SELECT * FROM ${TABLE} WHERE venta_id = $1 ORDER BY id`,
      [ventaId]
    );
    return rows;
  },
};

module.exports = MetodoPago;
