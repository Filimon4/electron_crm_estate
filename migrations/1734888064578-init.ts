import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1734888064578 implements MigrationInterface {
    name = 'Init1734888064578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_client_search_vector"`);
        await queryRunner.query(`DROP INDEX "public"."idx_complex_search_vector"`);
        await queryRunner.query(`DROP INDEX "public"."idx_house_search_vector"`);
        await queryRunner.query(`DROP INDEX "public"."idx_flat_search_vector"`);
        await queryRunner.query(`ALTER TABLE "house" RENAME COLUMN "complex" TO "complex_id"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "search_vector"`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`, ["GENERATED_COLUMN","search_vector","2024_psql_efim","public","client"]);
        await queryRunner.query(`ALTER TABLE "client" ADD "search_vector" tsvector GENERATED ALWAYS AS (
      to_tsvector(
        'russian',
        coalesce("phone", '') || ' ' ||
        coalesce("email", '') || ' ' ||
        coalesce("sure_name", '') || ' ' ||
        coalesce("last_name", '') || ' ' ||
        coalesce("first_name", '')
      )
    ) STORED NOT NULL`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`, ["2024_psql_efim","public","client","GENERATED_COLUMN","search_vector","\n      to_tsvector(\n        'russian',\n        coalesce(\"phone\", '') || ' ' ||\n        coalesce(\"email\", '') || ' ' ||\n        coalesce(\"sure_name\", '') || ' ' ||\n        coalesce(\"last_name\", '') || ' ' ||\n        coalesce(\"first_name\", '')\n      )\n    "]);
        await queryRunner.query(`ALTER TABLE "complex" DROP COLUMN "search_vector"`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`, ["GENERATED_COLUMN","search_vector","2024_psql_efim","public","complex"]);
        await queryRunner.query(`ALTER TABLE "complex" ADD "search_vector" tsvector GENERATED ALWAYS AS (
      to_tsvector(
        'russian',
        coalesce("name", '') || ' ' ||
        coalesce("city", '') || ' ' ||
        coalesce("district", '')
      )
    ) STORED NOT NULL`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`, ["2024_psql_efim","public","complex","GENERATED_COLUMN","search_vector","\n      to_tsvector(\n        'russian',\n        coalesce(\"name\", '') || ' ' ||\n        coalesce(\"city\", '') || ' ' ||\n        coalesce(\"district\", '')\n      )\n    "]);
        await queryRunner.query(`ALTER TABLE "house" DROP COLUMN "search_vector"`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`, ["GENERATED_COLUMN","search_vector","2024_psql_efim","public","house"]);
        await queryRunner.query(`ALTER TABLE "house" ADD "search_vector" tsvector GENERATED ALWAYS AS (
      to_tsvector(
        'russian',
        coalesce("street", '') || ' ' ||
        coalesce("house_number"::text, '')
      )
    ) STORED NOT NULL`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`, ["2024_psql_efim","public","house","GENERATED_COLUMN","search_vector","\n      to_tsvector(\n        'russian',\n        coalesce(\"street\", '') || ' ' ||\n        coalesce(\"house_number\"::text, '')\n      )\n    "]);
        await queryRunner.query(`ALTER TABLE "flat" DROP COLUMN "search_vector"`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`, ["GENERATED_COLUMN","search_vector","2024_psql_efim","public","flat"]);
        await queryRunner.query(`ALTER TABLE "flat" ADD "search_vector" tsvector GENERATED ALWAYS AS (
      to_tsvector(
        'russian',
        coalesce("flat"::text, '') || ' ' ||
        coalesce("room_amount"::text, '') || ' ' ||
        coalesce("size"::text, '') || ' ' ||
        coalesce("price"::text, '') || ' ' ||
        coalesce("floor"::text, '')
      )
    ) STORED NOT NULL`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`, ["2024_psql_efim","public","flat","GENERATED_COLUMN","search_vector","\n      to_tsvector(\n        'russian',\n        coalesce(\"flat\"::text, '') || ' ' ||\n        coalesce(\"room_amount\"::text, '') || ' ' ||\n        coalesce(\"size\"::text, '') || ' ' ||\n        coalesce(\"price\"::text, '') || ' ' ||\n        coalesce(\"floor\"::text, '')\n      )\n    "]);
        await queryRunner.query(`ALTER TABLE "house" ADD CONSTRAINT "FK_7515812ff5b8db9601471355e7b" FOREIGN KEY ("complex_id") REFERENCES "complex"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "house" DROP CONSTRAINT "FK_7515812ff5b8db9601471355e7b"`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`, ["GENERATED_COLUMN","search_vector","2024_psql_efim","public","flat"]);
        await queryRunner.query(`ALTER TABLE "flat" DROP COLUMN "search_vector"`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`, ["2024_psql_efim","public","flat","GENERATED_COLUMN","search_vector",""]);
        await queryRunner.query(`ALTER TABLE "flat" ADD "search_vector" tsvector NOT NULL`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`, ["GENERATED_COLUMN","search_vector","2024_psql_efim","public","house"]);
        await queryRunner.query(`ALTER TABLE "house" DROP COLUMN "search_vector"`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`, ["2024_psql_efim","public","house","GENERATED_COLUMN","search_vector",""]);
        await queryRunner.query(`ALTER TABLE "house" ADD "search_vector" tsvector NOT NULL`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`, ["GENERATED_COLUMN","search_vector","2024_psql_efim","public","complex"]);
        await queryRunner.query(`ALTER TABLE "complex" DROP COLUMN "search_vector"`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`, ["2024_psql_efim","public","complex","GENERATED_COLUMN","search_vector",""]);
        await queryRunner.query(`ALTER TABLE "complex" ADD "search_vector" tsvector NOT NULL`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`, ["GENERATED_COLUMN","search_vector","2024_psql_efim","public","client"]);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "search_vector"`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`, ["2024_psql_efim","public","client","GENERATED_COLUMN","search_vector",""]);
        await queryRunner.query(`ALTER TABLE "client" ADD "search_vector" tsvector NOT NULL`);
        await queryRunner.query(`ALTER TABLE "house" RENAME COLUMN "complex_id" TO "complex"`);
        await queryRunner.query(`CREATE INDEX "idx_flat_search_vector" ON "flat" ("search_vector") `);
        await queryRunner.query(`CREATE INDEX "idx_house_search_vector" ON "house" ("search_vector") `);
        await queryRunner.query(`CREATE INDEX "idx_complex_search_vector" ON "complex" ("search_vector") `);
        await queryRunner.query(`CREATE INDEX "idx_client_search_vector" ON "client" ("search_vector") `);
    }

}
