import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1734634906454 implements MigrationInterface {
    name = 'Init1734634906454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deal" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."deal_status_enum" AS ENUM('open', 'close')`);
        await queryRunner.query(`ALTER TABLE "deal" ADD "status" "public"."deal_status_enum" NOT NULL DEFAULT 'open'`);
        await queryRunner.query(`ALTER TABLE "house" ADD CONSTRAINT "UQ_HOUSE_STREET_NUMBER" UNIQUE ("complex", "street", "house_number")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "house" DROP CONSTRAINT "FK_7ffb27e5e0bd274d7d1349bd025"`);
        await queryRunner.query(`ALTER TABLE "house" DROP CONSTRAINT "UQ_HOUSE_STREET_NUMBER"`);
        await queryRunner.query(`ALTER TABLE "deal" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."deal_status_enum"`);
        await queryRunner.query(`ALTER TABLE "deal" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`, ["GENERATED_COLUMN","search_vector","crm_estate2","public","flat"]);
        await queryRunner.query(`ALTER TABLE "flat" DROP COLUMN "search_vector"`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`, ["crm_estate2","public","flat","GENERATED_COLUMN","search_vector",""]);
        await queryRunner.query(`ALTER TABLE "flat" ADD "search_vector" tsvector NOT NULL`);
        await queryRunner.query(`ALTER TABLE "house" ALTER COLUMN "complex" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "house" ADD CONSTRAINT "UQ_43e7946a391b061abbcd7160fa9" UNIQUE ("house_number")`);
        await queryRunner.query(`ALTER TABLE "house" ADD CONSTRAINT "FK_7ffb27e5e0bd274d7d1349bd025" FOREIGN KEY ("complex") REFERENCES "complex"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`, ["crm_estate2","public","house","GENERATED_COLUMN","search_vector",""]);
        await queryRunner.query(`ALTER TABLE "house" ADD "search_vector" tsvector`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`, ["crm_estate2","public","complex","GENERATED_COLUMN","search_vector",""]);
        await queryRunner.query(`ALTER TABLE "complex" ADD "search_vector" tsvector`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`, ["crm_estate2","public","client","GENERATED_COLUMN","search_vector",""]);
        await queryRunner.query(`ALTER TABLE "client" ADD "search_vector" tsvector`);
        await queryRunner.query(`CREATE INDEX "idx_flat_search_vector" ON "flat" ("search_vector") `);
        await queryRunner.query(`CREATE INDEX "idx_house_search_vector" ON "house" ("search_vector") `);
        await queryRunner.query(`CREATE INDEX "idx_complex_search_vector" ON "complex" ("search_vector") `);
        await queryRunner.query(`CREATE INDEX "idx_client_search_vector" ON "client" ("search_vector") `);
    }

}
