import { MigrationInterface, QueryRunner } from "typeorm";

export class PackImagenMigration1764882534285 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
    CREATE TABLE pack_imagen (
        id_imagen INT AUTO_INCREMENT PRIMARY KEY,
        id_pack INT NOT NULL,
        url VARCHAR(500) NOT NULL,
        orden INT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_pack_imagen_pack
        FOREIGN KEY (id_pack) REFERENCES pack(id_pack)
        ON UPDATE CASCADE
        ON DELETE CASCADE
    );
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
