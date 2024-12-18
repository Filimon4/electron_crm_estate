import { MigrationInterface, QueryRunner } from "typeorm";

export class Create1734548026856 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD COLUMN "search_vector" tsvector
            GENERATED ALWAYS AS (
            to_tsvector(
                'russian',
                coalesce("phone"::text, '') || ' ' ||
                coalesce("email"::text, '')
            )
            ) STORED
        `);
        await queryRunner.query(`
            CREATE INDEX "idx_client_search_vector"
            ON "flat" USING gin("search_vector");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "idx_client_search_vector";
        `);
        await queryRunner.query(`
            ALTER TABLE "client" 
            DROP COLUMN "search_vector";
        `);
    }

}
