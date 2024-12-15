import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1733947670422 implements MigrationInterface {
    name = 'Init1733947670422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" ADD "realtor_id" integer`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_5323538f4c7d4802a08c423ed18" FOREIGN KEY ("realtor_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_5323538f4c7d4802a08c423ed18"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "realtor_id"`);
    }

}
