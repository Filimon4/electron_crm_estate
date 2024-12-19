import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1734641062053 implements MigrationInterface {
    name = 'Init1734641062053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deal" ADD "closed_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deal" DROP COLUMN "closed_at"`);
    }

}
