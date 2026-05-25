const pool = require('../../config/db');

const TABLE = 'detalle_venta_productos';

const DetalleVentaProducto = {
  async getAll() {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE} ORDER BY id`);
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE} WHERE id = $1`, [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { venta_id, producto_id, cantidad, precio_unitario, importe } = data;
    const { rows } = await pool.query(
      `INSERT INTO ${TABLE} (venta_id, producto_id, cantidad, precio_unitario, importe) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [venta_id, producto_id, cantidad, precio_unitario, importe]
    );
    return rows[0];
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    let idx = 1;

    if (data.venta_id !== undefined) { fields.push(`venta_id = $${idx++}`); values.push(data.venta_id); }
    if (data.producto_id !== undefined) { fields.push(`producto_id = $${idx++}`); values.push(data.producto_id); }
    if (data.cantidad !== undefined) { fields.push(`cantidad = $${idx++}`); values.push(data.cantidad); }
    if (data.precio_unitario !== undefined) { fields.push(`precio_unitario = $${idx++}`); values.push(data.precio_unitario); }
    if (data.importe !== undefined) { fields.push(`importe = $${idx++}`); values.push(data.importe); }

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

module.exports = DetalleVentaProducto;
