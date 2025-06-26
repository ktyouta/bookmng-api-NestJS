import { MigrationInterface, QueryRunner } from "typeorm";

export class BookshelfMemoTransaction1750940114159 implements MigrationInterface {
    name = 'BookshelfMemoTransaction1750940114159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "bookmng"."bookshelf_memo_transaction" (
                "user_id" integer NOT NULL,
                "book_id" character varying(255) NOT NULL,
                "seq" integer NOT NULL,
                "memo" text,
                "delete_flg" character varying(1) NOT NULL,
                "create_date" TIMESTAMP NOT NULL DEFAULT now(),
                "update_date" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_d1e629e02033855320152facb54" PRIMARY KEY ("user_id", "book_id", "seq")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "bookmng"."bookshelf_memo_transaction"
        `);
    }

}
