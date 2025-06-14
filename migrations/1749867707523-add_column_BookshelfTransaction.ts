import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnBookshelfTransaction1749867707523 implements MigrationInterface {
    name = 'AddColumnBookshelfTransaction1749867707523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bookmng"."bookshelf_transaction"
                RENAME COLUMN "highlights" TO "summary"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bookmng"."bookshelf_transaction"
                RENAME COLUMN "summary" TO "highlights"
        `);
    }

}
