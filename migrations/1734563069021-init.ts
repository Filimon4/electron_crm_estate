import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1734563069021 implements MigrationInterface {
    name = 'Init1734563069021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "complex" ALTER COLUMN "name" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "complex" ALTER COLUMN "name" DROP NOT NULL`);
    }

}
