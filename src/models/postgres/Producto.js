const pool = require('../../config/db');

const TABLE = 'productos';

const Producto = {
  async getAll() { const { rows } = await pool.query(`SELECT * FROM ${TABLE} ORDER BY id`); return rows; },
  async getById(id) { const { rows } = await pool.query(`SELECT * FROM ${TABLE} WHERE id = $1`, [id]); return rows[0] || null; },
  async create(data) {
    const { categoria_id, nombre, precio_unitario, stock_actual } = data;
    const { rows } = await pool.query(
      `INSERT INTO ${TABLE} (categoria_id, nombre, precio_unitario, stock_actual) VALUES ($1, $2, $3, $4) RETURNING *`,
      [categoria_id, nombre, precio_unitario, stock_actual || 0]
    );
    return rows[0];
  },
  async update(id, data) {
    const fields = []; const values = []; let idx = 1;
    if (data.categoria_id !== undefined) { fields.push(`categoria_id = $${idx++}`); values.push(data.categoria_id); }
    if (data.nombre !== undefined) { fields.push(`nombre = $${idx++}`); values.push(data.nombre); }
    if (data.precio_unitario !== undefined) { fields.push(`precio_unitario = $${idx++}`); values.push(data.precio_unitario); }
    if (data.stock_actual !== undefined) { fields.push(`stock_actual = $${idx++}`); values.push(data.stock_actual); }
    if (fields.length === 0) return null;
    fields.push('updated_at = NOW()');
    values.push(id);
    const { rows } = await pool.query(`UPDATE ${TABLE} SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`, values);
    return rows[0] || null;
  },
  async delete(id) { const { rows } = await pool.query(`DELETE FROM ${TABLE} WHERE id = $1 RETURNING id`, [id]); return rows[0] || null; },
  async ajustarStock(id, cantidad) {
    const { rows } = await pool.query(
      `UPDATE ${TABLE} SET stock_actual = stock_actual + $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [cantidad, id]
    );
    return rows[0] || null;
  },
  async findByCategoria(categoriaId) { const { rows } = await pool.query(`SELECT * FROM ${TABLE} WHERE categoria_id = $1 ORDER BY nombre`, [categoriaId]); return rows; },
};

module.exports = Producto;
