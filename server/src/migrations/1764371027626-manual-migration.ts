import { MigrationInterface, QueryRunner } from "typeorm";

export class ManualMigration1764371027626 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        CREATE TABLE roles (
            id_rol INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );   
        `);

        await queryRunner.query(`
        CREATE TABLE usuario (
            id_user INT AUTO_INCREMENT PRIMARY KEY,
            id_rol INT NOT NULL DEFAULT 4,
            name VARCHAR(100) NOT NULL,
            lastname VARCHAR(100) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            telefono VARCHAR(50),
            direccion VARCHAR(255) NOT NULL,
            estado ENUM('activo', 'inactivo', 'suspendido') DEFAULT 'activo',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT fk_usuario_rol
            FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
            ON UPDATE CASCADE
            ON DELETE RESTRICT
        );
        `);

        await queryRunner.query(`
        CREATE TABLE categoria (
            id_categoria INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            descripcion VARCHAR(255),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
        `);

        await queryRunner.query(`
        CREATE TABLE producto (
            id_producto INT AUTO_INCREMENT PRIMARY KEY,
            id_categoria INT NOT NULL,
            nombre VARCHAR(100) NOT NULL,
            descripcion VARCHAR(255),
            precio DECIMAL(10,2) NOT NULL,
            stock INT NOT NULL,
            estado ENUM('activo', 'inactivo', 'agotado') DEFAULT 'activo',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT fk_producto_categoria
                FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
                ON UPDATE CASCADE
                ON DELETE RESTRICT
        );
        `);

        await queryRunner.query(`
        CREATE TABLE producto_imagen (
            id_imagen INT AUTO_INCREMENT PRIMARY KEY,
            id_producto INT NOT NULL,
            url VARCHAR(500) NOT NULL,
            orden INT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT fk_producto_imagen_producto
                FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
                ON UPDATE CASCADE
                ON DELETE CASCADE
        );
        `);

        await queryRunner.query(`
        CREATE TABLE pack (
            id_pack INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            descripcion VARCHAR(255),
            precio_final DECIMAL(10,2) NOT NULL,
            estado ENUM('activo', 'inactivo', 'agotado') DEFAULT 'activo',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
        `);

        await queryRunner.query(`
        CREATE TABLE pack_producto (
            id_pack INT NOT NULL,
            id_producto INT NOT NULL,
            cantidad INT NOT NULL,
            PRIMARY KEY (id_pack, id_producto),
            CONSTRAINT fk_pack_producto_pack
                FOREIGN KEY (id_pack) REFERENCES pack (id_pack)
                ON UPDATE CASCADE
                ON DELETE CASCADE,
            CONSTRAINT fk_pack_producto_producto
                FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
                ON UPDATE CASCADE
                ON DELETE CASCADE
        );
        `);

        await queryRunner.query(`
        CREATE TABLE discount_type (
            id_discount_type INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            descripcion VARCHAR(255),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
        `);

        await queryRunner.query(`
        CREATE TABLE discount (
            id_discount INT AUTO_INCREMENT PRIMARY KEY,
            id_discount_type INT NOT NULL,
            nombre VARCHAR(100) NOT NULL,
            descripcion VARCHAR(255),
            porcentaje DECIMAL(5,2),
            monto_fijo DECIMAL(10,2),
            estado ENUM('activo', 'inactivo', 'expirado') DEFAULT 'activo',
            fecha_inicio DATETIME NOT NULL,
            fecha_fin DATETIME DEFAULT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT fk_discount_type
                FOREIGN KEY (id_discount_type) REFERENCES discount_type(id_discount_type)
                ON UPDATE CASCADE
                ON DELETE RESTRICT,
            CONSTRAINT chk_discount_values CHECK (
                (porcentaje IS NOT NULL AND porcentaje > 0)
                OR
                (monto_fijo IS NOT NULL AND monto_fijo > 0)
            )
        );
        `);

        await queryRunner.query(`
        CREATE TABLE discount_product (
            id_discount INT NOT NULL,
            id_producto INT NOT NULL,
            PRIMARY KEY (id_discount, id_producto),
            CONSTRAINT fk_dp_discount
                FOREIGN KEY (id_discount) REFERENCES discount(id_discount)
                ON UPDATE CASCADE
                ON DELETE CASCADE,
            CONSTRAINT fk_dp_producto
                FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
                ON UPDATE CASCADE
                ON DELETE CASCADE
        );
        `);

        await queryRunner.query(`
        CREATE TABLE coupon (
            id_coupon INT AUTO_INCREMENT PRIMARY KEY,
            codigo VARCHAR(50) NOT NULL UNIQUE,
            descripcion VARCHAR(255),
            porcentaje DECIMAL(5,2),
            monto_fijo DECIMAL(10,2),
            limite_uso INT,
            limite_por_usuario INT,
            estado ENUM('activo', 'inactivo', 'expirado') DEFAULT 'activo',
            fecha_inicio DATETIME NOT NULL,
            fecha_fin DATETIME DEFAULT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT chk_coupon_values CHECK (
                (porcentaje IS NOT NULL AND porcentaje > 0)
                OR
                (monto_fijo IS NOT NULL AND monto_fijo > 0)
            )
        );
        `);

        await queryRunner.query(`
        CREATE TABLE payment_method (
            id_payment_method INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            descripcion VARCHAR(255),
            estado ENUM('activo', 'inactivo') DEFAULT 'activo',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
        `);

        await queryRunner.query(`
        CREATE TABLE \`order\` (
            id_order INT AUTO_INCREMENT PRIMARY KEY,
            id_user INT NOT NULL,
            id_payment_method INT NOT NULL,
            id_coupon INT DEFAULT NULL,
            descuento_total DECIMAL(10,2) NOT NULL,
            total DECIMAL(10,2) NOT NULL,
            estado ENUM('pendiente', 'pagado', 'cancelado', 'fallido') DEFAULT 'pendiente',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            payment_date DATETIME DEFAULT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT fk_order_user
                FOREIGN KEY (id_user) REFERENCES usuario(id_user)
                ON UPDATE CASCADE
                ON DELETE RESTRICT,
            CONSTRAINT fk_order_payment_method
                FOREIGN KEY (id_payment_method) REFERENCES payment_method(id_payment_method)
                ON UPDATE CASCADE
                ON DELETE RESTRICT,
            CONSTRAINT fk_order_coupon
                FOREIGN KEY (id_coupon) REFERENCES coupon(id_coupon)
                ON UPDATE CASCADE
                ON DELETE SET NULL
        );
        `);

        await queryRunner.query(`
        CREATE TABLE payment (
            id_payment INT AUTO_INCREMENT PRIMARY KEY,
            id_order INT NOT NULL,
            id_payment_method INT NOT NULL,
            monto_pagado DECIMAL(10,2) NOT NULL,
            id_transaccion VARCHAR(100),
            estado ENUM('exitoso', 'pendiente', 'falla', 'reembolsado') DEFAULT 'pendiente',
            payment_date DATETIME DEFAULT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT fk_payment_order
                FOREIGN KEY (id_order) REFERENCES \`order\`(id_order)
                ON UPDATE CASCADE
                ON DELETE RESTRICT,
            CONSTRAINT fk_payment_payment_method
                FOREIGN KEY (id_payment_method) REFERENCES payment_method(id_payment_method)
                ON UPDATE CASCADE
                ON DELETE RESTRICT
        );
        `);

        await queryRunner.query(`
        CREATE TABLE chat (
            id_chat INT AUTO_INCREMENT PRIMARY KEY,
            id_usuario INT NOT NULL,
            id_asesor INT DEFAULT NULL,
            estado ENUM('abierto', 'en_progreso', 'cerrado') DEFAULT 'abierto',
            origen ENUM('cliente', 'asesor', 'sistema', 'ia') DEFAULT 'cliente',
            creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
            actualizado DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT fk_chat_usuario
                FOREIGN KEY (id_usuario) REFERENCES usuario(id_user)
                ON UPDATE CASCADE
                ON DELETE RESTRICT,
            CONSTRAINT fk_chat_asesor
                FOREIGN KEY (id_asesor) REFERENCES usuario(id_user)
                ON UPDATE CASCADE
                ON DELETE SET NULL
        );
        `);

        await queryRunner.query(`
        CREATE TABLE message (
            id_message INT AUTO_INCREMENT PRIMARY KEY,
            id_chat INT NOT NULL,
            id_remitente INT NOT NULL,
            remitente_tipo ENUM('cliente', 'asesor', 'sistema', 'ia') NOT NULL,
            mensaje TEXT DEFAULT NULL,
            metadata_json JSON DEFAULT NULL,
            sent_in DATETIME DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_message_chat
                FOREIGN KEY (id_chat) REFERENCES chat(id_chat)
                ON UPDATE CASCADE
                ON DELETE CASCADE,
            CONSTRAINT fk_message_remitente
                FOREIGN KEY (id_remitente) REFERENCES usuario(id_user)
                ON UPDATE CASCADE
                ON DELETE RESTRICT
        );
        `);
    }
    public async down(queryRunner: QueryRunner): Promise<void> { }
}