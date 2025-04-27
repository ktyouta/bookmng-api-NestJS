import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1745687967119 implements MigrationInterface {
    name = 'InitialSchema1745687967119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "bookmng"."test_connection" (
                "id" SERIAL NOT NULL,
                CONSTRAINT "PK_aed3159665fc905a30b50d6d56d" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "bookmng"."test_connection"
        `);
    }

}
