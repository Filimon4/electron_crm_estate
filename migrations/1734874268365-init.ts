import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1734874268365 implements MigrationInterface {
    name = 'Init1734874268365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "complex" ADD CONSTRAINT "UQ_0706ea9994e4e39197da5cb03d0" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "complex" ADD CONSTRAINT "UQ_11b8311845f564a7e7f29beaa53" UNIQUE ("district")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "complex" DROP CONSTRAINT "UQ_11b8311845f564a7e7f29beaa53"`);
        await queryRunner.query(`ALTER TABLE "complex" DROP CONSTRAINT "UQ_0706ea9994e4e39197da5cb03d0"`);
    }

}
