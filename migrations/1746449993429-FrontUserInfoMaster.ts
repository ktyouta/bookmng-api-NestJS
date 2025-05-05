import { MigrationInterface, QueryRunner } from "typeorm";

export class FrontUserInfoMaster1746449993429 implements MigrationInterface {
    name = 'FrontUserInfoMaster1746449993429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "bookmng"."front_user_info_master" (
                "user_id" integer NOT NULL,
                "user_name" character varying(255) NOT NULL,
                "user_birthday" character varying(8) NOT NULL,
                "delete_flg" character varying(1) NOT NULL,
                "create_date" TIMESTAMP NOT NULL DEFAULT now(),
                "update_date" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_61e4692006cbd1f557433f4e442" PRIMARY KEY ("user_id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "bookmng"."front_user_info_master"
        `);
    }

}
