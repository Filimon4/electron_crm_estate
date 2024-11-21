import "reflect-metadata"
import { DataSource, ObjectType, EntitySchema, Repository } from "typeorm";
import { Builder, Client, Complex, Deal, Developer, Flat, House, User } from "./entities";

type Repo<Entity> = ObjectType<Entity> | EntitySchema<Entity> | string;

const DB = new DataSource({
  type: "postgres",
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'postgres',
  entities: [Client, Builder, Complex, Deal, Developer, Flat, House, User], 
  migrations: [],
  logging: false,
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
