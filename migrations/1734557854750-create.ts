import { MigrationInterface, QueryRunner } from "typeorm";

export class Create1734557854750 implements MigrationInterface {
    name='20'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX "idx_complex_search_vector"
            ON "complex" USING gin("search_vector");
        `);
        await queryRunner.query(`
            CREATE INDEX "idx_client_search_vector"
            ON "client" USING gin("search_vector");
        `);
        await queryRunner.query(`
            CREATE INDEX "idx_house_search_vector"
            ON "house" USING gin("search_vector");
        `);
        await queryRunner.query(`
            CREATE INDEX "idx_flat_search_vector"
            ON "flat" USING gin("search_vector");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "idx_complex_search_vector";
        `);
        await queryRunner.query(`
            DROP INDEX "idx_client_search_vector";
        `);
        await queryRunner.query(`
            DROP INDEX "idx_house_search_vector";
        `);
        await queryRunner.query(`
            DROP INDEX "idx_flat_search_vector";
        `);
    }

}
