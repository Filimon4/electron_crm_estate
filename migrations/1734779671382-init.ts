import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1734779671382 implements MigrationInterface {
    name = '1'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'realtor')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "first_name" character varying NOT NULL, "sure_name" character varying NOT NULL, "last_name" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'realtor', CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8e1f623798118e629b46a9e629" ON "user" ("phone") `);
        await queryRunner.query(`CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`, ["crm_estate3","public","client","GENERATED_COLUMN","search_vector","\n      to_tsvector(\n        'russian',\n        coalesce(\"phone\", '') || ' ' ||\n        coalesce(\"email\", '') || ' ' ||\n        coalesce(\"sure_name\", '') || ' ' ||\n        coalesce(\"last_name\", '') || ' ' ||\n        coalesce(\"first_name\", '')\n      )\n    "]);
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "first_name" character varying NOT NULL, "sure_name" character varying NOT NULL, "last_name" character varying NOT NULL, "description" text, "search_vector" tsvector GENERATED ALWAYS AS (
      to_tsvector(
        'russian',
        coalesce("phone", '') || ' ' ||
        coalesce("email", '') || ' ' ||
        coalesce("sure_name", '') || ' ' ||
        coalesce("last_name", '') || ' ' ||
        coalesce("first_name", '')
      )
    ) STORED NOT NULL, CONSTRAINT "UQ_368ca99acdbd5502fc08b3f7796" UNIQUE ("phone"), CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_368ca99acdbd5502fc08b3f779" ON "client" ("phone") `);
        await queryRunner.query(`CREATE INDEX "IDX_6436cc6b79593760b9ef921ef1" ON "client" ("email") `);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`, ["crm_estate3","public","complex","GENERATED_COLUMN","search_vector","\n      to_tsvector(\n        'russian',\n        coalesce(\"name\", '') || ' ' ||\n        coalesce(\"city\", '') || ' ' ||\n        coalesce(\"district\", '')\n      )\n    "]);
        await queryRunner.query(`CREATE TABLE "complex" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "city" character varying NOT NULL, "district" character varying NOT NULL, "search_vector" tsvector GENERATED ALWAYS AS (
      to_tsvector(
        'russian',
        coalesce("name", '') || ' ' ||
        coalesce("city", '') || ' ' ||
        coalesce("district", '')
      )
    ) STORED NOT NULL, CONSTRAINT "PK_9a906310d3cb35d50a9d5d03d46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`, ["crm_estate3","public","house","GENERATED_COLUMN","search_vector","\n      to_tsvector(\n        'russian',\n        coalesce(\"street\", '') || ' ' ||\n        coalesce(\"house_number\"::text, '')\n      )\n    "]);
        await queryRunner.query(`CREATE TABLE "house" ("id" SERIAL NOT NULL, "street" character varying NOT NULL, "house_number" integer NOT NULL, "search_vector" tsvector GENERATED ALWAYS AS (
      to_tsvector(
        'russian',
        coalesce("street", '') || ' ' ||
        coalesce("house_number"::text, '')
      )
    ) STORED NOT NULL, "complex" integer NOT NULL, CONSTRAINT "UQ_HOUSE_STREET_NUMBER" UNIQUE ("complex", "street", "house_number"), CONSTRAINT "PK_8c9220195fd0a289745855fe908" PRIMARY KEY ("id"))`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`, ["crm_estate3","public","flat","GENERATED_COLUMN","search_vector","\n      to_tsvector(\n        'russian',\n        coalesce(\"flat\"::text, '') || ' ' ||\n        coalesce(\"room_amount\"::text, '') || ' ' ||\n        coalesce(\"size\"::text, '') || ' ' ||\n        coalesce(\"price\"::text, '') || ' ' ||\n        coalesce(\"floor\"::text, '')\n      )\n    "]);
        await queryRunner.query(`CREATE TABLE "flat" ("id" SERIAL NOT NULL, "house_id" integer NOT NULL, "flat" integer NOT NULL, "room_amount" integer NOT NULL, "floor" integer NOT NULL, "size" integer NOT NULL, "price" integer NOT NULL, "description" text, "search_vector" tsvector GENERATED ALWAYS AS (
      to_tsvector(
        'russian',
        coalesce("flat"::text, '') || ' ' ||
        coalesce("room_amount"::text, '') || ' ' ||
        coalesce("size"::text, '') || ' ' ||
        coalesce("price"::text, '') || ' ' ||
        coalesce("floor"::text, '')
      )
    ) STORED NOT NULL, CONSTRAINT "UQ_Flat_One" UNIQUE ("house_id", "flat"), CONSTRAINT "PK_e46676be9ed366f0ff06c1ae6d2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."deal_status_enum" AS ENUM('open', 'close')`);
        await queryRunner.query(`CREATE TABLE "deal" ("id" SERIAL NOT NULL, "status" "public"."deal_status_enum" NOT NULL DEFAULT 'open', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "closed_at" TIMESTAMP, "flat" integer, "realtor" integer, "client" integer, CONSTRAINT "UQ_DEAL_FLAT_CLIENT" UNIQUE ("flat", "client"), CONSTRAINT "REL_decef95960042c4a34662fe683" UNIQUE ("flat"), CONSTRAINT "PK_9ce1c24acace60f6d7dc7a7189e" PRIMARY KEY ("id"))`);
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
        await queryRunner.query(`DROP TYPE "public"."deal_status_enum"`);
        await queryRunner.query(`DROP TABLE "flat"`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`, ["GENERATED_COLUMN","search_vector","crm_estate3","public","flat"]);
        await queryRunner.query(`DROP TABLE "house"`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`, ["GENERATED_COLUMN","search_vector","crm_estate3","public","house"]);
        await queryRunner.query(`DROP TABLE "complex"`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`, ["GENERATED_COLUMN","search_vector","crm_estate3","public","complex"]);
        await queryRunner.query(`DROP INDEX "public"."IDX_6436cc6b79593760b9ef921ef1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_368ca99acdbd5502fc08b3f779"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`, ["GENERATED_COLUMN","search_vector","crm_estate3","public","client"]);
        await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8e1f623798118e629b46a9e629"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
