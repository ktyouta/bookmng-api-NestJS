import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnBookshelfTransaction1749729938113 implements MigrationInterface {
    name = 'AddColumnBookshelfTransaction1749729938113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bookmng"."bookshelf_transaction"
            ADD "highlights" text
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bookmng"."bookshelf_transaction" DROP COLUMN "highlights"
        `);
    }

}
