import { MigrationInterface, QueryRunner } from "typeorm";

export class ManualMigration1766091864668 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`order\`
            ADD COLUMN order_items_json JSON NOT NULL
            AFTER id_coupon;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`order\`
            DROP COLUMN order_items_json;
        `);
    }

}
