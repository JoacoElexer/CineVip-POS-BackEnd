const pool = require('../../config/db');

const TABLE = 'promociones';

const Promocion = {
  async getAll() {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE} ORDER BY id`);
    return rows;
  },

  async getById(id) {
    const { rows } = await pool.query(`SELECT * FROM ${TABLE} WHERE id = $1`, [id]);
    return rows[0] || null;
  },

  async create(data) {
    const { nombre, descripcion, descuento_porcentaje, precio_fijo, activo, fecha_inicio, fecha_fin } = data;
    const { rows } = await pool.query(
      `INSERT INTO ${TABLE} (nombre, descripcion, descuento_porcentaje, precio_fijo, activo, fecha_inicio, fecha_fin) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nombre, descripcion, descuento_porcentaje || 0, precio_fijo || null, activo !== undefined ? activo : true, fecha_inicio || null, fecha_fin || null]
    );
    return rows[0];
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    let idx = 1;

    if (data.nombre !== undefined) { fields.push(`nombre = $${idx++}`); values.push(data.nombre); }
    if (data.descripcion !== undefined) { fields.push(`descripcion = $${idx++}`); values.push(data.descripcion); }
    if (data.descuento_porcentaje !== undefined) { fields.push(`descuento_porcentaje = $${idx++}`); values.push(data.descuento_porcentaje); }
    if (data.precio_fijo !== undefined) { fields.push(`precio_fijo = $${idx++}`); values.push(data.precio_fijo); }
    if (data.activo !== undefined) { fields.push(`activo = $${idx++}`); values.push(data.activo); }
    if (data.fecha_inicio !== undefined) { fields.push(`fecha_inicio = $${idx++}`); values.push(data.fecha_inicio); }
    if (data.fecha_fin !== undefined) { fields.push(`fecha_fin = $${idx++}`); values.push(data.fecha_fin); }

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

  async findActivas() {
    const { rows } = await pool.query(
      `SELECT * FROM ${TABLE} WHERE activo = TRUE AND (fecha_inicio IS NULL OR fecha_inicio <= CURRENT_DATE) AND (fecha_fin IS NULL OR fecha_fin >= CURRENT_DATE) ORDER BY id`
    );
    return rows;
  },
};

module.exports = Promocion;
