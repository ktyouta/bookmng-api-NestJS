import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnBookshelfTransaction1750422193122 implements MigrationInterface {
    name = 'AddColumnBookshelfTransaction1750422193122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bookmng"."bookshelf_transaction"
            ADD "purchase_level" character varying(8)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bookmng"."bookshelf_transaction" DROP COLUMN "purchase_level"
        `);
    }

}
