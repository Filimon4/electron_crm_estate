import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTypeormMetadata implements MigrationInterface {
    name = '2'
    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`
        //     CREATE TABLE "typeorm_metadata" (
        //         "type" varchar NOT NULL,
        //         "database" varchar,
        //         "schema" varchar,
        //         "table" varchar,
        //         "name" varchar,
        //         "value" text
        //     );
        // `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`
        //     DROP TABLE "typeorm_metadata";
        // `);
    }
}