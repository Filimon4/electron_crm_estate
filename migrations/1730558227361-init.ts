import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1730558227361 implements MigrationInterface {
    name = 'Init1730558227361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deal" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "flat" ADD "price" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flat" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "deal" ADD "amount" integer NOT NULL`);
    }

}
