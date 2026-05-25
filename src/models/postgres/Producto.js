const pool = require('../../config/db');

const TABLE = 'productos';

const Producto = {
  async getAll() {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE} ORDER BY id`);
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE} WHERE id = $1`, [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { categoria_id, nombre, descripcion, precio } = data;
    const { rows } = await pool.query(
      `INSERT INTO ${TABLE} (categoria_id, nombre, descripcion, precio) VALUES ($1, $2, $3, $4) RETURNING *`,
      [categoria_id, nombre, descripcion || null, precio]
    );
    return rows[0];
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    let idx = 1;

    if (data.categoria_id !== undefined) { fields.push(`categoria_id = $${idx++}`); values.push(data.categoria_id); }
    if (data.nombre !== undefined) { fields.push(`nombre = $${idx++}`); values.push(data.nombre); }
    if (data.descripcion !== undefined) { fields.push(`descripcion = $${idx++}`); values.push(data.descripcion); }
    if (data.precio !== undefined) { fields.push(`precio = $${idx++}`); values.push(data.precio); }

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

  async findByCategoria(categoriaId) {
    const { rows } = await pool.query(
      `SELECT * FROM ${TABLE} WHERE categoria_id = $1 ORDER BY nombre`,
      [categoriaId]
    );
    return rows;
  },
};

module.exports = Producto;
