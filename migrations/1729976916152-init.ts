import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1729976916152 implements MigrationInterface {
    name = 'Init1729976916152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "realtor" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "realtor" DROP COLUMN "sureName"`);
        await queryRunner.query(`ALTER TABLE "realtor" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "realtor" ADD "first_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "realtor" ADD "sure_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "realtor" ADD "last_Name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "realtor" DROP COLUMN "last_Name"`);
        await queryRunner.query(`ALTER TABLE "realtor" DROP COLUMN "sure_name"`);
        await queryRunner.query(`ALTER TABLE "realtor" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "realtor" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "realtor" ADD "sureName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "realtor" ADD "firstName" character varying NOT NULL`);
    }

}
