import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1734555025478 implements MigrationInterface {
    name = 'Init1734555515478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE OR UPDATE TYPE "public"."user_role_enum" AS ENUM('admin', 'realtor')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "first_name" character varying NOT NULL, "sure_name" character varying NOT NULL, "last_name" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'realtor', CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8e1f623798118e629b46a9e629" ON "user" ("phone") `);
        await queryRunner.query(`CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "first_name" character varying NOT NULL, "sure_name" character varying NOT NULL, "last_name" character varying NOT NULL, "description" text, CONSTRAINT "UQ_368ca99acdbd5502fc08b3f7796" UNIQUE ("phone"), CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_368ca99acdbd5502fc08b3f779" ON "client" ("phone") `);
        await queryRunner.query(`CREATE INDEX "IDX_6436cc6b79593760b9ef921ef1" ON "client" ("email") `);
        await queryRunner.query(`CREATE TABLE "complex" ("id" SERIAL NOT NULL, "city" character varying NOT NULL, "distrito" character varying NOT NULL, CONSTRAINT "PK_9a906310d3cb35d50a9d5d03d46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "house" ("id" SERIAL NOT NULL, "street" character varying NOT NULL, "house_number" integer NOT NULL, "complex" integer, CONSTRAINT "UQ_43e7946a391b061abbcd7160fa9" UNIQUE ("house_number"), CONSTRAINT "PK_8c9220195fd0a289745855fe908" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "flat" ("id" SERIAL NOT NULL, "house_id" integer NOT NULL, "flat" integer NOT NULL, "room_amount" integer NOT NULL, "floor" integer NOT NULL, "size" integer NOT NULL, "price" integer NOT NULL, "description" text, CONSTRAINT "PK_e46676be9ed366f0ff06c1ae6d2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "deal" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "flat" integer, "realtor" integer, "client" integer, CONSTRAINT "REL_decef95960042c4a34662fe683" UNIQUE ("flat"), CONSTRAINT "REL_7ae88b0e1b78e8137939d35ee6" UNIQUE ("realtor"), CONSTRAINT "REL_1d16bf0c68bccf9c6cd7f53f58" UNIQUE ("client"), CONSTRAINT "PK_9ce1c24acace60f6d7dc7a7189e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "start" TIMESTAMP NOT NULL, "end" TIMESTAMP NOT NULL, "allDay" boolean NOT NULL DEFAULT false, "user_id" integer NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "house" ADD CONSTRAINT "FK_7ffb27e5e0bd274d7d1349bd025" FOREIGN KEY ("complex") REFERENCES "complex"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flat" ADD CONSTRAINT "FK_b043d42fe7e99fded75e5ee02f6" FOREIGN KEY ("house_id") REFERENCES "house"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deal" ADD CONSTRAINT "FK_decef95960042c4a34662fe683f" FOREIGN KEY ("flat") REFERENCES "flat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deal" ADD CONSTRAINT "FK_7ae88b0e1b78e8137939d35ee6d" FOREIGN KEY ("realtor") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deal" ADD CONSTRAINT "FK_1d16bf0c68bccf9c6cd7f53f586" FOREIGN KEY ("client") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_e6358bd3df1b2874637dca92bcf" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_e6358bd3df1b2874637dca92bcf"`);
        await queryRunner.query(`ALTER TABLE "deal" DROP CONSTRAINT "FK_1d16bf0c68bccf9c6cd7f53f586"`);
        await queryRunner.query(`ALTER TABLE "deal" DROP CONSTRAINT "FK_7ae88b0e1b78e8137939d35ee6d"`);
        await queryRunner.query(`ALTER TABLE "deal" DROP CONSTRAINT "FK_decef95960042c4a34662fe683f"`);
        await queryRunner.query(`ALTER TABLE "flat" DROP CONSTRAINT "FK_b043d42fe7e99fded75e5ee02f6"`);
        await queryRunner.query(`ALTER TABLE "house" DROP CONSTRAINT "FK_7ffb27e5e0bd274d7d1349bd025"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "deal"`);
        await queryRunner.query(`DROP TABLE "flat"`);
        await queryRunner.query(`DROP TABLE "house"`);
        await queryRunner.query(`DROP TABLE "complex"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6436cc6b79593760b9ef921ef1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_368ca99acdbd5502fc08b3f779"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8e1f623798118e629b46a9e629"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
