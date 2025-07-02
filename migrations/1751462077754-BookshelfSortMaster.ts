import { MigrationInterface, QueryRunner } from "typeorm";

export class BookshelfSortMaster1751462077754 implements MigrationInterface {
    name = 'BookshelfSortMaster1751462077754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "bookmng"."bookshelf_sort_master" (
                "id" character varying(2) NOT NULL,
                "label" character varying(255),
                "delete_flg" character varying(1) NOT NULL,
                "create_date" TIMESTAMP NOT NULL DEFAULT now(),
                "update_date" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_029399a8cbc45620bc274d34cb9" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "bookmng"."bookshelf_sort_master"
        `);
    }

}
