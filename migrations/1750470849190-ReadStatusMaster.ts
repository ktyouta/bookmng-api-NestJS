import { MigrationInterface, QueryRunner } from "typeorm";

export class ReadStatusMaster1750470849190 implements MigrationInterface {
    name = 'ReadStatusMaster1750470849190'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "bookmng"."read_status_master" (
                "id" character varying(2) NOT NULL,
                "label" character varying(255),
                "delete_flg" character varying(1) NOT NULL,
                "create_date" TIMESTAMP NOT NULL DEFAULT now(),
                "update_date" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_90c7a9f37b8a4efdee0019d5a47" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "bookmng"."read_status_master"
        `);
    }

}
