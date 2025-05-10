import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumnsToSeqMaster1746884996601 implements MigrationInterface {
    name = 'UpdateColumnsToSeqMaster1746884996601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bookmng"."seq_master" DROP CONSTRAINT "PK_9b5ece48715f066f921269de7f2"
        `);
        await queryRunner.query(`
            ALTER TABLE "bookmng"."seq_master" DROP COLUMN "key"
        `);
        await queryRunner.query(`
            ALTER TABLE "bookmng"."seq_master"
            ADD "key" character varying(1000) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "bookmng"."seq_master"
            ADD CONSTRAINT "PK_9b5ece48715f066f921269de7f2" PRIMARY KEY ("key")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bookmng"."seq_master" DROP CONSTRAINT "PK_9b5ece48715f066f921269de7f2"
        `);
        await queryRunner.query(`
            ALTER TABLE "bookmng"."seq_master" DROP COLUMN "key"
        `);
        await queryRunner.query(`
            ALTER TABLE "bookmng"."seq_master"
            ADD "key" character varying(10) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "bookmng"."seq_master"
            ADD CONSTRAINT "PK_9b5ece48715f066f921269de7f2" PRIMARY KEY ("key")
        `);
    }

}
