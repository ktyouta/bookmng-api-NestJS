import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSeqMaster1746447982691 implements MigrationInterface {
    name = 'CreateSeqMaster1746447982691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "bookmng"."seq_master" (
                "key" character varying(10) NOT NULL,
                "next_id" integer,
                "create_date" TIMESTAMP NOT NULL DEFAULT now(),
                "update_date" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_9b5ece48715f066f921269de7f2" PRIMARY KEY ("key")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "bookmng"."seq_master"
        `);
    }

}
