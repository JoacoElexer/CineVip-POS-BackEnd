-- ============================================================
-- DDL Completo — POS CineVIP
-- PostgreSQL
-- ============================================================

-- Eliminar tablas si existen (orden inverso de dependencias)
DROP TABLE IF EXISTS metodos_pago CASCADE;
DROP TABLE IF EXISTS detalle_venta_productos CASCADE;
DROP TABLE IF EXISTS detalle_venta_boletos CASCADE;
DROP TABLE IF EXISTS ventas CASCADE;
DROP TABLE IF EXISTS promociones CASCADE;
DROP TABLE IF EXISTS inventario CASCADE;
DROP TABLE IF EXISTS productos CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;
DROP TABLE IF EXISTS funciones CASCADE;
DROP TABLE IF EXISTS asientos CASCADE;
DROP TABLE IF EXISTS salas CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

DROP TYPE IF EXISTS tipo_rol CASCADE;
DROP TYPE IF EXISTS tipo_pago CASCADE;

-- ============================================================
-- ENUMs
-- ============================================================
CREATE TYPE tipo_rol AS ENUM ('Administrador', 'Cajero', 'Supervisor');
CREATE TYPE tipo_pago AS ENUM ('Efectivo', 'Tarjeta Crédito', 'Tarjeta Débito', 'Puntos VIP');

-- ============================================================
-- 1. Usuarios / Empleados
-- ============================================================
CREATE TABLE usuarios (
    id          SERIAL        PRIMARY KEY,
    nombre      VARCHAR(150)  NOT NULL,
    email       VARCHAR(200)  NOT NULL UNIQUE,
    password    VARCHAR(255)  NOT NULL,
    rol         tipo_rol      NOT NULL,
    created_at  TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP     NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 2. Salas
-- ============================================================
CREATE TABLE salas (
    id          SERIAL        PRIMARY KEY,
    nombre      VARCHAR(150)  NOT NULL,
    capacidad   INTEGER       NOT NULL CHECK (capacidad > 0),
    tipo        VARCHAR(100)  NOT NULL,
    created_at  TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP     NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 3. Asientos
-- ============================================================
CREATE TABLE asientos (
    id          SERIAL        PRIMARY KEY,
    sala_id     INTEGER       NOT NULL REFERENCES salas(id) ON DELETE CASCADE,
    fila        VARCHAR(10)   NOT NULL,
    numero      INTEGER       NOT NULL,
    estado      VARCHAR(50)   NOT NULL DEFAULT 'Disponible',
    created_at  TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP     NOT NULL DEFAULT NOW(),
    UNIQUE (sala_id, fila, numero)
);

-- ============================================================
-- 4. Funciones
-- ============================================================
CREATE TABLE funciones (
    id           SERIAL          PRIMARY KEY,
    pelicula_id  VARCHAR(50)     NOT NULL,
    sala_id      INTEGER         NOT NULL REFERENCES salas(id) ON DELETE CASCADE,
    fecha        DATE            NOT NULL,
    hora_inicio  TIME            NOT NULL,
    precio_base  DECIMAL(10, 2)  NOT NULL CHECK (precio_base >= 0),
    created_at   TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMP       NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 5. Categorías
-- ============================================================
CREATE TABLE categorias (
    id          SERIAL        PRIMARY KEY,
    nombre      VARCHAR(150)  NOT NULL UNIQUE,
    created_at  TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP     NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 6. Productos
-- ============================================================
CREATE TABLE productos (
    id            SERIAL          PRIMARY KEY,
    categoria_id  INTEGER         NOT NULL REFERENCES categorias(id) ON DELETE RESTRICT,
    nombre        VARCHAR(200)    NOT NULL,
    descripcion   TEXT,
    precio        DECIMAL(10, 2)  NOT NULL CHECK (precio >= 0),
    created_at    TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP       NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 7. Inventario
-- ============================================================
CREATE TABLE inventario (
    id            SERIAL    PRIMARY KEY,
    producto_id   INTEGER   NOT NULL UNIQUE REFERENCES productos(id) ON DELETE CASCADE,
    stock_actual  INTEGER   NOT NULL DEFAULT 0 CHECK (stock_actual >= 0),
    stock_minimo  INTEGER   NOT NULL DEFAULT 5 CHECK (stock_minimo >= 0),
    created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 8. Ventas (Cabecera)
-- ============================================================
CREATE TABLE ventas (
    id           SERIAL          PRIMARY KEY,
    usuario_id   INTEGER         NOT NULL REFERENCES usuarios(id) ON DELETE RESTRICT,
    fecha_venta  TIMESTAMP       NOT NULL DEFAULT NOW(),
    subtotal     DECIMAL(10, 2)  NOT NULL CHECK (subtotal >= 0),
    descuento    DECIMAL(10, 2)  NOT NULL DEFAULT 0.00 CHECK (descuento >= 0),
    total        DECIMAL(10, 2)  NOT NULL CHECK (total >= 0),
    created_at   TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMP       NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 9. Detalle_Venta_Boletos
-- ============================================================
CREATE TABLE detalle_venta_boletos (
    id              SERIAL          PRIMARY KEY,
    venta_id        INTEGER         NOT NULL REFERENCES ventas(id) ON DELETE CASCADE,
    funcion_id      INTEGER         NOT NULL REFERENCES funciones(id) ON DELETE RESTRICT,
    asiento_id      INTEGER         NOT NULL REFERENCES asientos(id) ON DELETE RESTRICT,
    precio_unitario DECIMAL(10, 2)  NOT NULL CHECK (precio_unitario >= 0),
    created_at      TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP       NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 10. Detalle_Venta_Productos
-- ============================================================
CREATE TABLE detalle_venta_productos (
    id              SERIAL          PRIMARY KEY,
    venta_id        INTEGER         NOT NULL REFERENCES ventas(id) ON DELETE CASCADE,
    producto_id     INTEGER         NOT NULL REFERENCES productos(id) ON DELETE RESTRICT,
    cantidad        INTEGER         NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10, 2)  NOT NULL CHECK (precio_unitario >= 0),
    importe         DECIMAL(10, 2)  NOT NULL CHECK (importe >= 0),
    created_at      TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP       NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 11. Métodos_Pago
-- ============================================================
CREATE TABLE metodos_pago (
    id            SERIAL          PRIMARY KEY,
    venta_id      INTEGER         NOT NULL REFERENCES ventas(id) ON DELETE CASCADE,
    tipo_pago     tipo_pago       NOT NULL,
    monto_pagado  DECIMAL(10, 2)  NOT NULL CHECK (monto_pagado >= 0),
    created_at    TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP       NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 12. Promociones / Combos
-- ============================================================
CREATE TABLE promociones (
    id                    SERIAL          PRIMARY KEY,
    nombre                VARCHAR(200)    NOT NULL,
    descripcion           TEXT            NOT NULL,
    descuento_porcentaje  DECIMAL(5, 2)   NOT NULL DEFAULT 0.00 CHECK (descuento_porcentaje >= 0),
    precio_fijo           DECIMAL(10, 2)  CHECK (precio_fijo IS NULL OR precio_fijo >= 0),
    activo                BOOLEAN         NOT NULL DEFAULT TRUE,
    fecha_inicio          DATE,
    fecha_fin             DATE,
    created_at            TIMESTAMP       NOT NULL DEFAULT NOW(),
    updated_at            TIMESTAMP       NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Índices
-- ============================================================
CREATE INDEX idx_asientos_sala_id       ON asientos(sala_id);
CREATE INDEX idx_funciones_sala_id      ON funciones(sala_id);
CREATE INDEX idx_funciones_fecha        ON funciones(fecha);
CREATE INDEX idx_funciones_pelicula_id  ON funciones(pelicula_id);
CREATE INDEX idx_productos_categoria_id ON productos(categoria_id);
CREATE INDEX idx_ventas_usuario_id      ON ventas(usuario_id);
CREATE INDEX idx_ventas_fecha           ON ventas(fecha_venta);
CREATE INDEX idx_detalle_boletos_venta  ON detalle_venta_boletos(venta_id);
CREATE INDEX idx_detalle_productos_venta ON detalle_venta_productos(venta_id);
CREATE INDEX idx_metodos_pago_venta     ON metodos_pago(venta_id);
CREATE INDEX idx_promociones_activo     ON promociones(activo) WHERE activo = TRUE;
