const pool = require('../../config/db');

const TABLE = 'detalle_venta_boletos';

const DetalleVentaBoleto = {
  async getAll() {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE} ORDER BY id`);
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE} WHERE id = $1`, [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { venta_id, funcion_id, asiento_id, precio_unitario } = data;
    const { rows } = await pool.query(
      `INSERT INTO ${TABLE} (venta_id, funcion_id, asiento_id, precio_unitario) VALUES ($1, $2, $3, $4) RETURNING *`,
      [venta_id, funcion_id, asiento_id, precio_unitario]
    );
    return rows[0];
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    let idx = 1;

    if (data.venta_id !== undefined) { fields.push(`venta_id = $${idx++}`); values.push(data.venta_id); }
    if (data.funcion_id !== undefined) { fields.push(`funcion_id = $${idx++}`); values.push(data.funcion_id); }
    if (data.asiento_id !== undefined) { fields.push(`asiento_id = $${idx++}`); values.push(data.asiento_id); }
    if (data.precio_unitario !== undefined) { fields.push(`precio_unitario = $${idx++}`); values.push(data.precio_unitario); }

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

module.exports = DetalleVentaBoleto;
