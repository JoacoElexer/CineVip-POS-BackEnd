const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CineVIP POS API',
      version: '1.0.0',
      description: 'API REST para el sistema de punto de venta CineVIP',
    },
    servers: [
      { url: '/api', description: 'Servidor local' },
    ],
    tags: [
      { name: 'Empleados', description: 'Cuentas de empleados del sistema' },
      { name: 'Categorías', description: 'Clasificación del menú' },
      { name: 'Productos', description: 'Catálogo de productos e inventario' },
      { name: 'Promociones', description: 'Combos y promociones' },
      { name: 'Salas', description: 'Infraestructura de salas' },
      { name: 'Asientos', description: 'Mapa de butacas por sala' },
      { name: 'Funciones', description: 'Cartelera horaria' },
      { name: 'Ventas', description: 'Transacciones totales' },
      { name: 'Detalle Ventas', description: 'Items individuales de cada venta' },
      { name: 'Películas', description: 'Catálogo de películas (MongoDB)' },
      { name: 'Perfiles Usuario', description: 'Clientes VIP (MongoDB)' },
      { name: 'Reportes Cierre', description: 'Cierres de caja (MongoDB)' },
    ],
    components: {
      schemas: {
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', description: 'Mensaje de error' },
          },
        },
        Empleado: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nombre: { type: 'string' },
            usuario: { type: 'string' },
            rol: { type: 'string', enum: ['Cajero', 'Administrador'] },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        EmpleadoInput: {
          type: 'object',
          required: ['nombre', 'usuario', 'password', 'rol'],
          properties: {
            nombre: { type: 'string', example: 'Juan Pérez' },
            usuario: { type: 'string', example: 'jperez' },
            password: { type: 'string', format: 'password', example: '123456' },
            rol: { type: 'string', enum: ['Cajero', 'Administrador'], example: 'Cajero' },
          },
        },
        LoginInput: {
          type: 'object',
          required: ['usuario', 'password'],
          properties: {
            usuario: { type: 'string', example: 'jperez' },
            password: { type: 'string', format: 'password', example: '123456' },
          },
        },
        Categoria: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nombre: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        CategoriaInput: {
          type: 'object',
          required: ['nombre'],
          properties: {
            nombre: { type: 'string', example: 'Dulcería' },
          },
        },
        Producto: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            categoria_id: { type: 'integer' },
            nombre: { type: 'string' },
            precio_unitario: { type: 'number', format: 'float' },
            stock_actual: { type: 'integer' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        ProductoInput: {
          type: 'object',
          required: ['categoria_id', 'nombre', 'precio_unitario'],
          properties: {
            categoria_id: { type: 'integer', example: 1 },
            nombre: { type: 'string', example: 'Palomitas Grandes' },
            precio_unitario: { type: 'number', format: 'float', example: 5.50 },
            stock_actual: { type: 'integer', example: 100 },
          },
        },
        StockInput: {
          type: 'object',
          required: ['cantidad'],
          properties: {
            cantidad: { type: 'integer', example: -5, description: 'Puede ser negativo para restar' },
          },
        },
        Promocion: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nombre: { type: 'string' },
            precio_combo: { type: 'number', format: 'float' },
            activo: { type: 'boolean' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        PromocionInput: {
          type: 'object',
          required: ['nombre', 'precio_combo'],
          properties: {
            nombre: { type: 'string', example: 'Combo Pareja VIP' },
            precio_combo: { type: 'number', format: 'float', example: 12.99 },
            activo: { type: 'boolean', example: true },
          },
        },
        Sala: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nombre: { type: 'string' },
            capacidad: { type: 'integer' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        SalaInput: {
          type: 'object',
          required: ['nombre', 'capacidad'],
          properties: {
            nombre: { type: 'string', example: 'Sala 1 VIP' },
            capacidad: { type: 'integer', example: 80 },
          },
        },
        Asiento: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            sala_id: { type: 'integer' },
            fila: { type: 'string' },
            numero: { type: 'integer' },
            tipo_asiento: { type: 'string', enum: ['Regular', 'Silla de Ruedas'] },
            estado_actual: { type: 'string', enum: ['Disponible', 'Ocupado', 'Mantenimiento'] },
          },
        },
        AsientoInput: {
          type: 'object',
          required: ['sala_id', 'fila', 'numero'],
          properties: {
            sala_id: { type: 'integer', example: 1 },
            fila: { type: 'string', example: 'A' },
            numero: { type: 'integer', example: 1 },
            tipo_asiento: { type: 'string', enum: ['Regular', 'Silla de Ruedas'], example: 'Regular' },
            estado_actual: { type: 'string', enum: ['Disponible', 'Ocupado', 'Mantenimiento'], example: 'Disponible' },
          },
        },
        EstadoInput: {
          type: 'object',
          required: ['estado'],
          properties: {
            estado: { type: 'string', enum: ['Disponible', 'Ocupado', 'Mantenimiento'], example: 'Ocupado' },
          },
        },
        Funcion: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            pelicula_id: { type: 'string' },
            sala_id: { type: 'integer' },
            fecha: { type: 'string', format: 'date' },
            hora: { type: 'string', format: 'time' },
            precio_boleto: { type: 'number', format: 'float' },
          },
        },
        FuncionInput: {
          type: 'object',
          required: ['pelicula_id', 'sala_id', 'fecha', 'hora', 'precio_boleto'],
          properties: {
            pelicula_id: { type: 'string', example: '60f7b1c2...' },
            sala_id: { type: 'integer', example: 1 },
            fecha: { type: 'string', format: 'date', example: '2026-05-25' },
            hora: { type: 'string', format: 'time', example: '19:30' },
            precio_boleto: { type: 'number', format: 'float', example: 8.50 },
          },
        },
        VentaTotal: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            empleado_id: { type: 'integer' },
            fecha_transaccion: { type: 'string', format: 'date-time' },
            subtotal: { type: 'number', format: 'float' },
            propina: { type: 'number', format: 'float' },
            total_pagado: { type: 'number', format: 'float' },
            metodo_pago: { type: 'string', enum: ['Efectivo', 'Tarjeta'] },
          },
        },
        VentaTotalInput: {
          type: 'object',
          required: ['empleado_id', 'subtotal', 'total_pagado', 'metodo_pago'],
          properties: {
            empleado_id: { type: 'integer', example: 1 },
            subtotal: { type: 'number', format: 'float', example: 25.00 },
            propina: { type: 'number', format: 'float', example: 2.00 },
            total_pagado: { type: 'number', format: 'float', example: 27.00 },
            metodo_pago: { type: 'string', enum: ['Efectivo', 'Tarjeta'], example: 'Efectivo' },
          },
        },
        DetalleVenta: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            venta_id: { type: 'integer' },
            tipo_item: { type: 'string', enum: ['Boleto', 'Producto', 'Combo'] },
            item_id: { type: 'integer' },
            asiento_id: { type: 'integer', nullable: true },
            cantidad: { type: 'integer' },
            precio_unitario: { type: 'number', format: 'float' },
          },
        },
        DetalleVentaInput: {
          type: 'object',
          required: ['venta_id', 'tipo_item', 'item_id', 'cantidad', 'precio_unitario'],
          properties: {
            venta_id: { type: 'integer', example: 1 },
            tipo_item: { type: 'string', enum: ['Boleto', 'Producto', 'Combo'], example: 'Producto' },
            item_id: { type: 'integer', example: 1 },
            asiento_id: { type: 'integer', example: null, nullable: true },
            cantidad: { type: 'integer', example: 2 },
            precio_unitario: { type: 'number', format: 'float', example: 5.50 },
          },
        },
        Pelicula: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            titulo: { type: 'string' },
            sinopsis: { type: 'string' },
            duracion: { type: 'integer' },
            clasificacion: { type: 'string' },
            generos: { type: 'array', items: { type: 'string' } },
          },
        },
        PeliculaInput: {
          type: 'object',
          properties: {
            titulo: { type: 'string', example: 'Avengers: Endgame' },
            sinopsis: { type: 'string', example: 'Los Vengadores...' },
            duracion: { type: 'integer', example: 181 },
            clasificacion: { type: 'string', enum: ['A', 'B', 'B15', 'C', 'D'], example: 'B15' },
            generos: { type: 'array', items: { type: 'string' }, example: ['Acción', 'Ciencia Ficción'] },
          },
        },
        PerfilUsuario: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            nombre_completo: { type: 'string' },
            puntos_acumulados: { type: 'integer' },
            nivel_membresia: { type: 'string', enum: ['Oro', 'Platino', 'VIP'] },
          },
        },
        PerfilUsuarioInput: {
          type: 'object',
          properties: {
            nombre_completo: { type: 'string', example: 'María García' },
            puntos_acumulados: { type: 'integer', example: 150 },
            nivel_membresia: { type: 'string', enum: ['Oro', 'Platino', 'VIP'], example: 'Oro' },
          },
        },
        PuntosInput: {
          type: 'object',
          required: ['puntos'],
          properties: {
            puntos: { type: 'integer', example: 50 },
          },
        },
        ReporteCierre: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            fecha_cierre: { type: 'string', format: 'date-time' },
            empleado_id: { type: 'integer' },
            total_ventas: { type: 'number' },
            total_efectivo: { type: 'number' },
            total_tarjeta: { type: 'number' },
            total_propinas: { type: 'number' },
            conteo_transacciones: { type: 'integer' },
          },
        },
        ReporteCierreInput: {
          type: 'object',
          required: ['fecha_cierre', 'empleado_id', 'total_ventas', 'total_efectivo', 'total_tarjeta', 'conteo_transacciones'],
          properties: {
            fecha_cierre: { type: 'string', format: 'date-time', example: '2026-05-25T22:00:00Z' },
            empleado_id: { type: 'integer', example: 1 },
            total_ventas: { type: 'number', example: 1520.50 },
            total_efectivo: { type: 'number', example: 850.00 },
            total_tarjeta: { type: 'number', example: 670.50 },
            total_propinas: { type: 'number', example: 45.00 },
            conteo_transacciones: { type: 'integer', example: 38 },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
