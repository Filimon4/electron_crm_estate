import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1732187119472 implements MigrationInterface {
    name = 'Init1732187119472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "flat" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flat" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "description"`);
    }

}
