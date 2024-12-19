import { MigrationInterface, QueryRunner } from "typeorm";

export class Create1734557854750 implements MigrationInterface {
    name='3'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`
        //     ALTER TABLE "complex"
        //     ADD COLUMN "search_vector" tsvector
        //     GENERATED ALWAYS AS (
        //     to_tsvector(
        //         'russian',
        //         coalesce("city"::text, '') || ' ' ||
        //         coalesce("district"::text, '') || ' ' ||
        //         coalesce("name"::text, '')
        //     )
        //     ) STORED
        // `);
        // await queryRunner.query(`
        //     CREATE INDEX "idx_complex_search_vector"
        //     ON "complex" USING gin("search_vector");
        // `);
        
        // await queryRunner.query(`
        //     ALTER TABLE "client"
        //     ADD COLUMN "search_vector" tsvector
        //     GENERATED ALWAYS AS (
        //     to_tsvector(
        //         'russian',
        //         coalesce("phone"::text, '') || ' ' ||
        //         coalesce("email"::text, '')
        //     )
        //     ) STORED
        // `);
        // await queryRunner.query(`
        //     CREATE INDEX "idx_client_search_vector"
        //     ON "client" USING gin("search_vector");
        // `);
        // await queryRunner.query(`
        //     ALTER TABLE "house"
        //     ADD COLUMN "search_vector" tsvector
        //     GENERATED ALWAYS AS (
        //     to_tsvector(
        //         'russian',
        //         coalesce("street", '') || ' ' || coalesce("house_number"::text, '')
        //     )
        //     ) STORED
        // `);
        // await queryRunner.query(`
        //     CREATE INDEX "idx_house_search_vector"
        //     ON "house" USING gin("search_vector");
        // `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`
        //     DROP INDEX "idx_complex_search_vector";
        // `);
        // await queryRunner.query(`
        //     ALTER TABLE "complex" 
        //     DROP COLUMN "search_vector";
        // `);
        // await queryRunner.query(`
        //     DROP INDEX "idx_client_search_vector";
        // `);
        // await queryRunner.query(`
        //     ALTER TABLE "client" 
        //     DROP COLUMN "search_vector";
        // `);
        // await queryRunner.query(`
        //     DROP INDEX "idx_house_search_vector";
        // `);
        // await queryRunner.query(`
        //     ALTER TABLE "house" 
        //     DROP COLUMN "search_vector";
        // `);
    }

}
