const VentaTotal = require('../models/postgres/VentaTotal');
const DetalleVenta = require('../models/postgres/DetalleVenta');

const VentaTotalService = {
  async getAll() { return VentaTotal.getAll(); },

  async getById(id) {
    const v = await VentaTotal.getById(id);
    if (!v) throw { status: 404, message: 'Venta no encontrada' };
    const detalles = await DetalleVenta.findByVenta(id);
    return { ...v, detalles };
  },

  async create(data) {
    const { empleado_id, subtotal, total_pagado, metodo_pago } = data;
    if (!empleado_id || subtotal === undefined || total_pagado === undefined || !metodo_pago) {
      throw { status: 400, message: 'Campos obligatorios: empleado_id, subtotal, total_pagado, metodo_pago' };
    }
    return VentaTotal.create(data);
  },

  async update(id, data) { await this.getById(id); return VentaTotal.update(id, data); },
  async delete(id) { await this.getById(id); return VentaTotal.delete(id); },
  async findByEmpleado(empleadoId) { return VentaTotal.findByEmpleado(empleadoId); },
  async findByFecha(fecha) { return VentaTotal.findByFecha(fecha); },
};

module.exports = VentaTotalService;
