import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1728989043621 implements MigrationInterface {
    name = 'Init1728989043621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "developer" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "developer" ADD CONSTRAINT "UQ_5c2989f7bc37f907cfd937c0fd0" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "developer" DROP CONSTRAINT "UQ_5c2989f7bc37f907cfd937c0fd0"`);
        await queryRunner.query(`ALTER TABLE "developer" DROP COLUMN "name"`);
    }

}
