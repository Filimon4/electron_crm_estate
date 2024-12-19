import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1734563018621 implements MigrationInterface {
    name = 'Init1734563018621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "complex" ADD "name" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "complex" DROP COLUMN "name"`);
    }

}
