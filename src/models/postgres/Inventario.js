const pool = require('../../config/db');

const TABLE = 'inventario';

const Inventario = {
  async getAll() {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE} ORDER BY id`);
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE} WHERE id = $1`, [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { producto_id, stock_actual, stock_minimo } = data;
    const { rows } = await pool.query(
      `INSERT INTO ${TABLE} (producto_id, stock_actual, stock_minimo) VALUES ($1, $2, $3) RETURNING *`,
      [producto_id, stock_actual || 0, stock_minimo || 5]
    );
    return rows[0];
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    let idx = 1;

    if (data.stock_actual !== undefined) { fields.push(`stock_actual = $${idx++}`); values.push(data.stock_actual); }
    if (data.stock_minimo !== undefined) { fields.push(`stock_minimo = $${idx++}`); values.push(data.stock_minimo); }

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

  async getByProducto(productoId) {
    const { rows } = await pool.query(
      `SELECT * FROM ${TABLE} WHERE producto_id = $1`,
      [productoId]
    );
    return rows[0] || null;
  },

  async ajustarStock(productoId, cantidad) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const { rows } = await client.query(
        `UPDATE ${TABLE} SET stock_actual = stock_actual + $1, updated_at = NOW() WHERE producto_id = $2 RETURNING *`,
        [cantidad, productoId]
      );
      if (rows.length === 0) {
        await client.query('ROLLBACK');
        return null;
      }
      await client.query('COMMIT');
      return rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },
};

module.exports = Inventario;
