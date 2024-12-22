import { DataSource } from 'typeorm';

export default new DataSource({
   type: 'postgres',
   host: '5.183.188.132',
   port: 5432,
   database: '2024_psql_efim',
   username: '2024_psql_e_usr',
   password: 'yEKFC10LK8AouxLb',
   entities: ['src/main/db/entities/*.ts'],
   migrations: ['./migrations/*.ts'],
   migrationsTableName: 'migrations',
   extra: {
    charset: 'utf8mb4',
   }
 });