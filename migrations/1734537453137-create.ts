import { MigrationInterface, QueryRunner } from "typeorm";

export class Create1734537453137 implements MigrationInterface {
    name = '1734537453137';

    public async up(queryRunner: QueryRunner): Promise<void> {
    // Добавляем колонку search_vector
    await queryRunner.query(`
        ALTER TABLE "house"
        ADD COLUMN "search_vector" tsvector
        GENERATED ALWAYS AS (
        to_tsvector(
            'russian',
            coalesce("street", '') || ' ' || coalesce("house_number"::text, '')
        )
        ) STORED
    `);

    // Создаем GIN-индекс для search_vector
    await queryRunner.query(`
        CREATE INDEX "idx_house_search_vector"
        ON "house" USING gin("search_vector");
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаляем индекс
    await queryRunner.query(`
        DROP INDEX "idx_house_search_vector";
    `);

    // Удаляем колонку search_vector
    await queryRunner.query(`
        ALTER TABLE "house" 
        DROP COLUMN "search_vector";
    `);
    }

}
