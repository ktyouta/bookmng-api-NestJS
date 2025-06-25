import { MigrationInterface, QueryRunner } from "typeorm";

export class UdpateColumnBookshelfTransaction1750856123403 implements MigrationInterface {
    name = 'UdpateColumnBookshelfTransaction1750856123403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bookmng"."bookshelf_transaction"
                RENAME COLUMN "purchase_level" TO "purchase_date"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bookmng"."bookshelf_transaction"
                RENAME COLUMN "purchase_date" TO "purchase_level"
        `);
    }

}
