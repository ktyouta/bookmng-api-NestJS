import { MigrationInterface, QueryRunner } from "typeorm";

export class FrontUserLoginMaster1746449570195 implements MigrationInterface {
    name = 'FrontUserLoginMaster1746449570195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "bookmng"."front_user_login_master" (
                "user_id" integer NOT NULL,
                "password" character varying(255) NOT NULL,
                "user_name" character varying(255) NOT NULL,
                "salt" character varying(32) NOT NULL,
                "delete_flg" character varying(1) NOT NULL,
                "create_date" TIMESTAMP NOT NULL DEFAULT now(),
                "update_date" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_28b8bd3beffd8ffe799ad797e7a" PRIMARY KEY ("user_id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "bookmng"."front_user_login_master"
        `);
    }

}
