import { MigrationInterface, QueryRunner } from "typeorm";

export class BookshelfTagTransaction1751682178505 implements MigrationInterface {
    name = 'BookshelfTagTransaction1751682178505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "bookmng"."bookshelf_tag_transaction" (
                "user_id" integer NOT NULL,
                "book_id" character varying(255) NOT NULL,
                "tag_id" integer NOT NULL,
                "delete_flg" character varying(1) NOT NULL,
                "create_date" TIMESTAMP NOT NULL DEFAULT now(),
                "update_date" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_9646c9b4b8c6edfcc3520b229b4" PRIMARY KEY ("user_id", "book_id", "tag_id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "bookmng"."bookshelf_tag_transaction"
        `);
    }

}
