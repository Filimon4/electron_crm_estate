import "reflect-metadata"
import { DataSource, ObjectType, EntitySchema, Repository } from "typeorm";
import { Client, Complex, Deal, Event, Flat, House, User } from "./entities";

type Repo<Entity> = ObjectType<Entity> | EntitySchema<Entity> | string;

const DB = new DataSource({
  type: 'postgres',
  host: '5.183.188.132',
  port: 5432,
  database: '2024_psql_efim',
  username: '2024_psql_e_usr',
  password: 'yEKFC10LK8AouxLb',
  entities: [
    Client,
    Deal,
    Complex,
    Flat,
    House,
    User, Event
  ], 
  migrations: [],
  logging: false,
  synchronize: false
});

export const dbConnection = <Entity>(target: Repo<Entity>) =>
  DB.getRepository<Entity>(target);

declare global {
  function dbConnection<Entity>(
    target: Repo<Entity>
  ): Repository<Entity>
}

global.dbConnection = dbConnection

export default DB;
