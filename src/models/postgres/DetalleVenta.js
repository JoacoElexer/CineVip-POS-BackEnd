const pool = require('../../config/db');

const TABLE = 'detalle_ventas';

const DetalleVenta = {
  async getAll() { const { rows } = await pool.query(`SELECT * FROM ${TABLE} ORDER BY id`); return rows; },
  async getById(id) { const { rows } = await pool.query(`SELECT * FROM ${TABLE} WHERE id = $1`, [id]); return rows[0] || null; },
  async create(data) {
    const { venta_id, tipo_item, item_id, asiento_id, cantidad, precio_unitario } = data;
    const { rows } = await pool.query(
      `INSERT INTO ${TABLE} (venta_id, tipo_item, item_id, asiento_id, cantidad, precio_unitario) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [venta_id, tipo_item, item_id, asiento_id || null, cantidad, precio_unitario]
    );
    return rows[0];
  },
  async delete(id) { const { rows } = await pool.query(`DELETE FROM ${TABLE} WHERE id = $1 RETURNING id`, [id]); return rows[0] || null; },
  async findByVenta(ventaId) { const { rows } = await pool.query(`SELECT * FROM ${TABLE} WHERE venta_id = $1 ORDER BY id`, [ventaId]); return rows; },
  async findByTipoItem(tipo) { const { rows } = await pool.query(`SELECT * FROM ${TABLE} WHERE tipo_item = $1 ORDER BY id`, [tipo]); return rows; },
};

module.exports = DetalleVenta;
