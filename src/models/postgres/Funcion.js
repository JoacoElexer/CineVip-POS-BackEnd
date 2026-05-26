const pool = require('../../config/db');

const TABLE = 'funciones';

const Funcion = {
  async getAll() { const { rows } = await pool.query(`SELECT * FROM ${TABLE} ORDER BY fecha, hora`); return rows; },
  async getById(id) { const { rows } = await pool.query(`SELECT * FROM ${TABLE} WHERE id = $1`, [id]); return rows[0] || null; },
  async create(data) {
    const { pelicula_id, sala_id, fecha, hora, precio_boleto } = data;
    const { rows } = await pool.query(
      `INSERT INTO ${TABLE} (pelicula_id, sala_id, fecha, hora, precio_boleto) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [pelicula_id, sala_id, fecha, hora, precio_boleto]
    );
    return rows[0];
  },
  async update(id, data) {
    const fields = []; const values = []; let idx = 1;
    if (data.pelicula_id !== undefined) { fields.push(`pelicula_id = $${idx++}`); values.push(data.pelicula_id); }
    if (data.sala_id !== undefined) { fields.push(`sala_id = $${idx++}`); values.push(data.sala_id); }
    if (data.fecha !== undefined) { fields.push(`fecha = $${idx++}`); values.push(data.fecha); }
    if (data.hora !== undefined) { fields.push(`hora = $${idx++}`); values.push(data.hora); }
    if (data.precio_boleto !== undefined) { fields.push(`precio_boleto = $${idx++}`); values.push(data.precio_boleto); }
    if (fields.length === 0) return null;
    fields.push('updated_at = NOW()');
    values.push(id);
    const { rows } = await pool.query(`UPDATE ${TABLE} SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`, values);
    return rows[0] || null;
  },
  async delete(id) { const { rows } = await pool.query(`DELETE FROM ${TABLE} WHERE id = $1 RETURNING id`, [id]); return rows[0] || null; },
  async findBySala(salaId) { const { rows } = await pool.query(`SELECT * FROM ${TABLE} WHERE sala_id = $1 ORDER BY fecha, hora`, [salaId]); return rows; },
  async findByFecha(fecha) { const { rows } = await pool.query(`SELECT * FROM ${TABLE} WHERE fecha = $1 ORDER BY hora`, [fecha]); return rows; },
  async findByPelicula(peliculaId) { const { rows } = await pool.query(`SELECT * FROM ${TABLE} WHERE pelicula_id = $1 ORDER BY fecha, hora`, [peliculaId]); return rows; },
};

module.exports = Funcion;
