import { MigrationInterface, QueryRunner } from "typeorm";

export class BookshelfTransaction1747211183954 implements MigrationInterface {
    name = 'BookshelfTransaction1747211183954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "bookmng"."bookshelf_transaction" (
                "user_id" integer NOT NULL,
                "book_id" character varying(255) NOT NULL,
                "delete_flg" character varying(1) NOT NULL,
                "create_date" TIMESTAMP NOT NULL DEFAULT now(),
                "update_date" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_a394c5f7a34ab0e521d8e4cb535" PRIMARY KEY ("user_id", "book_id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "bookmng"."bookshelf_transaction"
        `);
    }

}
