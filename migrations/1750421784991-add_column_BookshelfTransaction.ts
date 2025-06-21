import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnBookshelfTransaction1750421784991 implements MigrationInterface {
    name = 'AddColumnBookshelfTransaction1750421784991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bookmng"."bookshelf_transaction"
            ADD "read_status" character varying(2)
        `);
        await queryRunner.query(`
            ALTER TABLE "bookmng"."bookshelf_transaction"
            ADD "start_date" character varying(8)
        `);
        await queryRunner.query(`
            ALTER TABLE "bookmng"."bookshelf_transaction"
            ADD "end_date" character varying(8)
        `);
        await queryRunner.query(`
            ALTER TABLE "bookmng"."bookshelf_transaction"
            ADD "favorite_level" character varying(8)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bookmng"."bookshelf_transaction" DROP COLUMN "favorite_level"
        `);
        await queryRunner.query(`
            ALTER TABLE "bookmng"."bookshelf_transaction" DROP COLUMN "end_date"
        `);
        await queryRunner.query(`
            ALTER TABLE "bookmng"."bookshelf_transaction" DROP COLUMN "start_date"
        `);
        await queryRunner.query(`
            ALTER TABLE "bookmng"."bookshelf_transaction" DROP COLUMN "read_status"
        `);
    }

}
