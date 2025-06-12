import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnBookshelfTransaction1749561768120 implements MigrationInterface {
    name = 'AddColumnBookshelfTransaction1749561768120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bookmng"."bookshelf_transaction"
            ADD "review" text
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bookmng"."bookshelf_transaction" DROP COLUMN "review"
        `);
    }

}
