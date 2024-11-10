import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1731261836088 implements MigrationInterface {
    name = 'Init1731261836088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flat" ALTER COLUMN "size" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flat" ALTER COLUMN "size" DROP NOT NULL`);
    }

}
