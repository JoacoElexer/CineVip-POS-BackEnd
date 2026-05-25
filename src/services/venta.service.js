const Venta = require('../models/postgres/Venta');
const DetalleVentaBoleto = require('../models/postgres/DetalleVentaBoleto');
const DetalleVentaProducto = require('../models/postgres/DetalleVentaProducto');
const MetodoPago = require('../models/postgres/MetodoPago');

const VentaService = {
  async getAll() {
    return Venta.getAll();
  },

  async getById(id) {
    const venta = await Venta.getById(id);
    if (!venta) throw { status: 404, message: 'Venta no encontrada' };
    const detalleBoletos = await DetalleVentaBoleto.findByVenta(id);
    const detalleProductos = await DetalleVentaProducto.findByVenta(id);
    const metodosPago = await MetodoPago.findByVenta(id);
    return { ...venta, detalle_boletos: detalleBoletos, detalle_productos: detalleProductos, metodos_pago: metodosPago };
  },

  async create(data) {
    const { usuario_id, subtotal, descuento, total } = data;
    if (!usuario_id || subtotal === undefined || total === undefined) {
      throw { status: 400, message: 'Campos obligatorios: usuario_id, subtotal, total' };
    }
    return Venta.create({ usuario_id, subtotal, descuento: descuento || 0, total });
  },

  async update(id, data) {
    await this.getById(id);
    return Venta.update(id, data);
  },

  async delete(id) {
    await this.getById(id);
    return Venta.delete(id);
  },

  async findByUsuario(usuarioId) {
    return Venta.findByUsuario(usuarioId);
  },

  async findByFecha(fecha) {
    return Venta.findByFecha(fecha);
  },
};

module.exports = VentaService;
