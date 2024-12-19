import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1734629796689 implements MigrationInterface {
    name = 'Init1734629796689'

    public async up(queryRunner: QueryRunner): Promise<void> {
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
        await queryRunner.query(`
            CREATE INDEX "idx_flat_search_vector"
            ON "flat" USING gin("search_vector");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flat" DROP COLUMN "search_vector"`);
        await queryRunner.query(`
          DROP INDEX "idx_flat_search_vector";
      `);
    }

}
