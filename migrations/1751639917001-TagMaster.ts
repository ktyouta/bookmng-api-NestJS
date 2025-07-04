import { MigrationInterface, QueryRunner } from "typeorm";

export class TagMaster1751639917001 implements MigrationInterface {
    name = 'TagMaster1751639917001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "bookmng"."tag_master" (
                "user_id" integer NOT NULL,
                "tag_id" integer NOT NULL,
                "tag_name" character varying(255),
                "delete_flg" character varying(1) NOT NULL,
                "create_date" TIMESTAMP NOT NULL DEFAULT now(),
                "update_date" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_aacea279cb918172f107e4ad29e" PRIMARY KEY ("user_id", "tag_id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "bookmng"."tag_master"
        `);
    }

}
