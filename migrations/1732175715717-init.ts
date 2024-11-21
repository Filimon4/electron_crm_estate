import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1732175715717 implements MigrationInterface {
    name = 'Init1732175715717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "description"`);
    }

}
