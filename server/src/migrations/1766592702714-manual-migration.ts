import { MigrationInterface, QueryRunner } from "typeorm";

export class ManualMigration1766592702714 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        CREATE TABLE user_address (
            id_address INT AUTO_INCREMENT PRIMARY KEY,
            id_user INT NOT NULL,
            pais VARCHAR(100) DEFAULT 'Perú',
            departamento VARCHAR(100),
            provincia VARCHAR(100),
            distrito VARCHAR(100),
            codigo_postal VARCHAR(20),
            nombre_contacto VARCHAR(100),
            apellido_contacto VARCHAR(100),
            telefono_contacto VARCHAR(50),
            direccion_completa VARCHAR(255) NOT NULL,
            referencia VARCHAR(255),
            es_principal BOOLEAN DEFAULT TRUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            CONSTRAINT fk_user_address_user
                FOREIGN KEY (id_user) REFERENCES usuario(id_user)
                ON UPDATE CASCADE
                ON DELETE CASCADE
        );
        `);

        await queryRunner.query(`
        INSERT INTO user_address (
            id_user,
            direccion_completa,
            nombre_contacto,
            apellido_contacto,
            telefono_contacto,
            es_principal
        )
        SELECT 
            id_user,
            direccion,
            name,
            lastname,
            telefono,
            TRUE
        FROM usuario
        WHERE direccion IS NOT NULL;
        `);

        await queryRunner.query(`
        ALTER TABLE \`order\`
        ADD COLUMN id_address INT NULL AFTER id_user;
        `);

        await queryRunner.query(`
        UPDATE \`order\` o
        JOIN user_address ua 
            ON ua.id_user = o.id_user
            AND ua.es_principal = TRUE
        SET o.id_address = ua.id_address;
        `);

        await queryRunner.query(`
        ALTER TABLE \`order\`
        MODIFY id_address INT NOT NULL;
        `);

        await queryRunner.query(`
        ALTER TABLE \`order\`
        ADD CONSTRAINT fk_order_address
            FOREIGN KEY (id_address) REFERENCES user_address(id_address)
            ON UPDATE CASCADE
            ON DELETE RESTRICT;
        `);

        await queryRunner.query(`
        ALTER TABLE usuario
        DROP COLUMN direccion;
        `);

        await queryRunner.query(`
        ALTER TABLE producto_imagen
        ADD COLUMN visible BOOLEAN DEFAULT TRUE AFTER orden;
        `);

        await queryRunner.query(`
        ALTER TABLE pack_imagen
        ADD COLUMN visible BOOLEAN DEFAULT TRUE AFTER orden;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
