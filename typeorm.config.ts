import { DataSource } from 'typeorm';

export default new DataSource({
   type: 'postgres',
   host: 'localhost',
   port: 5433,
   database: 'crm_estate2',
   username: 'postgres',
   password: 'admin',
   entities: ['src/main/db/entities/*.ts'],
   migrations: ['./migrations/*.ts'],
   migrationsTableName: 'migrations',
   extra: {
    charset: 'utf8mb4',
   }
 });