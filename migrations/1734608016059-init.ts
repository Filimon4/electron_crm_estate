import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1734608016059 implements MigrationInterface {
    name = 'Init1734608016059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "deal" DROP CONSTRAINT "FK_1058ee481e6fbe30777644fa01e"`);
        // await queryRunner.query(`ALTER TABLE "deal" RENAME COLUMN "flatId" TO "flat"`);
        // await queryRunner.query(`ALTER TABLE "deal" ADD CONSTRAINT "UQ_DEAL_FLAT_CLIENT" UNIQUE ("flat", "client")`);
        // await queryRunner.query(`ALTER TABLE "deal" ADD CONSTRAINT "FK_decef95960042c4a34662fe683f" FOREIGN KEY ("flat") REFERENCES "flat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "deal" DROP CONSTRAINT "FK_decef95960042c4a34662fe683f"`);
        // await queryRunner.query(`ALTER TABLE "deal" DROP CONSTRAINT "UQ_DEAL_FLAT_CLIENT"`);
        // await queryRunner.query(`ALTER TABLE "deal" RENAME COLUMN "flat" TO "flatId"`);
        // await queryRunner.query(`ALTER TABLE "deal" ADD CONSTRAINT "FK_1058ee481e6fbe30777644fa01e" FOREIGN KEY ("flatId") REFERENCES "flat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
