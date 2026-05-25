const pool = require('../../config/db');

const TABLE = 'ventas';

const Venta = {
  async getAll() {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE} ORDER BY fecha_venta DESC`);
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE} WHERE id = $1`, [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { usuario_id, subtotal, descuento, total } = data;
    const { rows } = await pool.query(
      `INSERT INTO ${TABLE} (usuario_id, subtotal, descuento, total) VALUES ($1, $2, $3, $4) RETURNING *`,
      [usuario_id, subtotal, descuento || 0, total]
    );
    return rows[0];
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    let idx = 1;

    if (data.usuario_id !== undefined) { fields.push(`usuario_id = $${idx++}`); values.push(data.usuario_id); }
    if (data.subtotal !== undefined) { fields.push(`subtotal = $${idx++}`); values.push(data.subtotal); }
    if (data.descuento !== undefined) { fields.push(`descuento = $${idx++}`); values.push(data.descuento); }
    if (data.total !== undefined) { fields.push(`total = $${idx++}`); values.push(data.total); }

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

  async findByUsuario(usuarioId) {
    const { rows } = await pool.query(
      `SELECT * FROM ${TABLE} WHERE usuario_id = $1 ORDER BY fecha_venta DESC`,
      [usuarioId]
    );
    return rows;
  },

  async findByFecha(fecha) {
    const { rows } = await pool.query(
      `SELECT * FROM ${TABLE} WHERE DATE(fecha_venta) = $1 ORDER BY fecha_venta DESC`,
      [fecha]
    );
    return rows;
  },
};

module.exports = Venta;
