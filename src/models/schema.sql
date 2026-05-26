-- ============================================================
-- DDL — POS CineVIP (9 tablas PostgreSQL)
-- ============================================================

-- ============================================================
-- 1. Cuentas de Empleados
-- ============================================================
CREATE TABLE empleados (
    id         SERIAL        PRIMARY KEY,
    nombre     VARCHAR(150)  NOT NULL,
    usuario    VARCHAR(100)  NOT NULL UNIQUE,
    password   VARCHAR(255)  NOT NULL,
    rol        VARCHAR(50)   NOT NULL CHECK (rol IN ('Cajero', 'Administrador')),
    created_at TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP     NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 2. Categorías
-- ============================================================
CREATE TABLE categorias (
    id         SERIAL        PRIMARY KEY,
    nombre     VARCHAR(150)  NOT NULL UNIQUE,
    created_at TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP     NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 3. Productos e Inventario
-- ============================================================
CREATE TABLE productos (
    id              SERIAL          PRIMARY KEY,
    categoria_id    INTEGER         NOT NULL REFERENCES categorias(id) ON DELETE RESTRICT,
    nombre          VARCHAR(200)    NOT NULL,
    precio_unitario DECIMAL(10, 2)  NOT NULL CHECK (precio_unitario >= 0),
    stock_actual    INTEGER         NOT NULL DEFAULT 0 CHECK (stock_actual >= 0),
    created_at      TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP       NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 4. Promociones y Combos
-- ============================================================
CREATE TABLE promociones (
    id           SERIAL          PRIMARY KEY,
    nombre       VARCHAR(200)    NOT NULL,
    precio_combo DECIMAL(10, 2)  NOT NULL CHECK (precio_combo >= 0),
    activo       BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at   TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMP       NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 5. Salas
-- ============================================================
CREATE TABLE salas (
    id         SERIAL        PRIMARY KEY,
    nombre     VARCHAR(150)  NOT NULL,
    capacidad  INTEGER       NOT NULL CHECK (capacidad > 0),
    created_at TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP     NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 6. Asientos
-- ============================================================
CREATE TABLE asientos (
    id            SERIAL        PRIMARY KEY,
    sala_id       INTEGER       NOT NULL REFERENCES salas(id) ON DELETE CASCADE,
    fila          VARCHAR(10)   NOT NULL,
    numero        INTEGER       NOT NULL,
    tipo_asiento  VARCHAR(50)   NOT NULL DEFAULT 'Regular' CHECK (tipo_asiento IN ('Regular', 'Silla de Ruedas')),
    estado_actual VARCHAR(50)   NOT NULL DEFAULT 'Disponible' CHECK (estado_actual IN ('Disponible', 'Ocupado', 'Mantenimiento')),
    created_at    TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP     NOT NULL DEFAULT NOW(),
    UNIQUE (sala_id, fila, numero)
);

-- ============================================================
-- 7. Funciones
-- ============================================================
CREATE TABLE funciones (
    id            SERIAL          PRIMARY KEY,
    pelicula_id   VARCHAR(50)     NOT NULL,
    sala_id       INTEGER         NOT NULL REFERENCES salas(id) ON DELETE CASCADE,
    fecha         DATE            NOT NULL,
    hora          TIME            NOT NULL,
    precio_boleto DECIMAL(10, 2)  NOT NULL CHECK (precio_boleto >= 0),
    created_at    TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP       NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 8. Ventas Totales (Cabecera Maestro)
-- ============================================================
CREATE TABLE ventas_totales (
    id                SERIAL          PRIMARY KEY,
    empleado_id       INTEGER         NOT NULL REFERENCES empleados(id) ON DELETE RESTRICT,
    fecha_transaccion TIMESTAMP       NOT NULL DEFAULT NOW(),
    subtotal          DECIMAL(10, 2)  NOT NULL CHECK (subtotal >= 0),
    propina           DECIMAL(10, 2)  NOT NULL DEFAULT 0.00 CHECK (propina >= 0),
    total_pagado      DECIMAL(10, 2)  NOT NULL CHECK (total_pagado >= 0),
    metodo_pago       VARCHAR(50)     NOT NULL CHECK (metodo_pago IN ('Efectivo', 'Tarjeta')),
    created_at        TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMP       NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 9. Detalle de Ventas
-- ============================================================
CREATE TABLE detalle_ventas (
    id              SERIAL          PRIMARY KEY,
    venta_id        INTEGER         NOT NULL REFERENCES ventas_totales(id) ON DELETE CASCADE,
    tipo_item       VARCHAR(20)     NOT NULL CHECK (tipo_item IN ('Boleto', 'Producto', 'Combo')),
    item_id         INTEGER         NOT NULL,
    asiento_id      INTEGER         REFERENCES asientos(id) ON DELETE SET NULL,
    cantidad        INTEGER         NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10, 2)  NOT NULL CHECK (precio_unitario >= 0),
    created_at      TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP       NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Índices
-- ============================================================
CREATE INDEX idx_asientos_sala_id       ON asientos(sala_id);
CREATE INDEX idx_funciones_sala_id      ON funciones(sala_id);
CREATE INDEX idx_funciones_fecha        ON funciones(fecha);
CREATE INDEX idx_funciones_pelicula     ON funciones(pelicula_id);
CREATE INDEX idx_productos_categoria    ON productos(categoria_id);
CREATE INDEX idx_ventas_empleado        ON ventas_totales(empleado_id);
CREATE INDEX idx_ventas_fecha           ON ventas_totales(fecha_transaccion);
CREATE INDEX idx_detalle_venta          ON detalle_ventas(venta_id);
CREATE INDEX idx_detalle_tipo_item      ON detalle_ventas(tipo_item);
