import { MigrationInterface, QueryRunner } from "typeorm";

export class Create1734546495347 implements MigrationInterface {
    name = '1734546495347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "flat"
            ADD COLUMN "search_vector" tsvector
            GENERATED ALWAYS AS (
            to_tsvector(
                'russian',
                coalesce("price"::text, '') || ' ' ||
                coalesce("flat"::text, '') || ' ' ||
                coalesce("size"::text, '')
            )
            ) STORED
        `);
        await queryRunner.query(`
            CREATE INDEX "idx_flat_search_vector"
            ON "flat" USING gin("search_vector");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "idx_flat_search_vector";
        `);
        await queryRunner.query(`
            ALTER TABLE "flat" 
            DROP COLUMN "search_vector";
        `);
    }
    

}
