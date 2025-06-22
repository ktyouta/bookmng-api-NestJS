import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumnsBookshelfTransaction1750480566963 implements MigrationInterface {
    name = 'UpdateColumnsBookshelfTransaction1750480566963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bookmng"."bookshelf_transaction" DROP COLUMN "favorite_level"
        `);
        await queryRunner.query(`
            ALTER TABLE "bookmng"."bookshelf_transaction"
            ADD "favorite_level" integer
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bookmng"."bookshelf_transaction" DROP COLUMN "favorite_level"
        `);
        await queryRunner.query(`
            ALTER TABLE "bookmng"."bookshelf_transaction"
            ADD "favorite_level" character varying(8)
        `);
    }

}
