import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1734311452165 implements MigrationInterface {
    name = 'Init1734311452165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "start" TIMESTAMP NOT NULL, "end" TIMESTAMP NOT NULL, "allDay" boolean NOT NULL DEFAULT false, "user_id" integer NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_e6358bd3df1b2874637dca92bcf" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_e6358bd3df1b2874637dca92bcf"`);
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
