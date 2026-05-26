const pool = require('../../config/db');

const TABLE = 'ventas_totales';

const VentaTotal = {
  async getAll() { const { rows } = await pool.query(`SELECT * FROM ${TABLE} ORDER BY fecha_transaccion DESC`); return rows; },
  async getById(id) { const { rows } = await pool.query(`SELECT * FROM ${TABLE} WHERE id = $1`, [id]); return rows[0] || null; },
  async create(data) {
    const { empleado_id, subtotal, propina, total_pagado, metodo_pago } = data;
    const { rows } = await pool.query(
      `INSERT INTO ${TABLE} (empleado_id, subtotal, propina, total_pagado, metodo_pago) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [empleado_id, subtotal, propina || 0, total_pagado, metodo_pago]
    );
    return rows[0];
  },
  async update(id, data) {
    const fields = []; const values = []; let idx = 1;
    if (data.empleado_id !== undefined) { fields.push(`empleado_id = $${idx++}`); values.push(data.empleado_id); }
    if (data.subtotal !== undefined) { fields.push(`subtotal = $${idx++}`); values.push(data.subtotal); }
    if (data.propina !== undefined) { fields.push(`propina = $${idx++}`); values.push(data.propina); }
    if (data.total_pagado !== undefined) { fields.push(`total_pagado = $${idx++}`); values.push(data.total_pagado); }
    if (data.metodo_pago !== undefined) { fields.push(`metodo_pago = $${idx++}`); values.push(data.metodo_pago); }
    if (fields.length === 0) return null;
    fields.push('updated_at = NOW()');
    values.push(id);
    const { rows } = await pool.query(`UPDATE ${TABLE} SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`, values);
    return rows[0] || null;
  },
  async delete(id) { const { rows } = await pool.query(`DELETE FROM ${TABLE} WHERE id = $1 RETURNING id`, [id]); return rows[0] || null; },
  async findByEmpleado(empleadoId) { const { rows } = await pool.query(`SELECT * FROM ${TABLE} WHERE empleado_id = $1 ORDER BY fecha_transaccion DESC`, [empleadoId]); return rows; },
  async findByFecha(fecha) { const { rows } = await pool.query(`SELECT * FROM ${TABLE} WHERE DATE(fecha_transaccion) = $1 ORDER BY fecha_transaccion DESC`, [fecha]); return rows; },
};

module.exports = VentaTotal;
