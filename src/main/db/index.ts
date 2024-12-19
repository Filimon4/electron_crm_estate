import "reflect-metadata"
import { DataSource, ObjectType, EntitySchema, Repository } from "typeorm";
import { Client, Complex, Deal, Event, Flat, House, User } from "./entities";

type Repo<Entity> = ObjectType<Entity> | EntitySchema<Entity> | string;

const DB = new DataSource({
  type: "postgres",
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'admin',
  database: 'crm_estate2',
  entities: [Client, Complex, Deal, Flat, House, User, Event], 
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
