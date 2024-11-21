import { DataSource } from 'typeorm';

export default new DataSource({
   type: 'postgres',
   host: 'localhost',
   port: 5432,
   database: 'postgres',
   username: 'postgres',
   password: 'admin',
   entities: ['src/main/db/entities/*.ts'],
   migrations: ['migrations/*.ts'],
   migrationsTableName: 'migrations',
   extra: {
    charset: 'utf8mb4',
   }
 });